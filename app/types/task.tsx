export type TaskType = {
    id: number;
    name: string;
    description?: string;
    deadline:Date;
    priority:Priority;
    authors:string[];
    assigned_to:string;
}

export enum Priority{
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent",
    CRITICAL = "critical"
}