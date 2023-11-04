import { NotFoundError } from "../errors/NotFoundError.js";
import { AuthService } from "../services/AuthService.js";

/**
 * @typedef {{ username: string; password: string; }} User
 */
export class UserRepository {
  /**
   * @type {Array<User>}
   */
  static users = [];

  static all() {
    return this.users.map(user => ({ username: user.username }));
  }

  /**
   * @param {string} username
   * @throws {NotFoundError}
   */
  static getByUsername(username) {
    const user = this.users.find(user => user.username === username);

    if (user === undefined) {
      throw new NotFoundError("User not found.");
    }

    return user;
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  static create(username, password) {
    const user = { username, password };

    this.users.push(new AuthService(user).hashPassword());
    console.log(this.users);

    return user;
  }
}
