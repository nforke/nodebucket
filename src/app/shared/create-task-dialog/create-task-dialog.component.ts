/*
=============================================================
; Title:  nodebucket
; Author: Professor Krasso
; Modified By: Nicole Forke
; Date:   09 October 2020
; Description: Create-Task-Dialog Component
;============================================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// export component
@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  // create form in order for user to create a new task item
  taskForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) {

   }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
  }
  // function to create new task
  createTask() {
    this.dialogRef.close(this.taskForm.value);
  }
  // function to cancel submission of creating a new task
  cancel() {
    this.dialogRef.close();
  }

}
