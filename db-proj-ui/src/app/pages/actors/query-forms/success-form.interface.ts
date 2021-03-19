export interface ISuccessFormValue {
    metric: 'dollars' | 'ratings' | 'both';
    range: {
        end: Date;
        start: Date;
    };
    name: {
        id: string;
        name: string;
    }
}