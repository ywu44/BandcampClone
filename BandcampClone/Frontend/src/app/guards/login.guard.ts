import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }
    canActivate(): boolean {
        this.auth.verify().subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
        })
        return true;
    }
}