import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class AppApiService {
  private __baseUrl: string = environment.serverUrl;
  private __http = inject(HttpClient);

  login$(username: string, password: string): Observable<any> {
    const __url = `${this.__baseUrl}/login`;
    return this.__http.post(__url, { username, password });
  }

  logout$(): Observable<any> {
    const __url = `${this.__baseUrl}/logout`;
    return this.__http.post(__url, {});
  }

  getMyProjects$(): Observable<any> {
    const __url = `${this.__baseUrl}/my-projects`;
    return this.__http.get(__url);
  }
}