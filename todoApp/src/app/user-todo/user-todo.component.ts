import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-todo',
  templateUrl: './user-todo.component.html',
  styleUrls: ['./user-todo.component.scss'],
})
export class UserTodoComponent implements OnInit {
  users: User[] = [];
  todos: Todo[] = [];
  searchTerm: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getUsers().subscribe((usersData: User[]) => {
      this.users = usersData;

      this.todoService.getTodos().subscribe((todoData: Todo[]) => {
        this.todos = todoData;
      });
    });
  }

  getUserTodos(userId: number): Todo[] {
    return this.todoService.getUserTodos(userId);
  }
}
