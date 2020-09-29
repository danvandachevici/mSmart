import { Component, Input, OnInit } from '@angular/core';
import { MachineStatusEnum } from '../../types/machine-status.enum';

@Component({
  selector: 'app-machine-status-circle',
  templateUrl: './machine-status-circle.component.html',
  styleUrls: ['./machine-status-circle.component.scss']
})
export class MachineStatusCircleComponent implements OnInit {

  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
