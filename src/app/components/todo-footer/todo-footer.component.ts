import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoStoreService } from 'src/app/services/todo-store.service';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {

  currentStatus: string;

  constructor(private todoStore: TodoStoreService, private route:ActivatedRoute) {
		this.todoStore = todoStore;
		this.route = route;
    this.currentStatus = '';
	}

	ngOnInit() {
		this.route.paramMap
			.subscribe((status: any) => {
        let urlParams = status.get('status');
				this.currentStatus = urlParams || '';
			});
	}

	removeCompleted() {
		this.todoStore.removeCompleted();
	}

	getCount() {
		return this.todoStore.todos.length;
	}

	getRemainingCount() {
		return this.todoStore.getRemaining().length;
	}

	hasCompleted() {
		return this.todoStore.getCompleted().length > 0;
	}

}
