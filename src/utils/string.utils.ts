import { Injectable } from '@nestjs/common';

@Injectable()
export class StringUtils {
  public nameLowerCase(text: string) {
    return text.toLowerCase();
  }
}
