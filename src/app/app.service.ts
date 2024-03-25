import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getGraph(model: string) {
    return this.http.get(`http://localhost:9000/modelCM?model=${model}`);
  }

  getResults(model: string) {
    return this.http.get(`http://localhost:9000/results?model=${model}`);
  }

  getAccuracy(model: string) {
    return this.http.get(`http://localhost:9000/modelAccuracy?model=${model}`);
  }
}
