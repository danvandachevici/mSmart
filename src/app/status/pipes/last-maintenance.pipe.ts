import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({name: 'lastmaintenance'})
export class LastMaintenancePipe implements PipeTransform {
  transform(value: Date): string {
    if (!!value) {
      return moment(value).fromNow();
    }
    return '';
  }
}