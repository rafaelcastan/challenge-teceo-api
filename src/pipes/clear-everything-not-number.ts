import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ClearEverythingNotNumber implements PipeTransform {
  transform(value: string) {
    return value.replace(/\D+/g, '');
  }
}
