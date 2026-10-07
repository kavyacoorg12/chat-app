import { User } from "../entities/user.entity.js";

export interface IUserRepository
{
  findByEmail(email:string):Promise<User|null>
  create(data:Omit<User,'id'|'createdAt'|'updatedAt'>):Promise<User>
}

export const USER_REPOSITORY=Symbol('USER_REPOSITORY')