/**
 * Represents an HTTP exception.
 * @class
 * @extends Error
 */
class HttpException extends Error {
  constructor(
    { statusCode = 400, status = 'ClientRequestError', message, cause },
    ctxRef,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.status = status;
    this.name = 'HttpException';

    this.message = message ?? status;
    this.cause = cause;

    // Limit the stack trace to 5 lines
    Error.stackTraceLimit = 5;

    // Prevents the exception from appearing in the stack trace
    ctxRef && Error.captureStackTrace(this, ctxRef);
  }

  /**
   * Predefined type of common client error for 400 status code
   * @param {String} [message] - detailed error message
   * @param {Error} [cause] - the original error
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/400 400 status code }
   */
  static BadRequest(message, cause) {
    return new this(
      { statusCode: 400, status: 'Bad request', message, cause },
      this.BadRequest,
    );
  }

  /**
   * Predefined type of common client error for 410 status code
   * @param {String} [message] - detailed error message
   * @param {Error} [cause] - the original error
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/410 410 status code }
   */
  static Gone(message, cause) {
    return new this(
      { statusCode: 410, status: 'Gone', message, cause },
      this.Gone,
    );
  }

  /**
   * Predefined type of common client error for 404 status code
   * @param {String} [message] - detailed error message
   * @param {Error} [cause] - the original error
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/404 404 status code }
   */
  static NotFound(message, cause) {
    return new this(
      { statusCode: 404, status: 'NotFound', message, cause },
      this.NotFound,
    );
  }

  /**
   * Predefined type of common client error for 409 status code
   * @param {String} [message] - detailed error message
   * @param {Error} [cause] - the original error
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/409 409 status code }
   */
  static Conflict(message, cause) {
    return new this(
      { statusCode: 409, status: 'Conflict', message, cause },
      this.Conflict,
    );
  }
}

module.exports = {
  HttpException,
};
