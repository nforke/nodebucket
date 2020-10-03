/*
=============================================================
; Title:  error-response.js
; Author: Professor Krasso
; Modified By: Nicole Forke
; Date:   30 September 2020
; Description: Schema for the error response model.
;============================================================
*/
// create a response class for errors
class ErrorResponse {
    constructor(httpCode, message, data) {
        this.httpCode = httpCode;
        this.message = message;
        this.data = data;
    }

    toObject() {
        return {
            'httpCode': this.httpCode,
            'message': this.message,
            'data': this.data,
            'timestamp': new Date().toLocaleDateString()
        }
    }
}

// return response class errors
module.exports = ErrorResponse;