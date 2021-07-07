import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface authResponseData{
  idToken :	string;//	A Firebase Auth ID token for the newly created user.
  email :	string;//	The email for the newly created user.
  refreshToken : string;//	A Firebase Auth refresh token for the newly created user.
  expiresIn : string;//	The number of seconds in which the ID token expires.
  localId : string;//	The uid of the newly created user.
  registered ?: boolean	//Whether the email is for an existing account.

}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user= new BehaviorSubject<User>(null);
  private tokenExpiratationTimer: any;

constructor(private http: HttpClient, private router: Router) { }

signup(email: string, password: string){
 return this.http.post<authResponseData>(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
    {
      email : email,
      password : password,
      returnSecureToken : true
    }
    ).pipe(
        catchError(this.handelError),
        tap(resData => {
          this.handelAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn);
        })
    );
 }

login(email: string, password: string){
  return this.http.post<authResponseData>(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(
      catchError(this.handelError),
      tap(resData => {
        this.handelAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn);
      })
    );
 }

autoLogin(){
  const userData: {
    email: string,
    id: string,
    _token: string,
    _tokenExpirationDate: string
  } = JSON.parse(localStorage.getItem('userData'));
  if(!userData){
    return ;
  }
  const loadUser=new User(
    userData.email,
    userData.id,
    userData._token,
    new Date(userData._tokenExpirationDate)
    );

    if(loadUser.token){
      this.user.next(loadUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

      this.autoLogout(expirationDuration);
    }

}

 logout(){
   this.user.next(null);
   this.router.navigate(['/auth']);
   localStorage.removeItem('userData');
   if(this.tokenExpiratationTimer){
     clearTimeout(this.tokenExpiratationTimer);
   }
   this.tokenExpiratationTimer = null;
 }

 autoLogout(expirationDuration: number){
   this.tokenExpiratationTimer = setTimeout(()=>{
     this.logout();
   },expirationDuration);
 }


 private handelAuthentication(
    email: string,
    userId:string,
    token:string,
    expiresIn:number){

  const expirationDate= new Date( new Date().getTime() + expiresIn * 1000 );
  const user= new User(email,userId,token,expirationDate);
  this.user.next(user);

  this.autoLogout(expiresIn * 1000 );

  localStorage.setItem('userData' , JSON.stringify(user));
 }

 private handelError(errorRes: HttpErrorResponse){

        let errorMessage='An unKnown Error Occured!';
        if(!errorRes.error || !errorRes.error.error){
          return throwError(errorMessage);
        }

        switch(errorRes.error.error.message){
          case 'EMAIL_EXISTS':
            errorMessage = 'this Email exists already';
            break;

          case 'OPERATION_NOT_ALLOWED':
            errorMessage= 'this OPERATION NOT ALLOWED';
            break;

          case 'INVALID_PASSWORD':
            errorMessage='Invalid Password';
            break;

            default :
            errorMessage=errorRes.error.error.message;
        }
        return throwError(errorMessage);
 }

}
