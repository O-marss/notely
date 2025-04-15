export type AuthStore = {
  token: string;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export interface Root {
  msg: string;
  notes: Note[];
}

export interface Note {
  title: string;
  content: string;
  createdBy: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type EditCardProps = {
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  note:Note;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
};

export type ViewCardProps = {
  reading: boolean;
  setReading: React.Dispatch<React.SetStateAction<boolean>>;
  note:Note;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
}