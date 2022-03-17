import { HttpException } from "@core/exceptions";
import { isEmptyObject } from "@core/utils";
import { DataStoredInToken, IUser, TokenData } from "@modules/auth";
import { UserSchema } from "@modules/users";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import LoginDto from "./auth.dto";

class AuthService {
  public userSchema = UserSchema;

  public async login(model: LoginDto): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty.");
    }

    const user = await this.userSchema
      .findOne({
        email: model.email,
      })
      .exec();
    if (!user) {
      throw new HttpException(409, `Your email ${model.email} is not exits.`);
    }

    const isMatchPassword = await bcryptjs.compare(
      model.password,
      user.password
    );

    if (!isMatchPassword)
      throw new HttpException(400, "Credential is not valid");
    return this.createToken(user);
  }

  public async getCurrentLoginUser(userId: string): Promise<IUser> {
    const user = await this.userSchema.findById(userId).exec();
    if (!user) {
      throw new HttpException(409, `User is not exists`);
    }
    return user;
  }

  private createToken(user: IUser): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user._id };
    const secret: string = process.env.JWT_TOKEN_SECRET!;
    const expiresIn: number = 60;
    return {
      token: jwt.sign(dataStoredInToken, secret, { expiresIn: expiresIn }),
    };
  }
}
export default AuthService;
