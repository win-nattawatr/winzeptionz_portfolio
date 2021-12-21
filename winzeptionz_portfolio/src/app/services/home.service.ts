import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor() {}

  getFacebookUrl(): Observable<string> {
    return of('https://www.facebook.com/winbio.suthi');
  }

  getLinkedInUrl(): Observable<string> {
    return of('https://www.linkedin.com/in/nattawat-riyagoon-a23415216/');
  }

  getLineUrl(): Observable<string> {
    return of('https://line.me/ti/p/Hgz8r2GpfM');
  }
}
