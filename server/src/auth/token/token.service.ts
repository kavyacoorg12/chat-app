
export interface TokenPayload{
  id:string,
  email:string
}
export interface ITokenService
{
  sign(payload:TokenPayload):Promise<string>
}

export const TOKEN_SERVICE=Symbol('TOKEN_SERVICE')