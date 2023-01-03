import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConvert'
})
export class DateConvertPipe implements PipeTransform {
  months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  transform(value: string, ...args: unknown[]): unknown {
    //2021-03-05T00:00:00.000Z
    let valueProcess = value.split('T')[0].split('-');
    let year = valueProcess[0];
    let month = this.months[+valueProcess[1] - 1];
    let day = +valueProcess[2];
    return `${month} ${day}, ${year}`;
  }

}
