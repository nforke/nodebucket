/*
=============================================================
; Title:  employee-api.js
; Author: Professor Krasso
; Modified By: Nicole Forke
; Date:   30 September 2020
; Description: Employee APIs
;============================================================
*/
// require statements
const express = require('express');
const Employee = require('../models/employee');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

const router = express.Router();

  /**
   * findEmployeeByID API
   * Returns a list JSON task objects
   */
router.get('/:empId', async(req, res) =>{

    try {
      /**
       * Usethe mongoose employee model to query MongoDb by employeeId
       */
      Employee.findOne({ 'empId': req.params.empId }, function(err, employee) {
        
        /**
         * If there is a database level error, handle by returning a server 500 error
         */
        if (err) {
          console.log(err);
          res.status(500).send({
            'message': 'Internal server error!'
          })
        } else { 
          /**
           * If there are no database level errors, return the employee object
           */
          console.log(employee);
          res.json(employee);
        }
      })
  
  
    } catch (e) {
      /**
       * Catch any potential errors that we didn't prepare for
       */
      console.log(e);
  
      res.status(500).send({
        'message': 'Internal server error!'
      })
    }
  })
  // end FindEmployeeById API

    /**
   * findAllTasks
   * Returns a list JSON task objects
   */
  router.get('/:empId/tasks', async(req, res) => {
    try{

        Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {
            if (err) {
                console.log(err);

                const mongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', employee);

                res.status(500).send(mongoDbErrorResponse.toObject())
            } else {
                console.log(employee);

                const employeeTasksResponse = new BaseResponse('200', 'Query successful', employee);

                res.json(employeeTasksResponse.toObject());
            }
        })

    } catch (e) {
        console.log(e);

        const errorCatchResponse = new ErrorResponse('500', 'Internal server error', e.message);

        res.status(500).send(errorCatchResponse.toObject());
    }
});
// end FindAllTasks API

  /**
   * API: createTask
   */
  router.post('/:empId/tasks', async(req, res) => {

    try {

        Employee.findOne({'empId': req.params.empId}, function(err, employee) {

            if (err) {

                console.log(err);

                const createTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

                res.status(500).send(createTaskMongoDbErrorResponse.toObject());
            } else {
                console.log(employee);

                // create a new item object
                const item = {
                    text: req.body.text
                };
                // push the new item to the todo array
                employee.todo.push(item);

                employee.save(function(err, updatedEmployee) {

                    if (err) {
                        console.log(err);

                        const createTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

                        res.status(500).send(createTaskOnSaveMongoDbErrorResponse.toObject());
                    } else {
                        console.log(updatedEmployee);

                        const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'Successful entry', updatedEmployee);

                        res.json(createTaskOnSaveSuccessResponse.toObject());
                    }
                })
            }
        })

    } catch(e) {
        console.log(e);

        const createTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);

        res.status(500).send(createTaskCatchErrorResponse.toObject());
    }
  })
  // end createTask API

   /**
    * API: updateTask
    */
   router.put('/:empId/tasks', async(req, res) => {
       try {

        Employee.findOne({'empId': req.params.empId}, function(err, employee) {

            if (err) {
                console.log(err);

                const updateTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

                res.status(500).send(updateTaskMongoDbErrorResponse.toObject());
            } else {
                console.log(employee);

                // update todo and done arrays
                employee.set({
                    todo: req.body.todo,
                    done: req.body.done
                });

                // writes changes to the database
                employee.save(function(err, updatedEmployee) {
                    if (err) {
                        console.log(err);

                        const updateTaskOnSaveMongodbErrorResponse = new ErrorResponse('500', 'Internal server errror', err);

                        res.status(500).send(updateTaskOnSaveMongodbErrorResponse.toObject());
                    } else {
                        console.log(updatedEmployee);

                        const updatedTaskOnSaveSuccessResponse = new BaseResponse('200', 'Update successful', updatedEmployee);

                        res.json(updatedTaskOnSaveSuccessResponse.toObject());
                    }
                })
            }
        })

       } catch (e) {
           console.log(e);

           const updateTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);

           res.status(500).send(updateTaskCatchErrorResponse.toObject());
       }
   })
   // end updateTask API


    /**
     * API: deleteTask
     */

     router.delete('/:empId/tasks/:taskId', async(req, res) => {

        try {

            Employee.findOne({'empId': req.params.empId}, function(err, employee) {

                if (err) {
                    console.log(err);

                    const deleteTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

                    res.status(500).send(deleteTaskMongoDbErrorResponse.toObject());
                } else {
                    console.log(employee);

                    const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
                    const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

                    if (todoItem) {
                        employee.todo.id(todoItem._id).remove();
                        employee.save(function(err, updatedTodoItemEmployee) {
                            if (err) {
                                console.log(err);

                                const deleteTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

                                res.status(500).send(deleteTaskOnSaveMongoDbErrorResponse.toObject());
                            } else {
                                console.log(updatedTodoItemEmployee);

                                const deleteToDoItemSuccessresponse = new BaseResponse('200', 'Removed item from the todo list', updatedTodoItemEmployee);

                                res.json(deleteToDoItemSuccessResponse.toObject());
                            }
                        })
                    } else if (doneItem) {
                        employee.done.id(doneItem._id).remove();

                        employee.save(function(err, updatedDoneItemEmployee) {
                            if (err) {
                                console.log(err);

                                const deleteDoneItemOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

                                res.status(500).send(deleteDoneItemOnSaveMongoDbErrorResponse.toObject());
                            } else {
                                console.log(updatedDoneItemEmployee);

                                const deleteDoneItemSuccessResponse = new BaseResponse('200', 'Removed item from the done list', updatedDoneItemEmployee);

                                res.json(updatedDoneItemEmployee.toObject());
                            }
                        })
                    } else {
                        console.log('Invalid task Id');

                        const deleteTaskNotFoundReponse = new ErrorResponse('200', 'Unable to locate the requested task', null);

                        res.status(200).send(deleteTaskNotFoundResponse.toObject());
                    }
                }
            })

        } catch (e) {
            console.log(e);

            const deleteTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);

            res.status(500).send(deleteTaskCatchErrorResponse.toObject());
        }
     })

  module.exports = router;