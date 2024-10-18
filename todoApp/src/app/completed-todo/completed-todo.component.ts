import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-completed-todo',
  templateUrl: './completed-todo.component.html',
  styleUrls: ['./completed-todo.component.scss'],
})
export class CompletedTodoComponent implements OnInit {
  todos: Todo[] = [];
  users: User[] = [];
  searchTerm: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
    this.loadUsers();
  }

  // QUI CARICO TUTTI I TODO
  loadTodos(): void {
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      this.todos = todos.filter((todo) => todo.completed); // FILTRO TASK CHE COMPLETO
    });
  }

  // QUI CARICO GLI UTENTI
  loadUsers(): void {
    this.todoService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  // RITORNO I TODO DI UN UTENTE IN PARTICOLAR3
  getUserCompletedTodos(userId: number): Todo[] {
    return this.todos.filter(
      (todo) => todo.userId === userId && todo.completed
    );
  }

  // ADD NEW TODO
  addTodo(todo: Todo): void {
    this.todoService.addTodo(todo).subscribe((newTodo: Todo) => {
      if (newTodo.completed) {
        this.todos.push(newTodo);
      }
    });
  }
}
