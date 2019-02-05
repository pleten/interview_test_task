import { User } from '../models/user.model';

export interface ILogin {
    user: User;
    isLoginSuccessful?: boolean;
    emailValidationMessage?: string;
    passwordValidationMessage?: string;
    infoSnackBarMessage?: string;
    errorSnackBarMessage?: string;
}
