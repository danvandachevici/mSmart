import { MachineStatusEnum } from './machine-status.enum';

export class EventFullType {
  machineId: string;
  id: string;
  timestamp: Date;
  status: MachineStatusEnum;

  constructor(eventData: any) {
    this.machineId = eventData.machine_id;
    this.id = eventData.id;
    this.timestamp = new Date(eventData.timestamp);
    this.status = eventData.status;
  }
}