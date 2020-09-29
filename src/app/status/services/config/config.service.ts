import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiBaseUrl = 'https://machinestream.herokuapp.com';
  updateApi = 'ws://machinestream.herokuapp.com/api/v1/events';

  constructor() { }
}
