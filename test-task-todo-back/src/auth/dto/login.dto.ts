import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  username: string;

  @ApiProperty()
  @IsString()
  @Length(1, 255)
  password: string;
}
