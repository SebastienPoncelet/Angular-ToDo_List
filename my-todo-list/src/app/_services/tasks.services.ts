import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class TasksService {

  headers = new HttpHeaders();
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com/todos';

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  index() {
    return this.http.get(`${this.ROOT_URL}`).pipe(shareReplay());
  }

  details(taskId: number) {
    return this.http.get(`${this.ROOT_URL}${taskId}/`).pipe(shareReplay());
  }


}