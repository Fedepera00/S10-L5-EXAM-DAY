import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
//FEDE RICORDA
export class TodoService {
  private todosSubject = new ReplaySubject<Todo[]>(1); // USO IL REPLAYSUBJECT PER MANTENERE I TODO
  private usersSubject = new ReplaySubject<User[]>(1); // USO IL REPLAYSUBJECT PER MANTENERE GLI UTENTI
  private todos: Todo[] = [];
  private users: User[] = [];

  constructor(private http: HttpClient) {
    this.loadTodos(); // CARICO TODO ALL'INIZIALIZZAZIONE
    this.loadUsers(); // CARICO UTENTI ALL'INIZIALIZZAZIONE
  }

  // CARICO I TODO DAL JSON
  private loadTodos(): void {
    this.http
      .get<{ toDoList: Todo[] }>('assets/db-todos.json')
      .pipe(map((response) => response.toDoList))
      .subscribe((todos) => {
        this.todos = todos; // TODO SONO IN LOCALE
        this.todosSubject.next(this.todos); // AGGIORNO CON IL  SUBJECT I NUOVI TODO
      });
  }

  // CARICO UTENTI DAL SJON
  private loadUsers(): void {
    this.http
      .get<{ users: User[] }>('assets/db-users.json')
      .pipe(map((response) => response.users))
      .subscribe((users) => {
        this.users = users; // UTENTI IN LOCALE
        this.usersSubject.next(this.users); // AGGIORNO CON IL SUBJECT I NUOVI UTENTI
      });
  }

  // RITORNA TODOS COME OBSERVABLES
  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  // RITORNA UTENTE COME OBSERVABLES
  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  // NEW TODOS ADDD
  addTodo(newTodo: Todo): Observable<Todo> {
    this.todos.push(newTodo);
    this.todosSubject.next(this.todos);
    return new Observable((observer) => {
      observer.next(newTodo);
    });
  }

  // UPGRADE STATO TODO
  updateTodoStatus(updatedTodo: Todo): void {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.todosSubject.next(this.todos);
    }
  }

  // OTTENERE I TOPO DI UN USER
  getUserTodos(userId: number): Todo[] {
    return this.todos.filter((todo) => todo.userId === userId); // CI USO UN FILTER PER LA RICERCA
  }
}
