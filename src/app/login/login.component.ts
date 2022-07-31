import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { UserLoginInfo } from '../interfaces/login-info';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserLoginInfo = {
    email:'',
    password:''
  }

  redirectUrl = '';

  constructor(private route: ActivatedRoute,
    private router:Router,
    private loginService:LoginService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParamMap => {
      this.redirectUrl = queryParamMap.get('redirect') || '';
      console.log(this.redirectUrl);
    });
  }

  login(){
    this.loginService.login(this.user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.error.body);
        alert(error.error.body);
        throw error;
      })
    ).subscribe(
      (result)=>{
        localStorage.setItem('token', result.user.token);
        this.router.navigateByUrl(this.redirectUrl ?? '/');
      }
    )
  }

}
