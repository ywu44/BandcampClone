import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

  constructor(private eRef: ElementRef, private router: Router) { }
  
  currentUser:any = JSON.parse(localStorage.getItem('user') as string);

  ngOnInit(): void {
    // console.log(this.currentUser)
  }
  
  ShowProfile: boolean = false;
  ShowNotification: boolean = false;

  toggleProfile() {
    this.ShowProfile = !this.ShowProfile;
  }
  toggleNotification() {
    this.ShowNotification = !this.ShowNotification;
  }
  closeDropdown() {
    this.ShowProfile = false;
    this.ShowNotification = false;
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
