import { ArgumentsHost, BadRequestException, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): any {
    const detail = exception.detail;
    
    if (typeof detail === 'string' && detail.includes('already exists')) {
      const message = exception.detail.replace('Key', exception.table.split('_').join(' ') + ' with');
      return super.catch(new BadRequestException(message), host);
    }

    return super.catch(exception, host);
  }
}