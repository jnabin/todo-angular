import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoStoreService } from 'src/app/services/todo-store.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  currentStatus: string;

  constructor(private todoStore: TodoStoreService, private route: ActivatedRoute) {
		this.todoStore = todoStore;
		this.route = route;
		this.currentStatus = '';
	}

	ngOnInit() {
		this.route.paramMap
			.subscribe((status: any) => {
				let urlParams = status.get('status');
        console.log(urlParams);
				this.currentStatus = urlParams || '';
			});
	}

	remove(uid: any) {
		this.todoStore.remove(uid);
	}

	update() {
		this.todoStore.persist();
	}

	getTodos() {
		if (this.currentStatus == 'completed') {
			return this.todoStore.getCompleted();
		} else if (this.currentStatus == 'active') {
			return this.todoStore.getRemaining();
		} else {
			return this.todoStore.todos;
		}
	}

	allCompleted() {
		return this.todoStore.allCompleted();
	}

	setAllTo(toggleAll: any) {
		this.todoStore.setAllTo(toggleAll.checked);
	}

}
