import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatusService } from '../../services/status.service';
import { MachineDetailType } from '../../types/machine-detail.type';

@Component({
  selector: 'app-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.scss']
})
export class MachineDetailComponent implements OnInit, OnDestroy {

  machine: MachineDetailType;
  dataLoaded: boolean;

  private newEventUpdateSubscriber: Subscription;


  constructor(
    private readonly statusService: StatusService,
    private readonly route: ActivatedRoute
  ) {
    this.dataLoaded = false;
    this.machine = null;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('machineId');
    this.statusService.getMachineDetails(id).then((data) => {
      this.machine = data;
      this.dataLoaded = true;
    })

    this.newEventUpdateSubscriber = this.statusService.newEventUpdates.subscribe((event) => {
      if (event.machineId === this.machine.id) {
        this.machine.events.unshift(event);
      }
    });
  }
  ngOnDestroy(): void {
    this.newEventUpdateSubscriber.unsubscribe();
  }

}
