
interface StepInterface{
    id: number;
    name:string
}

type Author = {
    id: number;
    fullname:string
}

export type TaskType = {
    id: number;
    name: string;
    description?: string;
    deadline:Date;
    priority:Priority;
    authors:Author[];
    assigned_to:{};
    steps:StepInterface[]
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