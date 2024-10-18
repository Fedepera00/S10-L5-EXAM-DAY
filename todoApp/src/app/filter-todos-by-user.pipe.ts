import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo.model';
import { User } from './models/user.model';

@Pipe({
  name: 'filterTodosByUser',
})
export class FilterTodosByUserPipe implements PipeTransform {
  transform(todos: Todo[], searchTerm: string, users: User[]): Todo[] {
    if (!todos || !searchTerm || !users) {
      return todos;
    }

    const filteredUsers = users.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const userIds = filteredUsers.map((user) => user.id);

    return todos.filter((todo) => userIds.includes(todo.userId));
  }
}
