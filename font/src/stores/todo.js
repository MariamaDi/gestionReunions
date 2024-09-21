import { defineStore } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  actions: {
    // Créer une tâche
    async createTodo(newTodo) {
      try {
        const response = await axios.post("/api/todos", newTodo);
        this.todos.push(response.data);
      } catch (error) {
        console.error("Erreur lors de la création de la tâche :", error);
      }
    },
    // Lire toutes les tâches
    async fetchTodos() {
      try {
        const response = await axios.get(
          "https://todolist-v2.shuttleapp.rs/todos"
        );
        this.todos = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
      }
    },
    // Mettre à jour une tâche
    async updateTodo(updatedTodo) {
      try {
        const response = await axios.put(
          `/api/todos/${updatedTodo.id}`,
          updatedTodo
        );
        const index = this.todos.findIndex(
          (todo) => todo.id === updatedTodo.id
        );
        if (index !== -1) {
          this.todos.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la tâche :", error);
      }
    },
    // Supprimer une tâche
    async deleteTodo(todoId) {
      try {
        await axios.delete(`/api/todos/${todoId}`);
        const index = this.todos.findIndex((todo) => todo.id === todoId);
        if (index !== -1) {
          this.todos.splice(index, 1);
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de la tâche :", error);
      }
    },
  },
});
