import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        const username = route.url[1].path;
        this.auth.verify().subscribe({
            next: (data:any) => {
                if(data.message.username !== username) {
                    this.router.navigate(['*']);
                }
            },
            error: () => {
                this.router.navigate(['*']);
            }
        })
        return true;
    }
}