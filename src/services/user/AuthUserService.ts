import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password}: AuthRequest) {
    // Verifica Email
    const user = await prismaClient.user.findFirst({
      where: { email }
    });

    if(!user)
      throw new Error("Incorrect User/Password.");

    //Verifica Senha
    const passwordMath = await compare(password, user.password);

    if(!passwordMath)
      throw new Error("Incorrect User/Password.");

    // Login ok => Gerar token para usuário
    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    };
  }
}

export { AuthUserService };