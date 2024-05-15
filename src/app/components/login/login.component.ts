import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { LoginDTO } from '../../dtos/user/login.dto';
import { NgForm } from '@angular/forms';
import { LoginResponse } from 'src/app/responses/user/login.response';
import { TokenService } from 'src/app/service/token.service';
import { RoleService } from 'src/app/service/role.service';
import { Role } from 'src/app/models/role';
import { UserResponse } from 'src/app/responses/user/user.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  @ViewChild('loginForm') loginForm!: NgForm;

  phoneNumber: string = '12345678';
  password: string = '123456';

  roles: Role[] = []; // Mảng roles
  rememberMe: boolean = true;
  selectedRole: Role | undefined; // Biến để lưu giá trị được chọn từ dropdown
  userResponse?: UserResponse
  onPhoneNumberChange() {
    console.log(`Phone typed:${this.phoneNumber}`);
  }
  constructor(
    private route: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ) { }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    debugger;
    this.roleService.getRole().subscribe({
      next: (roles: Role[]) => {
        debugger;
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (error: any) => {
        debugger;
        console.error('Error getting roles', error);
      },
    });
  }
  login() {
    const message = `phone:${this.phoneNumber}` + `password:${this.password}`;
    debugger;
    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    };
    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger;
        //muốn sử dụng token trong các yêu cầu API
        //trong mỗi request đa số sẽ đều phải gắn token vào được gọi là interceptors
        const { token } = response;
        if (this.rememberMe) {
          this.tokenService.setToken(token);
          this.userService.getUserDetail(token).subscribe({
            next: (response: any) => {
              debugger
              this.userResponse = {
                ...response,
                date_of_birth: new Date(response.date_of_birth)
              }
              this.userService.saveUserResponseToLocalStorage(this.userResponse);
              //Xử lý kết quả trả về khi đăng ký thành công
              this.route.navigate(['/'])
            },
            complete: () => {
              debugger
            },
            error: (error: any) => {
              alert(error.error.message)
            }
          })
        }
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        alert(error?.error?.message);
      }
    });
    // alert(message);
  }
}
