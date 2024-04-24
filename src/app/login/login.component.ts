import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { LoginDTO } from '../dtos/user/login.dto';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string = '12345678';
  password: string = '123456';
  onPhoneNumberChange() {
    console.log(`Phone typed:${this.phoneNumber}`);
  }
  constructor( private route: Router,private userService: UserService) {
  }
  login() {
    const message =
      `phone:${this.phoneNumber}` +
      `password:${this.password}`;
      debugger
    const loginDTO : LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password
    };
    this.userService.login(loginDTO).subscribe({
      next:(respose: any) => {
        debugger
        //Xử lý kết quả trả về khi đăng ký thành công
        // this.route.navigate(['/login'])
      },
      complete: () => {
        debugger
      },
      error:(error: any) => {
        debugger;
        alert(error.error.message);
      }
    })
    // alert(message);
  }
}
