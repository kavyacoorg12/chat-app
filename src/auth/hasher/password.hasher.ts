export interface IPasswordHasher {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
}

export const PASSWORD_HASHER=Symbol('PASSWORD_HASHER')