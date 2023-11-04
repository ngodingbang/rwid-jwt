import "../env.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import bcrypt from "bcrypt";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository.js";

export class AuthService {
  static JWT_ALGORITHM = "HS384";

  /** @type {import("../repositories/UserRepository.js").User} */
  user;

  /**
   * @param {import("../repositories/UserRepository.js").User} user
   */
  constructor(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  /**
   * @param {string} value
   * @throws {UnauthorizedError}
   */
  checkPassword(value) {
    const isMatched = bcrypt.compareSync(value, this.user.password);

    if (!isMatched) {
      throw new UnauthorizedError("Password doesn't match.");
    }

    return isMatched;
  }

  /**
   * @param {string | number} saltOrRounds
   */
  hashPassword(saltOrRounds = 10) {
    const password = this.user.password;

    this.user.password = bcrypt.hashSync(password, saltOrRounds);

    return this.user;
  }

  createAccessToken() {
    return jwt.sign(
      {
        sub: this.user.username,
      },
      process.env.JWT_SECRET,
      {
        algorithm: AuthService.JWT_ALGORITHM,
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "5m",
      },
    );
  }

  createRefreshToken() {
    return jwt.sign(
      {
        sub: this.user.username,
      },
      process.env.JWT_SECRET,
      {
        algorithm: AuthService.JWT_ALGORITHM,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "1d",
      },
    );
  }

  static jwtMiddleware() {
    return expressjwt({
      algorithms: [AuthService.JWT_ALGORITHM],
      secret: process.env.JWT_SECRET,
      isRevoked: (req, token) => {
        req.user = UserRepository.getByUsername(token.payload.sub);

        return false;
      },
    });
  }
}
