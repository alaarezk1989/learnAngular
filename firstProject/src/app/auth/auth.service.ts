import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface authResponseData{
  idToken :	string;//	A Firebase Auth ID token for the newly created user.
  email :	string;//	The email for the newly created user.
  refreshToken : string;//	A Firebase Auth refresh token for the newly created user.
  expiresIn : string;//	The number of seconds in which the ID token expires.
  localId : string;//	The uid of the newly created user.

}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }

signup(email: string, password: string){
 return this.http.post<authResponseData>(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBu7c8pNZLcbx4u2geAQ9u08EU2JSaJ4gY',
    {
      email : email,
      password : password,
      returnSecureToken : true
    }
    ).pipe(
        catchError( errorRes => {
        let errorMessage='An unKnown Error Occured!';
        if(!errorRes.error || !errorRes.error.error){
          return throwError(errorMessage);
        }


        switch(errorRes.error.error.message){
          case 'EMAIL_EXISTS':
            errorMessage = 'this Email exists already';

          case 'OPERATION_NOT_ALLOWED':
            errorMessage= 'this OPERATION NOT ALLOWED';

            default :
            errorMessage=errorRes.error.error.message;
        }
        return throwError(errorMessage);
      })
    );
}

}
