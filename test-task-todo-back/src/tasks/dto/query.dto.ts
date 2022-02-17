import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { OrderEnum } from '../enums/order.enum';

export class QueryDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  page: number;

  @IsOptional()
  @IsEnum(OrderEnum)
  name: OrderEnum;

  @IsOptional()
  @IsEnum(OrderEnum)
  email: OrderEnum;

  @IsOptional()
  @IsEnum(OrderEnum)
  status: OrderEnum;
}
