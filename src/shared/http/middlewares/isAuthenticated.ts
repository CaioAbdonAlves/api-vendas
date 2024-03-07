import { Request, Response, NextFunction } from "express";
import authConfig from "@config/auth";
import { Secret, verify } from "jsonwebtoken";

type JwtPayloadProps = {
  sub: string;
};

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Access token not present.",
    });
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return response.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Access token not present",
    });
  }

  try {
    const decodedToken = verify(token, authConfig.jwt.secret as Secret);
    const { sub } = decodedToken as JwtPayloadProps;
    request.user = { id: sub };
    next();
  } catch {
    return response.status(401).json({
      error: true,
      code: "token expires",
      message: "Access token not present.",
    });
  }
};
