import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const method = request.method;
      const url = request.url;
  
      return next.handle().pipe(
        map((data) => {
          const statusCode =
            context.switchToHttp().getResponse().statusCode || 200;
  
          return {
            statusCode,
            message: this.getSuccessMessage(method, url),
            data: this.formatData(data),
          };
        }),
      );
    }
  
    private getSuccessMessage(method: string, url: string): string {
      // Custom messages for auth endpoints
      if (url.includes('/auth/login')) return 'Logged in successfully';
      if (url.includes('/auth/register')) return 'Registration successful';
  
      switch (method) {
        case 'GET':
          return 'Data fetched successfully';
        case 'POST':
          return 'Resource created successfully';
        case 'PUT':
        case 'PATCH':
          return 'Resource updated successfully';
        case 'DELETE':
          return 'Resource deleted successfully';
        default:
          return 'Operation successful';
      }
    }
  
    private formatData(data: any): any {
      if (data === null || data === undefined) {
        return null;
      }
  
      if (typeof data === 'object' && Object.keys(data).length === 0) {
        return null;
      }
  
      return data;
    }
  }
  