import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CompletedTodoComponent } from './completed-todo/completed-todo.component';
import { UserTodoComponent } from './user-todo/user-todo.component';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'completed', component: CompletedTodoComponent },
  { path: 'users', component: UserTodoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
