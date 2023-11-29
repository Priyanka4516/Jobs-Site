import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobDetailsService {
  
    _baseUrl = 'https://hacker-news.firebaseio.com/v0/';
  
  constructor(private http: HttpClient) {}
  
  GetJobId(): Observable<any> {
    return this.http.get(
        this._baseUrl + 'jobstories.json');
    }

  GetJobDetail(id:string):Observable<any> {
    return this.http.get(
        this._baseUrl + 'item/' + id+'.json');
        
    
}
}
