export class NotFoundError extends Error {
  statusCode = 404;

  /**
   * @param {string} [message]
   */
  constructor(message) {
    super(message);
  }
}
