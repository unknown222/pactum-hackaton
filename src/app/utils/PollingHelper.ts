import { BehaviorSubject, concat, Observable, of } from "rxjs";
import { concatMap, delay, skip, tap } from "rxjs/operators";

export class PollingHelper {

    public static polling(pollTarget: Observable<any>, interval?): any {
        let load = new BehaviorSubject('');
        const refresh = of('').pipe(
            delay(interval || 1000),
            tap(_ => load.next('')),
            skip(1),
        );

        return load.pipe(
            concatMap(_ => {
                return concat(pollTarget, <any>refresh);
            })
        )
    }
}
