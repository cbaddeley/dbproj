export interface IActor {
    id: string;
    name: string;
}

export interface IActorSuccess {
    releaseDate: string | Date;
    title: string;
    avgRating: number;
    avgROI: number;
    actorName: string;
}