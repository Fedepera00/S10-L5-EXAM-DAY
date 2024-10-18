import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../app/models/user.model';

@Pipe({
  name: 'filterUser',
})
export class FilterUserPipe implements PipeTransform {
  transform(users: User[], searchTerm: string): User[] {
    if (!searchTerm) return users;

    searchTerm = searchTerm.toLowerCase();

    return users.filter((user) => {
      const fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
      return fullName.includes(searchTerm);
    });
  }
}
