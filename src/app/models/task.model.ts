import { TasksTagEnum } from "../helpers/enums/tasks-tag.enum";

export class Tasks {
    Title: string;
    Description: string;
    Tag: TasksTagEnum;
    Assignee: string;
    DueDate: Date;
    constructor(
        title: string,
        description: string,
        tag: TasksTagEnum,
        assignee: string,
        dueDate: Date
        ) {
        this.Title = title;
        this.Description = description;
        this.Tag = tag;
        this.Assignee = assignee;
        this.DueDate = dueDate;
    }
}