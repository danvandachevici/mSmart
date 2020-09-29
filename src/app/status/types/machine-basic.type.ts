import { BasicMachineDataDto } from '../dtos/basic-machine-data.dto';
import { MachineStatusEnum } from './machine-status.enum';
import { MachineTypeEnum } from './machine-type.enum';

export class MachineBasicType {
  status: MachineStatusEnum;
  machineType: MachineTypeEnum;
  longitude: number;
  latitude: number;
  lastMaintenance: Date;
  installDate: Date;
  id: string;
  floor: number;
  lastStatusChange?: Date;

  constructor(dto: BasicMachineDataDto) {
    this.status = MachineStatusEnum[dto.status];
    this.machineType = MachineTypeEnum[dto.machine_type];
    this.longitude = dto.longitude;
    this.latitude = dto.latitude;
    this.lastMaintenance = new Date(dto.last_maintenance);
    this.installDate = new Date(dto.install_date);
    this.id = dto.id;
    this.floor = dto.floor;
  }
}