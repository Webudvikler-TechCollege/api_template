import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel";

interface jwtPayload {
  exp: number;
  data: {
    id: number;
  };
}

const generateToken = (
  user: { id: number },
  type: "access" | "refresh"
): string => {
  const key = process.env[`TOKEN_${type.toUpperCase()}_KEY`];
  const expires_in = process.env[`TOKEN_${type.toUpperCase()}_EXPIRATION_SECS`];

  if (!key || !expires_in) {
    throw new Error(`Missing env vars for ${type} token`);
  }

  const expTime = Math.floor(Date.now() / 1000) + Number(expires_in);
  return jwt.sign({ exp: expTime, data: { id: user.id } }, key);
};

const authenticateUser = async (username: string, password: string) => {
  const user = await User.findOne({
    attributes: ["id", "firstname", "lastname", "password"],
    where: { email: username, is_active: 1 },
  });

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const refresh_token = generateToken(user, "refresh");
  const access_token = generateToken(user, "access");

  await User.update({ refresh_token }, { where: { id: user.id } });

  return {
    access_token,
    refresh_token,
    user: { id: user.id, firstname: user.firstname, lastname: user.lastname },
  };
};

const verifyRefreshToken = async (refresh_token: string) => {
  const user = await User.findOne({ where: { refresh_token } });
  if (!user) return null;

  jwt.verify(refresh_token, process.env.TOKEN_REFRESH_KEY!); // will throw if invalid
  const access_token = generateToken(user, "access");
  return access_token;
};

const getUserIdFromToken = (token: string): number | null => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_ACCESS_KEY!) as jwtPayload;
    return decoded.data.id;
  } catch {
    return null;
  }
};

export {
  authenticateUser,
  verifyRefreshToken,
  getUserIdFromToken,
  generateToken
};
