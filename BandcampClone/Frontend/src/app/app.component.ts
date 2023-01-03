import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.getData();
  }

  // getData(): any {
  //   return this.http.get('/api/getData')
  //     .subscribe({
  //       next: (res) => console.log(res),
  //       error: (err) => console.log(err),
  //       complete: () => console.log('completed')
  //     })
  // }
}
