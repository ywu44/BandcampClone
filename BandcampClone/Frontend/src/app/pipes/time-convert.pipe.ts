import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConvert'
})
export class TimeConvertPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let time = +value;
    time /= 1000;
    let min = Math.floor(time/60);
    const minStr = min < 10 ? '0' + min : min;
    let sec = Math.floor(time%60);
    const secStr = sec < 10 ? '0' + sec : sec;
    return `${minStr}:${secStr}`;
  }

}
