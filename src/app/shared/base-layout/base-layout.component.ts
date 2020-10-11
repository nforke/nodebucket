/*
=============================================================
; Title:  nodebucket
; Author: Professor Krasso
; Modified By: Nicole Forke
; Date:   04 October 2020
; Description: Base-Layout Component
;============================================================
*/

// import statement
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})

// export component
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  
  constructor(private cookieService: CookieService, private router: Router) {

   }

  ngOnInit(): void {
  }

  signOut() {
    // call cookie service
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }

}
