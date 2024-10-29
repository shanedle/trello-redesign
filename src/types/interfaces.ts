import { DocumentData } from "firebase/firestore";

export interface Builder {
  [key: string]: {
    state: boolean;
    value: string;
  };
}

export interface Columns {
  [key: string]: {
    name: string;
    cards: string[];
  };
}

export interface Cards {
  [key: string]: {
    name: string;
  };
}

export interface Snapshot {
  [key: string]: DocumentData;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  public: boolean;
  order: string[];
  createdAt: string;
}

export interface SearchBarProps {
  search: string;
  setSearch: (text: string) => void;
}

export interface NavbarProps {
  className?: string;
}
