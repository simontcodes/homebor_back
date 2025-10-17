import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Resolve status
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Server-side logging (full detail)
    if (exception instanceof Error) {
      // Log name/message/stack
      this.logger.error(
        `[${request.method} ${request.url}] ${exception.name}: ${exception.message}`,
        exception.stack,
      );
      // Best-effort log of common DB/error fields if present
      const anyErr = exception as any;
      if (anyErr?.code || anyErr?.detail || anyErr?.constraint) {
        this.logger.error(
          `DB/Error meta -> code: ${anyErr.code}, detail: ${anyErr.detail}, constraint: ${anyErr.constraint}`,
        );
      }
    } else {
      // Non-Error throwables
      this.logger.error(
        `[${request.method} ${request.url}] Non-error exception: ${JSON.stringify(
          exception,
        )}`,
      );
    }

    // Normalize client-safe message
    let clientMessage: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      const payload = exception.getResponse();
      if (typeof payload === 'string') {
        clientMessage = payload;
      } else if (
        payload &&
        typeof payload === 'object' &&
        'message' in payload
      ) {
        const msg = (payload as any).message;
        clientMessage =
          typeof msg === 'string' || Array.isArray(msg) ? msg : String(msg);
      } else if (exception.message) {
        clientMessage = exception.message;
      }
    }

    // Send normalized response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: clientMessage,
    });
  }
}
