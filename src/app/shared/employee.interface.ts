/*
=============================================================
; Title:  nodebucket
; Author: Professor Krasso
; Modified By: Nicole Forke
; Date:   07 October 2020
; Description: Employee Interface
;============================================================
*/
// import statement
import { Item } from './item.interface';

// export interface
export interface Employee {
    empId: string;
    todo: Item[];
    done: Item[]
}