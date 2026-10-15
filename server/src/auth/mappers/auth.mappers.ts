import { AUTH_MESSAGES } from "../../common/constants/auth.message.js";
import { User } from "../../users/entities/user.entity.js";
import { ISignupResponseDto } from "../dto/signup.response.dto.js";

export function toSignupResponseDto(data:User):ISignupResponseDto{
  return{
    message:AUTH_MESSAGES.SUCCESS.SIGNUP,
    user:{
      id:data.id,
      email:data.email
    }
  }
}