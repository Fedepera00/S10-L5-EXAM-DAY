import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  users: User[] = [];
  searchTerm: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });

    this.todoService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  toggleCompleted(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodoStatus(todo);
  }

  getUserName(userId: number): string {
    const user = this.users.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
  }
}
