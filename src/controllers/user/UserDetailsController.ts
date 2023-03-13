import { Request, Response } from "express";
import { UserDetailsService } from "../../services/user/UserDetailsService";

class UserDetailsController {
  async handle(req: Request, res: Response) {
    const id = req.user_id;

    const userDetailsService = new UserDetailsService();

    const user = await userDetailsService.execute(id);

    return res.json(user);
  }
}

export { UserDetailsController };