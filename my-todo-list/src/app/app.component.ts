import { Component } from '@angular/core';
import { Item } from './_interfaces/item';
import { FormBuilder, FormGroup } from '@angular/forms';
import {TasksService} from './_services/tasks.services';

// TODO: Add alert toa sk for confirmation before deleting a task.
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	/* An empty array that is responsible
	to store todo items */
	public items: Item[] = [];

  public isEditable: boolean = false; // Variable to display or hide the edit form for a todo task
  public selectedIndex: number = 0;

  public registerForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    public tasksService: TasksService
    )
    { }

  ngOnInit(): void {
    // Forms on init
    this.registerForm = this.formBuilder.group({
      title: [''],
      completed: [false]
    });
    // If data is already in the local store, assign it to the todo list
    if(localStorage.getItem("tasks-filtered") !== '' && localStorage.getItem("tasks-filtered") !== '[]' && localStorage.getItem("tasks-filtered") !== null) {
      this.items = JSON.parse(localStorage.getItem("tasks-filtered") || '{}');
    }
    else if(localStorage.getItem("tasks") !== '' && localStorage.getItem("tasks") !== '[]' && localStorage.getItem("tasks") !== null) {
      this.items = JSON.parse(localStorage.getItem("tasks") || '{}');
    }
    else{
      this.getTasks();
    }
  }

  /**
  * @ngdoc function
  * @name getTasks
  * @methodOf app.component.ts
  * @param none
  * @description calls the tasks service to get list from API endpoint
  * @public
  */
  public getTasks() {
    this.tasksService.index().subscribe(
      (response: any) => {
        response.slice(0, 11).map((item: any, i: any) => {
          this.items.push(item);
        });
        this.updateLocalStorage('tasks', this.items)
        return true;
      },
      error => {
        throw new Error(error.message);
      }
    )
  }

  /**
  * @ngdoc function
  * @name createTaskOnSubmit
  * @methodOf app.component.ts
  * @param none
  * @description adds task to the list and updates localStorage
  * @public
  */
  createTaskOnSubmit() {
    if(this.registerForm.value.title == '')
    {}
    else {
      this.items.push(this.registerForm.value);
      this.updateLocalStorage('tasks', this.items)
    }
    // Reinitializing the form's values
    this.registerForm.setValue({title: '', completed: false})
  }

  /**
  * @ngdoc function
  * @name itemIsEditable
  * @methodOf app.component.ts
  * @param {number} index Task index from table
  * @description triggers the edit form and saves the task index
  * @public
  */
  public itemIsEditable(index: number) {
    this.isEditable = true
    this.selectedIndex = index
    this.registerForm.setValue({
      title: this.items[this.selectedIndex]["title"],
      completed: this.items[this.selectedIndex]['completed']
    })
  }

  /**
  * @ngdoc function
  * @name changeStatus
  * @methodOf app.component.ts
  * @param {number} index Task index from table
  * @description updates an items completed value
  * @public
  */
   public changeStatus(index: number) {
    this.selectedIndex = index
    this.registerForm.setValue({
      title: this.items[this.selectedIndex]["title"],
      completed: this.items[this.selectedIndex]['completed'] = !this.items[this.selectedIndex]['completed']
    })
    this.modifyTask()
  }

  /**
  * @ngdoc function
  * @name filterBy
  * @methodOf app.component.ts
  * @param {string} status filter option
  * @description filters todo list array according to selected option
  * @public
  */
   public filterBy(status: string) {
    if(status === 'active')
    {
      this.items = JSON.parse(localStorage.getItem("tasks") || '{}');
      const result = this.items.filter(item => item.completed === false);
      this.items = result
      this.updateLocalStorage("tasks-filtered", this.items)
    }
    else if(status === 'completed')
    {
      this.items = JSON.parse(localStorage.getItem("tasks") || '{}');
      const result = this.items.filter(item => item.completed === true);
      this.items = result
      this.updateLocalStorage("tasks-filtered", this.items)
    }
    else
    {
      this.items = JSON.parse(localStorage.getItem("tasks") || '{}');
    }
  }

  /**
  * @ngdoc function
  * @name modifyTask
  * @methodOf app.component.ts
  * @param none
  * @description updates a task from the list
  * @public
  */
	public modifyTask() {
    this.items[this.selectedIndex]['title'] = this.registerForm.value.title ? this.registerForm.value.title : this.items[this.selectedIndex]['title']
    this.items[this.selectedIndex]['completed'] = this.registerForm.value.completed
    this.updateLocalStorage('tasks', this.items)
    // Hiding the edit form and reinitializing the form's values
    this.isEditable = false
    this.registerForm.setValue({title: '', completed: false})
	}

  /**
  * @ngdoc function
  * @name deleteTask
  * @methodOf app.component.ts
  * @param {number} index Task index from table
  * @description This method removes a task from the list
  * @public
  */
	public deleteTask(index: number) {
		this.items.splice(index, 1);
    this.updateLocalStorage('tasks', this.items)
	}

  /**
  * @ngdoc function
  * @name updateLocalStorage
  * @methodOf app.component.ts
  * @param {Item[]} items List of todo tasks
  * @description This method updates the local storage
  * @public
  */
  public updateLocalStorage(key: string, items: Item[]) {
    localStorage.setItem(key, JSON.stringify(items))
  }
}
