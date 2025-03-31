import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Email } from '../../models/email/email.model';


@Injectable({
  providedIn: 'root'
})

export class OauthService {

  // private url = 'http://localhost:8080/Oauth/whitelisted-emails';  // Backend URL
  private url = 'https://my-sitable.et.r.appspot.com/Oauth/whitelisted-emails';  // Backend URL

  constructor(private http: HttpClient) { }

  getWhitelistedEmails(): Observable<Email[]> {
    return this.http.get<Email[]>(`${this.url}`);
  }

  login(email: string): Observable<{ token: string, firstName: string, lastName: string }> {
    return this.http.post<{ token: string, firstName: string, lastName: string }>(`${this.url}/login`, { email });
  }
}
