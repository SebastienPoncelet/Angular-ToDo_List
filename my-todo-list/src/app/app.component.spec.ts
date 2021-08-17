import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {TasksService} from './_services/tasks.services';
import {HttpClientModule} from '@angular/common/http';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let Tasks: any;
  let fixture: any;
  let app: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        TasksService
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    app.ngOnInit();
    Tasks = [
      {
        id: 1,
        userId: 1,
        title: 'FAKE TASK 1',
        completed: true
      },
      {
        id: 2,
        userId: 1,
        title: 'FAKE TASK 2',
        completed: false
      },
    ];
    app.items = [
      {
        id: 1,
        userId: 1,
        title: 'FAKE TASK 1',
        completed: true
      },
      {
        id: 2,
        userId: 1,
        title: 'FAKE TASK 2',
        completed: false
      },
    ];
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should add a task to the tasks array', fakeAsync(() => {
    tick(100)
    // Initializing the form input values
    app.registerForm.setValue({title: 'FAKE TASK 0', completed: true})
    const selectedIndex: number = 0
    app.selectedIndex = selectedIndex
    Tasks[selectedIndex]['title'] = 'FAKE TASK 0'
    app.modifyTask();
    expect(app.items).toEqual(Tasks);
  }))

  it('should modify a task in the tasks array', () => {

    expect(app).toBeTruthy();
  });

  it('should remove the first task from the tasks array', () => {
    app.deleteTask(0);
    expect(app.items).toEqual([Tasks[1]]);
  })

});