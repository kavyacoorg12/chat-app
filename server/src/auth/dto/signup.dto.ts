import { IsEmail, IsString, MinLength,MaxLength, Matches } from "class-validator"
import { AUTH_MESSAGES } from "../../common/constants/auth.message.js"

export class SignupDto{
  @IsEmail({},{
    message:AUTH_MESSAGES.ERROR.INVALID_EMAIL
  })
  email:string
  @IsString()
  @MinLength(8,{
    message:AUTH_MESSAGES.ERROR.PASSWORD_TOO_SHORT
  })
  @MaxLength(72,{
    message:AUTH_MESSAGES.ERROR.PASSWORD_TOO_LONG
  })
  @Matches(/[A-Z]/,{
    message:AUTH_MESSAGES.ERROR.PASSWORD_UPPERCASE
  })
  @Matches(/[0-9]/,{
    message:AUTH_MESSAGES.ERROR.PASSWORD_NUMBER
  })
  password:string
}