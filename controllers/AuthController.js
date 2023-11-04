import { UserRepository } from "../repositories/UserRepository.js";
import { AuthService } from "../services/AuthService.js";

export class AuthController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  static login(req, res, next) {
    try {
      const { username, password } = req.body;

      const user = UserRepository.getByUsername(username);

      const authService = new AuthService(user);

      authService.checkPassword(password);

      return res.json({
        username,
        accessToken: authService.createAccessToken(),
        refreshToken: authService.createRefreshToken(),
      });
    } catch (error) {
      console.error(error);

      return res
        .status(error?.statusCode || 500)
        .json({ message: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  static register(req, res, next) {
    const { username, password } = req.body;

    const user = UserRepository.create(username, password);

    return res.status(201).json({ username: user.username });
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  static refreshToken(req, res, next) {
    //
  }
}
