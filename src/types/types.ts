import React from 'react';

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
  id?: string;
  fileName?: string;
  ownerName?: string;
  ownerImageUrl?: string;
  gistName?: string;
  createdAt?: string;
  gitDescripton?: string;
  updatedAt?: string;
  gitHubUrl?: string;
}

export interface IdataTableProps {
  data: IGistsdata[];
}

export interface IFile {
  fileName: string;
  content: string;
}
export interface IGistBody {
  files: IFile[];
  description: string;
}

interface IData {
  content: string;
}
export interface IFileData {
  [key: string]: IData;
}

export interface INavProps {
  setSearchText: (arg: string) => void;
}

export interface INavbarFormData {
  searchText: string;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  selectedData: IGistsdata[];
  handleNextPage: () => void;
  handlePrevPage: () => void;
  setCurrentPage: React.Dispatch<number>;
}
