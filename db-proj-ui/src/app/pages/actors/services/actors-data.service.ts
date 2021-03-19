import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "src/app/api-token";
import { IActorDTO, IActorSuccessDTO } from "./actor-dto";

@Injectable()
export class ActorDataService {
    constructor(
        private http: HttpClient,
        @Inject(API_URL) private baseUrl: string
        ) { }

    public getActorSuccessData(name: string, startDate: string, endDate: string): Observable<IActorSuccessDTO[]> {
        let params = new HttpParams();
        params = params.append('name', name);
        params = params.append('startDate', startDate);
        params = params.append('endDate', endDate);

        return this.http.get<IActorSuccessDTO[]>(`${this.baseUrl}/actorSuccess`, {params: params});
    }

    public getActors(name: string): Observable<IActorDTO[]> {
        let params = new HttpParams();
        params = params.append('name', name);

        return this.http.get<IActorDTO[]>(`${this.baseUrl}/actors`, {params: params});
    }
}