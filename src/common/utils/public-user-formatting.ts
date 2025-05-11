import { User } from "src/users/entities/user.entity";
import { PublicUserDto } from "src/users/dto/public-user.dto";


export function toPublicUser(user: User): PublicUserDto {
    const { id, first_name, last_name, email, role, tenant } = user;
    return { id, first_name, last_name, email, role, tenant };
  }