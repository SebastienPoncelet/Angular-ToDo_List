import { Component } from '@angular/core';
import { Item } from './item';
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
  }

  public getTasks() {
    // TODO: Call service to retrive tasks list from url
    this.tasksService.index().subscribe(
      (response: any) => {
        response.slice(0, 11).map((item: any, i: any) => {
          this.items.push(item);
        });
        console.log('app.component.ts - 50 ==> response', response)
      },
      error => {
        // TODO: throw exception
        // console.log("yolo-error", error);
      }
    )

  }

  /* When input is empty, it will
  not create a new division */
  createTaskOnSubmit() {
    if(this.registerForm.value.title == '')
    {}
    else {
      console.log('app.component.ts - 66 ==> this.registerForm.value', this.registerForm.value)
      this.items.push(this.registerForm.value);
    }
  }

  /* This function takes to input the
	task, that has to be deleted*/
	public modifyTask(index: number) {
    console.log('app.component.ts - 73 ==> index', index)
		this.items.splice(index, 1);
	}

	/* This function takes to input the
	task, that has to be deleted*/
	public deleteTask(index: number) {
    console.log('app.component.ts - 73 ==> index', index)
		this.items.splice(index, 1);
	}
}
