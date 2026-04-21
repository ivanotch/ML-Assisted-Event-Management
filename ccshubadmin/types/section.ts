import { DocumentReference } from "firebase/firestore";


export type Section = {
    name: string;
    program_id: DocumentReference | null;
    program_name: string;
    school_year_id: DocumentReference | null;
    year_level: string;
}