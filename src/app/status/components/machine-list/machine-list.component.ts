import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatusService } from '../../services/status.service';
import { MachineBasicType } from '../../types/machine-basic.type';
import { MachineStatusEnum } from '../../types/machine-status.enum';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.scss']
})
export class MachineListComponent implements OnInit, OnDestroy {

  @Input() statusListType: string;
  @Input() title: string;

  public filteredMachines: MachineBasicType[];
  public total: number;
  private newEventUpdateSubscriber: Subscription;

  constructor(
    private readonly statusService: StatusService
  ) {
    this.filteredMachines = [];
  }

  ngOnInit() {
    this.statusService.getAllMachines().then((data: MachineBasicType[]) => {
      this.filteredMachines = data.filter(machine => machine.status === MachineStatusEnum[this.statusListType]);
      this.total = data.length;
    });
    this.newEventUpdateSubscriber = this.statusService.newEventUpdates.subscribe((event) => {
      // check if it was already errorred
      const foundIndex = this.filteredMachines.findIndex(machine => machine.id === event.machineId);

      if (event.status === MachineStatusEnum[this.statusListType]) {
        if (foundIndex === -1) {
          // if it isn't already in the list, add it to the list
          const newMachine = this.statusService.getOneMachine(event.machineId);
          // this check exists for the case when an event is fired for a machine that doesn't exist
          if (newMachine) {
            this.filteredMachines.push(newMachine);
          }
        }
      } else {
        // if the status is different, I might need to remove the machine from my list
        if (foundIndex > -1) {
          this.filteredMachines.splice(foundIndex, 1);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.newEventUpdateSubscriber.unsubscribe();
  }
}
