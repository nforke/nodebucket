/*
=============================================================
; Title:  nodebucket
; Author: Professor Krasso
; Modified By: Nicole Forke
; Date:   25 September 2020
; Description: Base-Layout Component
;============================================================
*/

// import statement
import { Component, OnInit } from '@angular/core';

// export component
@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  
  constructor() { }

  ngOnInit(): void {
  }

}
