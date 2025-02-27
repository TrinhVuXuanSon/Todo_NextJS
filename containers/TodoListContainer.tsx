"use client";

import { useState } from "react";
import TodoList from "@/components/todo/TodoList";
import { TodoListProps, TodoProps } from "@/types/todo";

const TodoListContainer = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
}: TodoListProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [editedName, setEditedName] = useState("");

  const handleEditClick = (todo: TodoProps) => {
    setSelectedTodo(todo);
    setEditedName(todo.name);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (todo: TodoProps) => {
    setSelectedTodo(todo);
    setIsDeleteModalOpen(true);
  };

  const handleEditSubmit = () => {
    if (selectedTodo && editedName.trim()) {
      onEdit(selectedTodo.id, editedName);
      setIsEditModalOpen(false);
      setSelectedTodo(null);
    }
  };

  const handleDeleteSubmit = () => {
    if (selectedTodo) {
      onDelete(selectedTodo.id);
      setIsDeleteModalOpen(false);
      setSelectedTodo(null);
    }
  };

  const handleCloseModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedTodo(null);
  };

  return (
    <TodoList
      todos={todos}
      onToggle={onToggle}
      isEditModalOpen={isEditModalOpen}
      isDeleteModalOpen={isDeleteModalOpen}
      selectedTodo={selectedTodo}
      editedName={editedName}
      onEditNameChange={setEditedName}
      onEditClick={handleEditClick}
      onDeleteClick={handleDeleteClick}
      onEditSubmit={handleEditSubmit}
      onDeleteSubmit={handleDeleteSubmit}
      onCloseModals={handleCloseModals}
    />
  );
};

export default TodoListContainer;
