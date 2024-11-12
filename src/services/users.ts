import { LoginDto, RegisterDto } from "../../dto/user";
import User, { IUser } from "../models/user";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin = async (user: LoginDto) => {
  try {
    const userFromDatabase = await User.findOne({
      username: user.username,
    }).lean();
    if (!userFromDatabase) throw new Error("user not found");
    const match = await compare(user.password, userFromDatabase.password);
    if (!match) throw new Error("wrong password");
    // gen token
    const token = await jwt.sign(
      {
        user_id: userFromDatabase._id,
        isAdmin: userFromDatabase.isAdmin,
        username: userFromDatabase.username,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "10m",
      }
    );
    return { ...userFromDatabase, token, password: "*******" };
  } catch (err) {
    throw err;
  }
};

export const createNewUser = async (user: RegisterDto) => {
  try {
    if (!user.username) {
      throw new Error("username is required!");
    }
    console.log({ user });
    if (!user.password)
      throw new Error("Missing user data, [password] is require");
    const encPass = await hash(user.password, 10);
    user.password = encPass;
    const newUser = new User(user);
    return await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Can't create new user");
  }
};

export const profileService = async (user: { user_id: string }) => {
  // console.log({ user });
  try {
    if (!user) {
      throw new Error("user is required!");
    }
    // console.log({ user });
    const findById = await User.findOne({ _id: user.user_id });
    // console.log({ findById });
    if (!findById) throw new Error("user not found!");
    return findById;
  } catch (err: any) {
    console.log(err);
    throw new Error(`${err.message}`);
  }
};

export const AdminDataService = async (user: { user_id: string }) => {
  // console.log({ user });
  try {
    if (!user) {
      throw new Error("user is required!");
    }
    return "מידע שרק מנהלים יכולים לראות";
  } catch (err: any) {
    console.log(err);
    throw new Error(`${err.message}`);
  }
};

export const initDatabase = async () => {
  try {
    const newUser = new User({
      username: "username",
      password: "1234",
      isAdmin: false,
    });
    await newUser.save();
  } catch (err) {
    console.log(
      "Error accured while creating initial state of candidates",
      err
    );
  }
};
