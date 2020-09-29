import { DetailedMachineDataDto } from '../dtos/detailed-machine-data.dto';
import { EventType } from './event.type';
import { MachineBasicType } from './machine-basic.type';

export class MachineDetailType extends MachineBasicType {
  events: EventType[];
  constructor(dto: DetailedMachineDataDto) {
    super(dto);
    this.events = dto.events.map((event) => {
      return new EventType(event.timestamp, event.status);
    });
  }
}