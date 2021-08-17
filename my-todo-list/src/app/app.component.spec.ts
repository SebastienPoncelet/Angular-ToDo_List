import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {TasksService} from './_services/tasks.services';
import {HttpClientModule} from '@angular/common/http';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let Tasks: any;
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
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it('modify a task in the list', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  it('should remove the second episode from the episodes array', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
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
    app.deleteTask(0);
    // Assert
    expect(app.items).toEqual([Tasks[1]]);
  })

});

// describe('AppComponent', () => {
//   // let component: AppComponent;
//   let Tasks: any;
//   // let mockEpisodeService;

//   beforeEach(() => {
//     Tasks = [
//       {
//         title: 'FAKE TASK 1',
//         completed: true
//       },
//       {
//         title: 'FAKE TASK 2',
//         completed: false
//       },
//     ];
//   })

//   describe('Delete', () => {
//       it('should remove the second episode from the episodes array', () => {            
           
//           // Arrange
//           // mockEpisodeService.deleteEpisode.and.returnValue(of(true));            
//           // component.tasks = EPISODES;
           
//           // Act
//           const fixture = TestBed.createComponent(AppComponent);
//           const app = fixture.componentInstance;
//           // let component = TestBed.createComponent(AppComponent);
//           app.deleteTask(0);
//           // component.delete(EPISODES[1]);
           
//           // Assert
//           expect(app.items).toEqual(Tasks[1]);  
//       })       
//   })
// })
