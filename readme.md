# CUE Audio Assignment submission from Jack Lewis
---

## Task 3 - Questions

1. In the todo-footer, there are various routerLinks with unique parameters. When the category of tasks changes, by clicking one of the list items, 
value of the parameterized route is updated and the corresponding component is inserted by the router-outlet. Any components which implemented an 
ActivatedRoute and subscribed to the routes params will get the value passed to the parameterized route. In the case of the todo-list component, the currentStatus property is updated as a result of a subscription to the params observable in the ngOnInit() method. Thus, when currentStatus changes, the return value of 
getTodos() changes as well and the todos are filtered accordingly.

2. The components are organized in a sort of hierarchy or component tree. The app component sits at the top of the tree and can be considered a root. Inside the app component is the router-outlet which delivers the correct state of the todo-list component. Since our only routes return some version of the todo-list component, we can think of the app component being composed of the todo-list component and a basic html footer. The todo list component is a child of the app component and is the parent of all other components. It contains the todo-header, any todo-items, and the todo-footer. These three components might be considered leaf nodes as they don't compose any other angular custom components, just basic HTML. 

3. It might be beneficial to allow the user to write out more detailed descriptions of their todos in a drop-down section. If someone wants to deeply describe an item on their todo list, it might look odd when other todo items are only a sentence long at most. I think it would be helpful to display the date that each item was added. It also might be helpful to allow the user to assign due dates for items so they can prioritize their todos. In addition to that, having the ability to drag and drop todos to reorder the list might be helpful for some people visually when prioritizing. 

## Summary of Changes
---

- todo-list.component.js
    + Added method to handle removing items from archive
    + getTodos(): added logic to check for archived state

- todo-list.template.html
    + Added event handler for removing item from archive

- todo-list.component.css
    + Added two new CSS classes
    + new-toggle replaced toggle class on todo-item component input element to make the checkbox visible
    + unarchive class added to style 'Remove from archive' button on archived items

- todo-item.component.js
    + Added new event that raises when item is to be removed from archive
    + Added unarchive method that is called when 'Remove from archive' button is clicked, raises event to remove item from archive

- todo-item.template.html
    + Added button that is conditionally rendered only if the todo item is archived

- todo-header.template.html
    + Changed h1 from 'Todos' to 'My Todos'

- todo-footer.component.js
    + getCount() now returns number of all unarchived items
    + Add getArchivedCount() to return number of all archived items

- todo-footer.template.html
    + Added new list item and routerLink to filter todos by archived status
    + Updated 'a' elements with interpolation to display the correct number of items based on filter

- todo-store.service.js
    + When reading from local store, added line to copy archived status of a todo
    + Changed getState() to expect completed property and archived property, matches based on value of both states
    + Changed removeCompleted to make all completed items archived
    + Changed getCompleted() and getRemaining() to return unarchived items
    + Added getUnarchived() to get all unarchived items regardless of completion status
    + Added getArchived() to get all archived items regardless of completion status
    + Changed remove() to check for archived state, if archived then delete item, if not archived then archive item
    + Added unarchive() to make archived state of a todo false
    + Changed add() to captialize the first letter of the todo item before adding it to the todo array
    + Changed _clearCache() to reset temporary list of items filtered by archived state

- todo.model.js
    + Added additional property to track archived state




---
# Angular 2 with ES2015 • [TodoMVC](http://todomvc.com)

> Angular is a development platform for creating applications using modern web standards. Angular includes a wealth of essential features such as mobile gestures, animations, filtering, routing, data binding, security, internationalization, and beautiful UI components. It's extremely modular, lightweight, and easy to learn.

## Resources

- [Website](https://angular.io/)
- [Documentation](https://angular.io/docs/ts/latest/)

### Articles

- [Angular 2 Beta Announcement](http://angularjs.blogspot.co.uk/2015/12/angular-2-beta.html)

### Support

- [StackOverflow](http://stackoverflow.com/questions/tagged/angular2)
- [Google Groups](https://groups.google.com/forum/#!forum/angular)
- [Twitter](http://twitter.com/angularjs)
- [Google+](https://plus.sandbox.google.com/+AngularJS/posts)

*Let us [know](https://github.com/tastejs/todomvc/issues) if you discover anything worth sharing.*

## Implementation

This app was built using Babel, Webpack and Angular 2 beta. To make changes simply

* `npm i`
* `npm run start`

## Credit

Created by [Soós Gábor](http://github.com/blacksonic)
