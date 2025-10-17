import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  Transform,
  TransformFnParams,
  plainToInstance,
} from 'class-transformer';

/** Coerce typical multipart values to boolean */
const toBool = ({ value }: TransformFnParams): boolean => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;
  if (typeof value === 'string') {
    const v = value.trim().toLowerCase();
    return v === 'true' || v === '1' || v === 'yes';
  }
  return Boolean(value);
};

/** Coerce to integer (NaN will fail @IsInt) */
const toInt = ({ value }: TransformFnParams): number => {
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : NaN;
};

/** Safe string conversion */
const safeString = (val: unknown): string => {
  if (typeof val === 'string') return val;
  if (
    typeof val === 'number' ||
    typeof val === 'boolean' ||
    typeof val === 'bigint'
  ) {
    return String(val);
  }
  // for null, undefined, objects, arrays, symbols, functions → return empty string
  return '';
};

/** Safely build BedroomDto[] from unknown input */
const toBedroomInstances = (val: unknown): BedroomDto[] => {
  if (!Array.isArray(val)) return [];
  return (val as unknown[]).map((item): BedroomDto => {
    const rec =
      item && typeof item === 'object' ? (item as Record<string, unknown>) : {};
    return plainToInstance(BedroomDto, {
      size: safeString(rec['size']),
      bed_type: safeString(rec['bed_type']),
    }) as BedroomDto;
  });
};

/** Safely build ResidentDto[] from unknown input */
const toResidentInstances = (val: unknown): ResidentDto[] => {
  if (!Array.isArray(val)) return [];
  return (val as unknown[]).map((item): ResidentDto => {
    const rec =
      item && typeof item === 'object' ? (item as Record<string, unknown>) : {};
    return plainToInstance(ResidentDto, {
      full_name: safeString(rec['full_name']),
      age: rec['age'],
      occupation: safeString(rec['occupation']),
    }) as ResidentDto;
  });
};

export class BedroomDto {
  @IsString()
  size!: string;

  @IsString()
  bed_type!: string;
}

export class ResidentDto {
  @IsString()
  full_name!: string;

  @Transform(toInt)
  @IsInt()
  @Min(0)
  age!: number;

  @IsString()
  occupation!: string;
}

export class CreateHomeDto {
  @IsString()
  phone!: string;

  @IsString()
  address!: string;

  @Transform(toBool)
  @IsBoolean()
  pets!: boolean;

  @IsOptional()
  @IsString()
  age_preference?: string;

  @IsOptional()
  @IsString()
  gender_preference?: string;

  @Transform(toBool)
  @IsBoolean()
  food_service!: boolean;

  @Transform(toBool)
  @IsBoolean()
  special_diet!: boolean;

  @Transform(toInt)
  @IsInt()
  @Min(0)
  room_count!: number;

  @Transform(({ value }) => toBedroomInstances(value))
  @IsArray()
  @ValidateNested({ each: true })
  bedrooms!: BedroomDto[];

  @Transform(({ value }) => toResidentInstances(value))
  @IsArray()
  @ValidateNested({ each: true })
  residents!: ResidentDto[];
}
