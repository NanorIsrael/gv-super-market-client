export type ErrorType = {
  [key: string]: string;
};

export interface AuthFormType {
  username: string;
  email?: string;
  password: string;
  confirm_pass?: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface MeType {
  username: string;
  email: string;
  isAdmin: boolean;
  _id?: string;
}
// export interface MeType {
//   user: {
//     username: string;
//     email: string;
//   };
// }
