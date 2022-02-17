import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';
import { Error } from 'mongoose';

interface ResponseObject {
  statusCode: HttpStatus;
  message: string;
  errors?: string[];
}
interface ErrorItem {
  message: string;
  path: string;
}
export interface MongoExtendedError extends MongoError {
  errors: ErrorItem[];
  keyValue: { [key: string]: string };
}

export const isValidationError = (error: MongoExtendedError): boolean =>
  error.name === 'ValidationError';
export const isDuplicateKeyError = (error: MongoExtendedError): boolean =>
  error?.code === 11000;

export const beautifyValidationError = (error: MongoExtendedError) =>
  Object.keys(error.errors).map((key: string) => {
    return `${error.errors[key].path}: ${error.errors[key].message}`;
  });

export const beautifyDuplicateError = (error: MongoExtendedError) => {
  const keys = Object.keys(error.keyValue);
  const dynamic = keys.map((key) => `${key}: ${error.keyValue[key]}`);
  return dynamic;
};

@Catch(MongoError, Error.ValidationError, Error.CastError)
export class MongoErrorFilter extends BaseExceptionFilter {
  catch(error: MongoExtendedError, host: ArgumentsHost) {
    // getting into request-response scope
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    try {
      let responseObject: ResponseObject;
      if (isValidationError(error))
        responseObject = this.handleValidationError(error);
      if (isDuplicateKeyError(error))
        responseObject = this.handleDuplicateKeyError(error);

      return res.status(responseObject.statusCode).json({
        success: false,
        ...responseObject,
        path: req.url,
        method: req.method,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private handleDuplicateKeyError(error: MongoExtendedError) {
    return {
      statusCode: HttpStatus.CONFLICT,
      message: 'Duplicate keys breaking the unique constraint',
      errors: beautifyDuplicateError(error),
    };
  }
  private handleValidationError(error: MongoExtendedError) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation error',
      errors: beautifyValidationError(error),
    };
  }
}
