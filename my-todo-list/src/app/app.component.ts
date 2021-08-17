import { Component } from '@angular/core';
import { Item } from './item';
import { FormBuilder, FormGroup } from '@angular/forms';
import {TasksService} from './_services/tasks.services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	/* An empty array that is responsible
	to add a division */
	public items: Item[] = [];

	/* A two-way binding performed which
	pushes text on division */
	public newTask: any;

  public registerForm: FormGroup = new FormGroup({});

  constructor(
    // TODO: replace with apropriate service
    private formBuilder: FormBuilder,
    public tasksService: TasksService
    )
    { }

  ngOnInit(): void {
    // Forms on init
    this.registerForm = this.formBuilder.group({
      title: [''],
      completed: [null]
    });

    // TODO: Create local storage for keeping new tasks in memory
    localStorage.setItem('test-item', JSON.stringify(this.items))

    this.getTasks();
    // console.log("USER TEMP 47");
  }

  public getTasks() {
    // TODO: Call service to retrive tasks list from url
    this.tasksService.index().subscribe(
      (response: any) => {
        response.slice(0, 11).map((item: any, i: any) => {
          this.items.push(item);
        });
        console.log('app.component.ts - 48 ==> response', response)
        // this.items = response;
        // console.log("yolo", response);
      },
      error => {
        // console.log("yolo-error", error);
      }
    )

  }

	/* When input is empty, it will
	not create a new division */
	public addToList(newTask: any) {
    if(newTask.title == '')
    {}
    else {
      this.items.push(newTask);
    }
		// if (this.newTask == '') {
		// }
		// else {
		// 	this.items.push(this.newTask);
		// 	this.newTask = '';
		// }
	}

  createTaskOnSubmit() {

    // this.tasksService.create(this.registerForm.value).subscribe(
    //   response => {
    //     // console.log("yolo", response);
    //     // console.log(response['id']);
    //     this.userID.emit(response['id']); // Emit User ID to child User
    //     this.redirectUser(response['id']);
    //   },
    //   error => {
    //     // console.log("yolo-error", error);
    //   });

    this.addToList(this.registerForm.value)
  }

	/* This function takes to input the
	task, that has to be deleted*/
	public deleteTask(index: number) {
		this.items.splice(index, 1);
	}
}
