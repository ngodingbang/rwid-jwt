import { UserRepository } from "../repositories/UserRepository.js";

export class UserController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  static index(req, res, next) {
    const users = UserRepository.all();

    return res.json({ users });
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  // eslint-disable-next-line no-unused-vars
  static show(req, res, next) {
    const { username } = req.params;

    const user = UserRepository.getByUsername(username);

    return res.json({ user });
  }
}
