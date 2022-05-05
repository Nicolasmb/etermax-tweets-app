import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TwitterService } from './services/twitter.service';
import { Tweet } from './models/tweet.model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  form = new FormGroup({ hashtag: new FormControl('', Validators.required)})
  tweets: Tweet[] = [];
  cargando: boolean = false;
  errorMessage: string = '';

  // Se inyecta el servicio TwitterService
  constructor( private api: TwitterService) {}

  ngOnInit(): void {
  }
  
  searchTweets() {
    if( this.form.valid ) {
      this.cargando = true;
      this.tweets = [];
      let hashtag: string = this.form.controls['hashtag'].value;
      hashtag = hashtag.replace(/[|&;$%@"<>()+,#]/g, '');
      this.api.searchTweets(hashtag).subscribe(
        (tweets) => {
          console.log(tweets);
          tweets.data.forEach((tweet: Tweet) => {
            this.tweets.unshift(tweet);
            this.cargando = false;
          });
        },
        (error: HttpErrorResponse) => {
          this.cargando = false;
          this.errorMessage = error.message;
        }
      );
    }
  }

}
