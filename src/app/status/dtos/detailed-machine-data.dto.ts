import { BasicMachineDataDto } from './basic-machine-data.dto';

export class DetailedMachineDataDto extends BasicMachineDataDto {
  events: [{
    timestamp: string,
    status: string
  }]
}