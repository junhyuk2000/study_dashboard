export interface Session {
    id: number;
    title : string;
    done : boolean;
    minutes : number;
    created_at : string;
}

export interface WeeklyStudyData {
    name : string;
    minutes : number;
}

