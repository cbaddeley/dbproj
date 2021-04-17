import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { formatDate } from "src/app/utils/date-util";
import { IActorDTO, IActorSuccessDTO } from "./actor-dto";
import { IActor, IActorSuccess } from "./actor-model";
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
    
    public searchActorSuccess(name: string, startDate: Date, endDate: Date): Observable<IActorSuccess[]> {
        this._fetching.next(true);
        return this.dataService.getActorSuccessData(name, formatDate(startDate), formatDate(endDate)).pipe(
            tap(() => this._fetching.next(false)),
            map((d) => this.mapActorSuccessData(d, name))
        );
    }

    private mapActorSuccessData(actorSuccessData: IActorSuccessDTO[], actorName: string): IActorSuccess[] {
        return actorSuccessData.map(d => {
            const date = new Date(d.releaseDate);
            const isoDate = date.toISOString();
            return {
                releaseDate: isoDate,
                title: d.title,
                avgROI: d.avgROI,
                avgRating: d.avgRating,
                actorName
            }
        })
    }

    private mapActors(actors: IActorDTO[]): IActor[] {
        return actors;
    }
}