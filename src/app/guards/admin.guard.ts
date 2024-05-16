import { Injectable, inject } from "@angular/core";
import { TokenService } from "../service/token.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../service/user.service";
import { UserResponse } from "../responses/user/user.response";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {
    userResponse?: UserResponse | null;
    constructor(
        private tokenService: TokenService,
        private router: Router,
        private userService: UserService
    ) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isTokenExpired = this.tokenService.isTokenExpired(); //token còn thời hạn không
        const isUserIdValid = this.tokenService.getUserId() > 0;//có là user hay không
        this.userResponse = this.userService.getUserResponseToLocalStorage();
        const isAdmin = this.userResponse?.role.name == 'ADMIN'
        debugger
        if (!isTokenExpired && isUserIdValid && isAdmin) {
            return true;
        } else {
            // Nếu không authenticated, bạn có thể redirect hoặc trả về một UrlTree khác.
            // Ví dụ trả về trang login:
            this.router.navigate(['/login']);
            return false;
        }
    }
}
// Sử dụng functional guard như sau:
export const AdminGuardFn: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : boolean => {
    debugger
    return inject(AdminGuard).canActivate(next, state);
}  