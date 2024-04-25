export type TaskType = {
    id: number;
    name: string;
    description?: string;
    deadline:Date;
    priority:Priority;
    authors:number[];
    assigned_to:string;
}

export enum Priority{
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent",
    CRITICAL = "critical"
}

export const priority_values = () =>{
    let values:any[] = []
    Object.keys(Priority)
    .map(key => values.push({value:key.toLowerCase(), label:key.toLowerCase()}))
    
    return values
}