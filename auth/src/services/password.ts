import bcrypt from "bcrypt";

const saltRounds = 10;

export class PasswordManager {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static async compare(
    storedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(storedPassword, suppliedPassword);
  }
}
