import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { TasksService } from 'src/app/services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditModalComponent } from 'src/app/modals/add-edit-modal/add-edit-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filter: string = '';
  public loading = true;
  board: Board = new Board('Test Board', [
    new Column('To Do', []),
    new Column('In Progress', []),
    new Column('Done', [])
  ]);
  boardCopy: any;
  constructor(
    private readonly service: TasksService,
    private helperModal: MatDialog,

  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getTasks();
      this.loading = false;
    }, 5000);
  }

  search() {

  }


  getTasks() {

    this.board.Columns.forEach(column => {
      column.Tasks = this.service.getTasks(column.Name);
      column.TaskNames = column.Tasks.map(({ Title }) => Title)
    })


  }

  drop(event: CdkDragDrop<string[]>, column: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      debugger
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  getDescription(col: string, index: number): string {
    const res = this.board.columns.find((column: any) => column.Name == col);
    return res?.Tasks[index].Description ?? "";
  }

  public openModal(item: any, column?: Column, index?: number) {
    let obj = null;
    if (column) {
      obj = column?.Tasks.find((t) => t.Title === item)
    }

    const taskModal = this.helperModal.open(AddEditModalComponent, {
      height: 'auto',
      data: {
        task: obj,
        column: column,
        index: index
      }
    });

    taskModal.afterClosed().subscribe((result) => {
      if (result) {
        if (result == 'Ok') {
          Swal.fire({
            icon: 'success',
            title: 'Saved',
          });
          this.getTasks();
        }
      }
    });

  }

  deleteTask(column: string, index: number) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete this task?',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteTask(column, index);
        this.getTasks();
      }
    });
  }
}
