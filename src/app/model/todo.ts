import { v4 as uuidv4 } from 'uuid';

export class TodoModel {
	completed: boolean;
	title: string;
	uid: string;

	setTitle(title: string) {
		this.title = title.trim();
	}

	constructor(title: string) {
		this.uid = uuidv4();
		this.completed = false;
		this.title = title ?? ''.trim();
	}
}
