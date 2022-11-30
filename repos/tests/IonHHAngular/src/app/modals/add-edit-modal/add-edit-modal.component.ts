import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasksTagEnum } from 'src/app/helpers/enums/tasks-tag.enum';
import { Tasks } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.scss']
})
export class AddEditModalComponent implements OnInit {
  task: Tasks;
  tagList = ["SEO", "Long Form", "Blog Post"]
  minDate = new Date();
  editing = false;
  public selectTag = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<AddEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly service: TasksService
  ) { }

  ngOnInit(): void {
    if (!this.data.task) {
      this.task = new Tasks('', '', TasksTagEnum.SEO, "", new Date());
    }
    else {
      this.editing = true;
      this.task = this.data.task;
    }
  }

  saveOrUpdate() {
    if (this.editing) {
      this.service.updateTask(this.task, this.data.column.Name, this.data.index);
      this.dialogRef.close("Ok");
    }else{
      this.service.addTask(this.task,"To Do");
      this.dialogRef.close("Ok");
    }
  }

}
