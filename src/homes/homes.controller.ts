// homes.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Req } from '@nestjs/common';
import type { Request } from 'express';

import { HomeService } from './homes.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import type { AuthUser as AuthUserShape } from 'src/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';

type NormalizedUploads = {
  signature?: Express.Multer.File;
  house_photos: Express.Multer.File[]; // [0..2]
  bedroom_photos: Express.Multer.File[][]; // [roomIdx][photoIdx]
  resident_background_checks: Array<Express.Multer.File>; // [residentIdx]
};

function normalizeUploads(
  files: Express.Multer.File[] = [],
): NormalizedUploads {
  const out: NormalizedUploads = {
    signature: undefined,
    house_photos: [],
    bedroom_photos: [],
    resident_background_checks: [],
  };

  const bedroomRe = /^bedroom_photos\[(\d+)\]\[(\d+)\]$/;
  const residentBgRe = /^residents\[(\d+)\]\[background_check\]$/;
  const houseRe = /^house_photos\[(\d+)\]$/;

  for (const f of files) {
    const { fieldname } = f;

    if (fieldname === 'signature') {
      out.signature = f;
      continue;
    }

    const bed = bedroomRe.exec(fieldname);
    if (bed) {
      const roomIdx = Number(bed[1]);
      const photoIdx = Number(bed[2]);
      if (!out.bedroom_photos[roomIdx]) out.bedroom_photos[roomIdx] = [];
      out.bedroom_photos[roomIdx][photoIdx] = f;
      continue;
    }

    const house = houseRe.exec(fieldname);
    if (house) {
      const idx = Number(house[1]);
      out.house_photos[idx] = f;
      continue;
    }

    const rbg = residentBgRe.exec(fieldname);
    if (rbg) {
      const rIdx = Number(rbg[1]);
      out.resident_background_checks[rIdx] = f;
      continue;
    }
  }

  // compact sparse arrays (optional)
  out.house_photos = out.house_photos.filter(Boolean);
  out.bedroom_photos = out.bedroom_photos.map((arr) =>
    (arr || []).filter(Boolean),
  );
  // leave resident_background_checks as-is so indexes line up with dto.residents

  return out;
}

@UseGuards(JwtAuthGuard)
@Controller('homes')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Body() dto: CreateHomeDto,
    @UploadedFiles() files: Express.Multer.File[] | undefined,
    @AuthUser() user: AuthUserShape,
    @Req() req: Request,
  ) {
    console.log('[homes/create] raw body =', req.body); // strings from multipart
    console.log('[homes/create] DTO =', dto); // transformed DTO
    console.log('user:', user);

    const uploads = normalizeUploads(files);
    console.log('[homes/create] uploads =', {
      signature: !!uploads.signature,
      house: uploads.house_photos.map((f) => f?.originalname),
      bedrooms: uploads.bedroom_photos.map((room) =>
        room?.map((f) => f?.originalname),
      ),
      resident_bgs: uploads.resident_background_checks.map(
        (f) => f?.originalname,
      ),
    });

    return this.homeService.create(dto, user /*, uploads */);
  }

  @Get()
  findAll() {
    return this.homeService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.homeService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeService.remove(id);
  }
}
