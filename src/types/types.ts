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

export interface IGistsdata {
  id: string;
  fileName?: string;
  ownerName: string;
  ownerImageUrl: string;
  gistName: string;
  createdAt: string;
  gitDescripton?: string;
  updatedAt?: string;
}

export interface IdataTableProps {
  data: IGistsdata[];
}
