import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoStoreService } from '../../services/todo-store.service';
import template from './todo-list.template.html';

@Component({
	selector: 'todo-list',
	template: template,
})
export class TodoListComponent {
	constructor(todoStore: TodoStoreService, route: ActivatedRoute) {
		this._todoStore = todoStore;
		this._route = route;
		this._currentStatus = '';
	}

	ngOnInit() {
		this._route.params
			.map(params => params.status)
			.subscribe((status) => {
				this._currentStatus = status;
			});
		
		// this._route.params
		// 	.subscribe((params) => {
		// 		this._currentStatus = params.status;
		// })
	}

	remove(uid) {
		this._todoStore.remove(uid);
	}

	update() {
		this._todoStore.persist();
	}

	// Added method to handle removing item from archive.
	unarchive(uid) {
		this._todoStore.unarchive(uid);
	}

	getTodos() {
		if (this._currentStatus == 'completed') {
			return this._todoStore.getCompleted();
		} else if (this._currentStatus == 'active') {
			return this._todoStore.getRemaining();
		} 
		// Added logic to check for archived status
		else if (this._currentStatus == 'archived'){
			return this._todoStore.getArchived();
		} else {
			return this._todoStore.getUnarchived();
		}
	}

	allCompleted() {
		return this._todoStore.allCompleted();
	}

	setAllTo(toggleAll) {
		this._todoStore.setAllTo(toggleAll.checked);
	}
}
