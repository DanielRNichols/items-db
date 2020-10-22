import {ApiError} from "../api/ApiError";
import jwt from "jsonwebtoken";

export interface IAuthPayload {
  subject: string;
}

function isAuthPayload(obj: any): obj is IAuthPayload {
  const payload = obj as IAuthPayload;

  return (payload && (payload.subject !== undefined));
}

const getSecret = (): string => {
  return process.env.SECRET || "defaultPrivateKey";
};

const getExpiresIn = (): string => {
  return process.env.TOKEN_EXPIRES_IN || "1d";
}

const validateCredentials = (userName: string, password: string): boolean | ApiError => {
  if (!userName.toLowerCase().endsWith("@mycompany.com")) {
    return new ApiError(401, "Invalid User Name");
  }
  if (password !== "123") {
    return new ApiError(401, "Incorrect password");
  }
  return true;
};

export const createToken = (userName: string, password: string): string | ApiError => {
  const result = validateCredentials(userName, password);
  if (result instanceof ApiError) {
    return result;
  }
  console.log(`secret = ${getSecret()}`);
  console.log(`TOKEN_EXPIRES_IN=${process.env.TOKEN_EXPIRES_IN}`);
  console.log(`token expires in ${getExpiresIn()}`);
  return jwt.sign({subject: userName}, getSecret(), {issuer: "bentley", expiresIn: getExpiresIn()});  // for seconds pass number not string
};

export const validateToken = (authHeader: string): boolean | ApiError => {
  const tokenType = "Bearer ";
  if (!authHeader)  {
    return new ApiError(401, "No token");
  }
  if (!authHeader.startsWith(tokenType)) {
    return new ApiError(401, "Invalid token - not a Bearer token");
  }

  const token = authHeader.substring(tokenType.length);
  console.log(`token:${token}`);
  console.log(`secret = ${getSecret()}`);
  try {
    const options: jwt.VerifyOptions = {ignoreExpiration: false, issuer: "bentley"};
    const payload = jwt.verify(token, getSecret(), options);
    console.log(payload);
    if (!payload || !isAuthPayload(payload)) {
      return new ApiError(401, "Invalid token - invalid payload");
    }

    console.log(`userName: ${payload.subject}`);
    return true;
  } catch (err) {
    return new ApiError(401, err.message);
  }
};
