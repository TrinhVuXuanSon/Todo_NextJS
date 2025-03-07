export interface TodoProps {
  id: string;
  name: string;
  completed: boolean;
  userId: string;
}

export interface TodoItemProps {
  todo: TodoProps;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string) => void;
}

export interface TodoListProps {
  todos: TodoProps[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string) => void;
}

export interface InputTodoProps {
  onAdd: (value: string) => void;
}

export interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export interface DetailsProps {
  todos: TodoProps[];
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string) => void;
}

export interface HomePageProps {
  todos: {
    todos: TodoProps[];
    searchTerm: string;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  onLogout: () => void;
}

export interface TodoSliceProps {
  todos: TodoProps[];
  searchTerm: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface RootStateProps {
  todos: {
    todos: TodoProps[];
  };
}

export interface DetailsViewProps {
  todo: TodoProps | undefined;
  editText: string;
  onEditChange: (value: string) => void;
  onSave: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export interface SearchBarViewProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputTodoViewProps {
  text: string;
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

export interface TodoItemViewProps {
  todo: TodoProps;
  onToggle: () => void;
  onDetails: () => void;
}

export interface User {
  id?: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface TodoListViewProps {
  todos: TodoProps[];
  onToggle: (id: string) => void;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  selectedTodo: { id: string; name: string } | null;
  editedName: string;
  onEditNameChange: (value: string) => void;
  onEditClick: (todo: TodoProps) => void;
  onDeleteClick: (todo: TodoProps) => void;
  onEditSubmit: () => void;
  onDeleteSubmit: () => void;
  onCloseModals: () => void;
}

export interface TodoTableProps {
  todos: TodoProps[];
  title: string;
  onToggle: (id: string) => void;
  onEdit: (todo: TodoProps) => void;
  onDelete: (todo: TodoProps) => void;
}

export interface DashBoardProps {
  onLogin: () => void;
}

export interface LoginProps {
  username: string;
  password: string;
  error?: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}