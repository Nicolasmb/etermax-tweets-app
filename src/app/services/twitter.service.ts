import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  api_url = 'http://localhost:3000';

  constructor( private http: HttpClient ) { }

  searchTweets( hashtag: string ) {
    return this.http.get<any>(this.api_url + '/tweets/' + hashtag);
  }
}


