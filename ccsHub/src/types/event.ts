export interface Event {
    id: string;
    title: string;
    description: string;
    attendeesLimit: number
    createdAt: Date;
    date: string;
    department: string;
    end_time: string;
    start_time: string;
    imageUrl: string;
    location: string;
    participant_type: string;
    price: number;
    requirements: string;
    school_year_id: string;
    status: string;
}