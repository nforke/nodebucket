/*
=============================================================
; Title:  nodebucket
; Author: Professor Krasso
; Modified By: Nicole Forke
; Date:   10 October 2020
; Description: Home Component
;============================================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../shared/task.service';
import { Item } from '../../shared/item.interface';
import { CookieService } from 'ngx-cookie-service';
import { Employee } from '../../shared/employee.interface';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../../shared/create-task-dialog/create-task-dialog.component';


// export component
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // tasks: any;
  todo: Item[];
  done: Item[];
  employee: Employee; // calls the employee interface

  empId: string;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {

    this.empId = this.cookieService.get('session_user'); // get the active session user
    // calls the task service
    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log('--Server response from findAlltasks--');
      console.log(res);

      // map returned data to employee
      this.employee = res.data;
      console.log('--Employee object--');
      console.log(this.employee);

    }, err => {
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;

      console.log('This is the completed function');
      console.log(this.todo);
      console.log(this.done);
    })
   }

  ngOnInit(): void {
  }

  // drag and drop an item from column to column
  drop(event: CdkDragDrop<any[]>) {

    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log('Reordered the existing list of task items');

      this.updateTaskList(this.empId, this.todo, this.done);

    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      console.log('Moved task item to the container');

      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }
  // calls the api and update task list
  private updateTaskList(empId: string, todo: Item[], done: Item[]): void {
    this.taskService.updateTask(empId, todo, done).subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err)
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    })
  }
  // opens a dialog for creating a new task
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res.data;
        }, err => {
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
  }

  deleteTask(taskId: string) {
    if (taskId) {
      console.log(`Task item: ${taskId} was deleted`);

      this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
        this.employee = res.data;
      }, err => {
        console.log(err);
      }, () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      })
    }
  }
}
