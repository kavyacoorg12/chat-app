import { Injectable } from "@nestjs/common";
import { ITokenService, TokenPayload } from "./token.service.js";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService implements ITokenService{
  constructor(private readonly jwtService:JwtService){}
  sign(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload)
  }
}