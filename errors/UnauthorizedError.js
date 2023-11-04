export class UnauthorizedError extends Error {
  statusCode = 401;

  /**
   * @param {string} [message]
   */
  constructor(message) {
    super(message);
  }
}
