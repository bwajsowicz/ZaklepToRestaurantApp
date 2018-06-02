import { Pipe } from "@angular/core";


@Pipe({
    name: 'phone'
})
export class PhonePipe{
    transform(value: string) {
        let x = value.substr(0, 3);
        let y = value.substr(0, 3);
        let z = value.substr(0, 3);

        return x + "-" + y + "-" + z;
    }
}