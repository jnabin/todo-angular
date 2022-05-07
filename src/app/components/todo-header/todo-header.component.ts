import { Component, OnInit } from '@angular/core';
import { TodoStoreService } from 'src/app/services/todo-store.service';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent {

  newTodo = '';

	constructor(private todoStore: TodoStoreService) {
		this.todoStore = todoStore;
	}

	addTodo() {
		if (this.newTodo.trim().length) {
			this.todoStore.add(this.newTodo);
			this.newTodo = '';
		}
	}

}
