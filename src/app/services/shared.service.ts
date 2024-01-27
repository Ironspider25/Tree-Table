import { Injectable } from '@angular/core';
import { Courses } from '../models/row-data.dto';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getRawCourseData(): Courses[] {
    return [
      {
        name: 'Engineering',
        avgFees: '50k',
        seatsAvailable: 320,
        subBranchOf: 'none'
      },
      {
        name: 'Commerce',
        avgFees: '50k',
        seatsAvailable: 160,
        subBranchOf: 'none'
      },
      {
        name: 'Bussiness Administration',
        fees: '50k',
        seatsAvailable: 80,
        subBranchOf: 'Commerce'
      },
      {
        name: 'Bachelors Of Commerce',
        fees: '50k',
        seatsAvailable: 80,
        subBranchOf: 'Commerce'
      },
      {
        name: 'Mechanical Engineering',
        fees: '50k',
        seatsAvailable: 80,
        subBranchOf: 'Engineering'
      },
      {
        name: 'Quality Engineering',
        fees: '50k',
        seatsAvailable: 80,
        subBranchOf: 'Mechanical Engineering'
      },
      {
        name: 'Civil Engineering',
        fees: '50k',
        seatsAvailable: 80,
        subBranchOf: 'Engineering'
      },
      {
        name: 'InfraStructre Engineering',
        fees: '50k',
        seatsAvailable: 80,
        subBranchOf: 'Civil Engineering'
      },
    ];
  }
  
}
