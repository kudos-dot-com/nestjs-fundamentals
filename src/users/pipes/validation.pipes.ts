import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

@Injectable()
export class checkId implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
      if (typeof value === 'string' && /^[a-f0-9]{24}$/.test(value)) {
        return value;
      } else {
        throw new BadRequestException('Error in object id');
      }
    }
  }
