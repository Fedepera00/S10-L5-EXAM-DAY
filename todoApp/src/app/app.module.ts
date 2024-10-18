import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CompletedTodoComponent } from './completed-todo/completed-todo.component';
import { UserTodoComponent } from './user-todo/user-todo.component';
import { TodoService } from './services/todo.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterUserPipe } from './filter-user.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FilterTodosByUserPipe } from './filter-todos-by-user.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    CompletedTodoComponent,
    UserTodoComponent,
    FilterUserPipe,
    NavbarComponent,
    FooterComponent,
    FilterTodosByUserPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
