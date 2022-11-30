import { Tasks } from "./task.model";

export class Column {
    public Name: string;
    public Tasks: Tasks[] = [];
    public TaskNames: string[] = [];
    
    constructor(public name: string, public tasks: Tasks[]) {
        this.Name = name;
        this.Tasks = tasks;
        tasks.forEach(task => this.TaskNames.push(task.Title));
    }
}