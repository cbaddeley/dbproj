import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { IActorDTO } from "./actor-dto";
import { IActor } from "./actor-model";
import { ActorDataService } from "./actors-data.service";

@Injectable()
export class ActorService {
    private _fetching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public fetching: Observable<boolean> = this._fetching.asObservable();
    
    constructor(private dataService: ActorDataService) { }

    public searchActors(name: string): Observable<IActor[]> {
        return this.dataService.getActors(name).pipe(
            map((actors) => this.mapActors(actors))
        )
    }
    
    public searchActorSuccess() {
        console.log('searching')
        this._fetching.next(true)
        return this.dataService.getActorSuccessData().pipe(
            tap(f => console.log(f)),
            tap(() => this._fetching.next(false)),
            map((d) => this.mapActorSuccessData(d))
        );
    }

    private mapActorSuccessData(someData: any) {
        console.log(someData)
        return someData;
    }

    private mapActors(actors: IActorDTO[]): IActor[] {
        return actors;
    }
}