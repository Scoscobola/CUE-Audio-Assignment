import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoStoreService } from '../../services/todo-store.service';
import template from './todo-footer.template.html';

@Component({
	selector: 'todo-footer',
	template: template
})
export class TodoFooterComponent {
	constructor(todoStore:TodoStoreService, route:ActivatedRoute) {
		this._todoStore = todoStore;
		this._route = route;
		this.currentStatus = '';
	}

	ngOnInit() {

		// this._route.params
		// 	.map(params => {
		// 		params.status
		// 	})
		// 	.subscribe((status) => {
		// 		this.currentStatus = status || '';
		// 	});
		this._route.params
			.subscribe((params) => {
				this.currentStatus = params.status || '';
		})
	}

	removeCompleted() {
		this._todoStore.removeCompleted();
	}

	getCount() {
		// Now returns count of all unarchived items
		return this._todoStore.getUnarchived().length;
	}

	getRemainingCount() {
		return this._todoStore.getRemaining().length;
	}

	getCompletedCount() {
		return this._todoStore.getCompleted().length;
	}

	// Gets count of archived items
	getArchivedCount() {
		return this._todoStore.getArchived().length;
	}

	hasCompleted() {
		return this._todoStore.getCompleted().length > 0;
	}
}
