export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface BoardData {
  id?: string;
  order?: string[];
  name: string;
  description: string;
  createdAt?: string;
  public: boolean;
}
