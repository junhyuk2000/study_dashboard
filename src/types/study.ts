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

export interface StudyListProps {
    sessions : Session[];
    setSessions : React.Dispatch<React.SetStateAction<Session[]>>;
}