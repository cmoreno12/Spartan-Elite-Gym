import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FingerPrintService {
  headers= new HttpHeaders({'Access-Control-Allow-Origin': '*'});
  apiURL: string = '';

  constructor(private http: HttpClient, @Inject('apiUrl') url: string) {
    this.apiURL = url;
  }

  capturarHuella(): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'capture/',
      { withCredentials: false, headers: this.headers }
    );
  }

}
