import { AsyncPipe, CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { map, Observable } from "rxjs";
import { UserService } from "../services/user";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@Component({
	selector: 'app-user-list',
	standalone: true,
	templateUrl: './user-list.html',
	styleUrls: ['./user-list.scss'],
	imports: [AsyncPipe, CommonModule, FormsModule, HttpClientModule],
	providers: [UserService]
})
export class UserListComponent {
	users$: Observable<any[]>;
	filteredUsers$: Observable<any[]>;
	searchQuery: string = '';

	constructor(private userService: UserService) {
		this.users$ = this.userService.getUsers();
		this.filteredUsers$ = this.users$
			.pipe(map((users: any[]) => users
				.filter((user: any) => user.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
			));
	}

	onSearchQueryChange() {
		this.filteredUsers$ = this.users$.pipe(
			map(users =>
				users.filter(user =>
					user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
				)
			)
		);
	}
}
