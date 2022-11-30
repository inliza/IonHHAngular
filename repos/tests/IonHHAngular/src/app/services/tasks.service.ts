import { Injectable } from '@angular/core';
import { TasksTagEnum } from '../helpers/enums/tasks-tag.enum';
import { Tasks } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly tasksData = [
    {
      "name": "To Do",
      "Tasks": [
        {
          "Title": "Fifa world cup",
          "Description": "Summary of the fifa world cup result",
          "Tag": TasksTagEnum.SEO,
          "Assignee": "Edwin Lizardo",
          "DueDate": new Date()
        }
      ]
    },
    {
      "name": "In Progress",
      "Tasks": [
        {
          "Title": "News",
          "Description": "Summary of yesterday's news",
          "Tag": TasksTagEnum.LongForm,
          "Assignee": "Cristiano Ronaldo",
          "DueDate": new Date()
        }
      ]
    },
    {
      "name": "Done",
      "Tasks": [
        {
          "Title": "Top Netflix Movies",
          "Description": "Top 10 best movies of the week on netflix",
          "Tag": TasksTagEnum.BlogPost,
          "Assignee": "Lia Johnson",
          "DueDate": new Date()
        },
        {
          "Title": "Top HBO Movies",
          "Description": "Top 10 best movies of the month on HBO",
          "Tag": TasksTagEnum.BlogPost,
          "Assignee": "Lia Johnson",
          "DueDate": new Date()
        }
      ]
    }
  ]
  constructor() { }

  getTasks(column: string) {
    let data: any;
    data = localStorage.getItem('tasks');
    if (!data) {
      localStorage.setItem('tasks', JSON.stringify(this.tasksData));
    }
    const retrievedObject = localStorage.getItem('tasks');
    data = JSON.parse(retrievedObject ?? "");
    return data.find((f: any) => f.name === column).Tasks;

  }

  updateTask(task: Tasks, column: string, index: number) {
    const retrievedObject = localStorage.getItem('tasks');
    const data = JSON.parse(retrievedObject ?? "");
    const col = data.find((f: any) => f.name === column);
    data[data.indexOf(col)].Tasks[index] = task;
    localStorage.setItem('tasks', JSON.stringify(data));
  }


  addTask(task: Tasks, column: string) {
    const retrievedObject = localStorage.getItem('tasks');
    const data = JSON.parse(retrievedObject ?? "");
    const col = data.find((f: any) => f.name === column);
    data[data.indexOf(col)].Tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(data));
  }

  deleteTask(column: string, index: number) {
    const retrievedObject = localStorage.getItem('tasks');
    const data = JSON.parse(retrievedObject ?? "");
    const col = data.find((f: any) => f.name === column);
    data[data.indexOf(col)].Tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(data));
  }

  moveTask(columnFrom:string, columnTo:string, task:Tasks){}

}
