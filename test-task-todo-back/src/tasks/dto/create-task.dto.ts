import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { EMAIL_NOT_VALID } from '../constants/error-messages';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty()
  @IsEmail(
    {},
    {
      message: EMAIL_NOT_VALID,
    },
  )
  email: string;

  @ApiProperty()
  @IsString()
  @Length(1, 1255)
  text: string;
}
