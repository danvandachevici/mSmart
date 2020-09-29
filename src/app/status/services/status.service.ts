import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicMachineDataDto } from '../dtos/basic-machine-data.dto';
import { MachineBasicType } from '../types/machine-basic.type';
import { ConfigService } from './config/config.service';
import { Socket } from 'phoenix';
import { Subject } from 'rxjs';
import { EventType } from '../types/event.type';
import { EventFullType } from '../types/event-full.type';
import { MachineDetailType } from '../types/machine-detail.type';
import { DetailedMachineDataDto } from '../dtos/detailed-machine-data.dto';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  
  private machines: MachineBasicType[] = [];
  newEventUpdates: Subject<EventFullType> = new Subject<EventFullType>();
  
  constructor(
    private readonly config: ConfigService,
    private readonly httpClient: HttpClient
  ) {
    this.registerEventsListener();
  }

  getAllMachines(): Promise<MachineBasicType[]> {
    return new Promise((resolve) => {
      if (this.machines.length) {
        return resolve(this.machines);
      }
      this.httpClient.get<{ data: BasicMachineDataDto[] }>(this.config.apiBaseUrl + '/api/v1/machines')
        .subscribe((resp: { data: BasicMachineDataDto[] }) => {
          const ret = resp.data.map((item: BasicMachineDataDto) => new MachineBasicType(item));
          this.machines = ret;
          this.machines.forEach((machine) => {
            machine.latitude = Math.random() * 180 - 90;
            machine.longitude = Math.random() * 180 - 90;
          })
          resolve(ret);
        });
    });
  }

  getOneMachine(id): MachineBasicType | null {
    const foundMachine = this.machines.find(machine => machine.id === id);
    
    if (!foundMachine) {
      return null;
    }
    return foundMachine;
  }

  getMachineDetails(id): Promise<MachineDetailType | null> {
    return new Promise((resolve) => {
      this.httpClient.get<{ data: DetailedMachineDataDto }>(this.config.apiBaseUrl + `/api/v1/machines/${id}`)
        .subscribe((resp: { data: DetailedMachineDataDto }) => {
          resolve(new MachineDetailType(resp.data));
        });
    });
  }

  registerEventsListener(): void {
    const socket = new Socket(this.config.updateApi);
    socket.connect();
    const channel = socket.channel('events', {});
    channel.join();
    channel.on('new', (eventData) => {
      const ev = new EventFullType(eventData);
      this.newEventUpdates.next(ev);
    });
  }
}
