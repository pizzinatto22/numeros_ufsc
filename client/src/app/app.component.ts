import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeyValue } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  dados = null;

  constructor(private http: HttpClient) {
    const url = window.location.protocol + "//" + window.location.hostname + ":3002/" ;
    this.http.get(url).subscribe(res => {
      this.dados = res;
    })
  }

  soma(d) {
    let sum = 0;
    for (const k in d) {
      sum += d[k]
    }
    return sum;
  }

  reverseKeyOrder = (a: KeyValue<string,string>, b: KeyValue<string,string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }
}
