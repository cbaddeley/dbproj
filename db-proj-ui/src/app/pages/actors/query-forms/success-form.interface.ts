export interface ISuccessFormValue {
    dollars: boolean;
    ratings: boolean;
    range: {
        end: Date;
        start: Date;
    };
    name: {
        id: string;
        name: string;
    }
}