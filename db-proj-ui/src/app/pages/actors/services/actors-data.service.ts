import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { API_URL } from "src/app/api-token";
import { IActorDTO } from "./actor-dto";

@Injectable()
export class ActorDataService {
    constructor(
        private http: HttpClient,
        @Inject(API_URL) private baseUrl: string
        ) { }

    public getActorSuccessData() {
        return of('success').pipe(delay(2000));
    }

    public getActors(name: string): Observable<IActorDTO[]> {
        let params = new HttpParams();
        params = params.append('name', name);

        return this.http.get<IActorDTO[]>(`${this.baseUrl}/actors`, {params: params});
    }
}