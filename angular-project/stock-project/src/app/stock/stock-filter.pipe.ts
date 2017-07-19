import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'stockFilter'
})
export class StockFilterPipe implements PipeTransform {

  transform(list: any[], filed: string, keyWork: string): any {
    if (!filed || !keyWork) {
      return list;
    }
    return list.filter(item => {
      let itemFiledValue = item[filed].toLowerCase();
      return itemFiledValue.indexOf(keyWork) >= 0;
    });
  }

}
