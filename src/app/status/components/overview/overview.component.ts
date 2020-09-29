import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatusService } from '../../services/status.service';
import { MachineBasicType } from '../../types/machine-basic.type';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  machines: MachineBasicType[];
  private newEventUpdateSubscriber: Subscription;
  dataLoaded: boolean;

  constructor(
    private readonly statusService: StatusService
  ) {
    this.machines = [];
    this.dataLoaded = false;
  }
  ngOnInit() {
    this.statusService.getAllMachines().then((data: MachineBasicType[]) => {
      this.machines = data;
      this.dataLoaded = true;
    });
    this.newEventUpdateSubscriber = this.statusService.newEventUpdates.subscribe((event) => {
      const foundMachine = this.machines.find(machine => machine.id === event.machineId);
      if (foundMachine) {
        foundMachine.lastStatusChange = new Date();
        foundMachine.status = event.status;
      }
    });
  }

  ngOnDestroy() {
    this.newEventUpdateSubscriber.unsubscribe();
  }

}
