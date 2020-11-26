import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    transform(value: any, format: boolean = false): any {

        const date = value.toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', second:'numeric', hour12: format })
        return date;
    }
}