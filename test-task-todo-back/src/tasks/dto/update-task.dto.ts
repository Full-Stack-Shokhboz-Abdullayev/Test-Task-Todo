import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { StatusEnum } from '../enums/status.enum';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto implements Partial<CreateTaskDto> {
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @Length(1, 1255)
  @IsOptional()
  text?: string;

  @ApiProperty()
  @IsEnum(StatusEnum)
  @IsOptional()
  status?: StatusEnum;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  editedByAdmin?: boolean;
}
