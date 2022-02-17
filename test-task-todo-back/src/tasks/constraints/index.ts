import { PropOptions } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import { EMAIL_NOT_VALID } from '../constants/error-messages';
import { StatusEnum } from '../enums/status.enum';

export const NAME_CONSTRAINTS: PropOptions = {
  required: true,
  maxlength: 255,
  minlength: 1,
};

export const EMAIL_CONSTRAINTS: PropOptions = {
  required: true,
  unique: true,
  index: true,
  validate: {
    validator: isEmail,
    message: EMAIL_NOT_VALID,
  },
};

export const TEXT_CONSTRAINTS: PropOptions = {
  required: true,
};

export const STATUS_CONSTRAINTS: PropOptions = {
  default: StatusEnum.OPEN,
  type: String,
  enum: StatusEnum,
};

export const EDITED_BY_ADMIN_CONSTRAINTS: PropOptions = {
  default: false,
  type: Boolean,
};
