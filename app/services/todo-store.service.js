import { Injectable } from '@angular/core';

import { TodoModel } from '../models/todo.model';

@Injectable()
export class TodoStoreService {
	todos = [];

	constructor() {
		let persistedTodos = JSON.parse(localStorage.getItem('angular2-todos')) || [];

		this.todos = persistedTodos.map((todo) => {
			let ret = new TodoModel(todo.title);
			ret.completed = todo.completed;
			// Additional property to copy when reading from local storage
			ret.archived = todo.archived;
			ret.uid = todo.uid;
			return ret;
		});
	}

	get(state) {
		// Added additional check for archived state
		return this.todos.filter((todo) => todo.completed === state.completed && todo.archived === state.archived);
	}

	allCompleted() {
		return this.todos.length === this.getCompleted().length;
	}

	setAllTo(completed) {
		this.todos.forEach((todo) => todo.completed = completed);
		this.persist();
	}

	removeCompleted() {
		//this.todos = this.get({ completed: false });
		// Instead of removing all completed items, sets all completed items to archived
		this.todos.forEach((todo) => {
			if (todo.completed){
				todo.archived = true;
			}
		})
		this.persist();
	}

	getRemaining() {
		if (!this.remainingTodos) {
			// Gets all incomplete, unarchived items
			this.remainingTodos = this.get({ completed: false, archived: false });
		}

		return this.remainingTodos;
	}

	getCompleted() {
		if (!this.completedTodos) {
			// Gets all complete, unarchived items
			this.completedTodos = this.get({ completed: true, archived: false });
		}

		return this.completedTodos;
	}

	// Gets all unarchived items regardless of completion status
	getUnarchived() {
		return this.getCompleted().concat(this.getRemaining());
	}

	// Gets all archived items regardless of completion status
	getArchived() {
		if (!this.archivedTodos) {
			this.archivedTodos = this.todos.filter((todo) => todo.archived === true);
		}

		return this.archivedTodos;
	}

	toggleCompletion(uid) {
		let todo = this._findByUid(uid);

		if (todo) {
			todo.completed = !todo.completed;
			this.persist();
		}
	}

	remove(uid) {
		let todo = this._findByUid(uid);

		// Now checks archived state
		if (todo.archived === true){
			// item is already archived, remove it from list
			this.todos.splice(this.todos.indexOf(todo), 1);
			this.persist();
		} else {
			// item isn't archived, archive it
			todo.archived = !todo.archived;
			this.persist();
		}
	}

	// Removes item from archive filter
	unarchive(uid) {
		let todo = this._findByUid(uid);
		todo.archived = !todo.archived;
		this.persist();
	}

	add(title) {
		// Captitalizing the first letter of every task title
		title = title.charAt(0).toUpperCase() + title.slice(1);
		this.todos.push(new TodoModel(title));
		this.persist();
	}

	persist() {
		this._clearCache();
		localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
	}

	_findByUid(uid) {
		return this.todos.find((todo) => todo.uid == uid);
	}

	_clearCache() {
		this.completedTodos = null;
		this.remainingTodos = null;
		// Added to reset temporary list of items filtered by archived state
		this.archivedTodos = null;
	}
}
