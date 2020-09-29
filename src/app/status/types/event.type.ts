import { MachineStatusEnum } from './machine-status.enum';

export class EventType {
  timestamp: Date;
  status: MachineStatusEnum;

  constructor(timestamp: string, status: string) {
    this.timestamp = new Date(timestamp);
    this.status = MachineStatusEnum[status];
  }
}