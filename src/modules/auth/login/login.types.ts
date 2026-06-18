import type { User } from "../shared/types";

export type LoginDto = {
  user: User;
  accessToken: string;
  idToken: string;
  role: string;
};
export type LoginRequest = {
  idToken: string;
};
