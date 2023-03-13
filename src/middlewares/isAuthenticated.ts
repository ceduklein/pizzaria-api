import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  // Primeiro recebemos e verificamos se veio token com a requisição (Aulta 71 - Curso Udemy)
  const authToken = req.headers.authorization;

  // Se não vier token, retornamos status 401 - Unauthorized
  if(!authToken)
    return res.status(401).end();
  
  // Em seguida splitamos a string Bearer token, com o espaço como separador, conforme abaixo
  const [, token ] = authToken.split(" ");

  // Agora vamos verificar e validar o token recebido
  try {
    // A partir do token, recuperamos a prop. sub (id) e retornamos next, para seguir para a próxima etapa.
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    /* Para que todas as rotas autenticadas tenham acesso ao id do usuário, enviamos o sub (id), 
    através do req (request), porém como a propriedade user_id não faz parte das tipagens do Request 
    do express, precisamos sobrescrever as tipagens no arquivo index.d.ts, conforme aula 72.*/
    req.user_id = sub;

    return next();

  }catch(err) {
    return res.status(401).end();
  }
}