export interface IUser {
  accessToke: string;
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

export interface IInitialState {
  isAuthenticated: boolean;
  user: IUser | null;
}
