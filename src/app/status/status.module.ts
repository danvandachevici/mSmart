import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusRoutingModule } from './status-routing.module';
import { MachineDetailComponent } from './components/machine-detail/machine-detail.component';
import { ConfigService } from './services/config/config.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MachineListComponent } from './components/machine-list/machine-list.component';
import { LastMaintenancePipe } from './pipes/last-maintenance.pipe';
import { OverviewComponent } from './components/overview/overview.component';
import { MachineStatusCircleComponent } from './components/machine-status-circle/machine-status-circle.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    MachineListComponent,
    MachineDetailComponent,
    DashboardComponent,
    LastMaintenancePipe,
    OverviewComponent,
    MachineStatusCircleComponent],
  imports: [
    CommonModule,
    StatusRoutingModule,
    AgmCoreModule.forRoot({
      //todo get this key here
      apiKey: ''
    })
  ],
  providers: [ConfigService]
})
export class StatusModule { }
