import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getJsonData(): Observable<any> {
    const jsonData = {
      jobTitle: 'Software Developer',
      email: 'example@email.com',
      requestDate: '2024-02-25',
      time: '10:00',
      location: 'Sample Location',
      quarter: 'Q1',
      state: 'Sample State',
      primarySkills: 'Angular',
      educationalRequirements: [
        { educational: "Bachelor's Degree", fieldOfEducation: 'Computer Science' },
        
      ],
    };
    return of(jsonData);
  }
}
