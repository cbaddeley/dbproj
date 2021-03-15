import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable()
export class ActorDataService {
    constructor(private http: HttpClient) { }

    public getActorSuccessData() {
        return of('success').pipe(delay(2000));
    }
}