export interface IUser {
  accessToken: string;
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

export interface IInitialState {
  isAuthenticated: boolean;
  user: IUser | null;
}

export interface IGistCardProps {
  id?: string;
  fileContent?: string;
  OwnerName?: string;
  OwnerImageURL?: string;
  gistName?: string;
  createdAt?: string;
  gitDescripton?: string;
}

export interface IGistsdata {
  id: string;
  fileContent: string;
  OwnerName: string;
  OwnerImageURL: string;
  gistName: string;
  createdAt: string;
  gitDescripton: string;
}
