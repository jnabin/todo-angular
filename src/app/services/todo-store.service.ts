import { Injectable } from '@angular/core';
import { TodoModel } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoStoreService {

  todos: any[] = [];
  remainingTodos: any[] = [];
  completedTodos: any[] = [];

	constructor() {
		let persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') as string) || [];

		this.todos = persistedTodos.map((todo: any) => {
			let ret = new TodoModel(todo.title);
			ret.completed = todo.completed;
			ret.uid = todo.uid;
			return ret;
		});
	}

	get(state: any) {
		return this.todos.filter((todo: any) => todo.completed === state.completed);
	}

	allCompleted() {
		return this.todos.length === this.getCompleted().length;
	}

	setAllTo(completed: boolean) {
		this.todos.forEach((todo: any) => todo.completed = completed);
		this.persist();
	}

	removeCompleted() {
		this.todos = this.get({ completed: false });
		this.persist();
	}

	getRemaining() {
		if (this.remainingTodos.length == 0) {
			this.remainingTodos = this.get({ completed: false });
		}

		return this.remainingTodos;
	}

	getCompleted() {
		if (this.completedTodos.length == 0) {
			this.completedTodos = this.get({ completed: true });
		}

		return this.completedTodos;
	}

	toggleCompletion(uid: string) {
		let todo: any = this._findByUid(uid);

		if (todo) {
			todo.completed = !todo.completed;
			this.persist();
		}
	}

	remove(uid: any) {
		let todo = this._findByUid(uid);

		if (todo) {
			this.todos.splice(this.todos.indexOf(todo), 1);
			this.persist();
		}
	}

	add(title: any) {
		this.todos.push(new TodoModel(title));
		this.persist();
	}

	persist() {
		this._clearCache();
		localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
	}

	_findByUid(uid: any) {
		return this.todos.find((todo) => todo.uid == uid);
	}

	_clearCache() {
		this.completedTodos = [];
		this.remainingTodos = [];
	}
}
