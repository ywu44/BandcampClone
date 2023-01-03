import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserAction } from 'src/app/store/user/user.action';
import { selectUser } from 'src/app/store/user/user.selector';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private store: Store,
    private http: HttpClient,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router) {

  }
  user$: Observable<any> = this.store.select(selectUser);
  currentUser: any;
  wishlist: any[] = [];
  wishlistCopy: any[] = [];

  collection: any[] = [];
  collectionCopy: any[] = [];

  ngOnInit(): void {
    this.getCurrentUser();
    const wishlistButton = this.elementRef.nativeElement.querySelector('.wishlistButton');
    this.setCurrentChangeButtonRender(wishlistButton);
    this.currentTab = wishlistButton;
  }
  getCurrentUser() {
    const username = this.route.snapshot.paramMap.get('username');
    this.http.get(`/api/user/${username}`)
      .subscribe({
        next: (user: any) => {
          this.store.dispatch(UserAction.getUser({ user }));
          this.user$.subscribe(user => {
            this.currentUser = user[0];
            this.wishlist = this.currentUser.wishlist;
            this.wishlistCopy = [...this.wishlist];
            this.collection = this.currentUser.userCollection;
            this.collectionCopy = [...this.collection];
          });
        },
        error: (err: any) => {
          this.router.navigate(['*']);
        }
      });
  }
  removeFromWishlist(id: string) {
    const accessToken = localStorage.getItem('accessToken');
    const body = {
      accessToken: accessToken,
      albumId: id
    }
    if (accessToken) {
      this.http.put('/api/user/removeFromWishlist', body).subscribe({
        next: () => {
          this.getCurrentUser();
        },
        error: (error: any) => console.log(error)
      });
    }
  }
  isFollowingUser(username: string): boolean {
    const followingUser = this.currentUser.followingUser;
    for (let user of followingUser) {
      if (user.username === username) {
        return true;
      }
    }
    return false;
  }
  followUser(username: string) {
    const accessToken = localStorage.getItem('accessToken');
    const body = {
      accessToken: accessToken,
      username: username
    }
    if (accessToken) {
      this.http.put('/api/user/followUser', body).subscribe({
        next: () => {
          this.getCurrentUser();
        },
        error: (error: any) => console.log(error)
      });
    }
  }
  unfollowUser(username: string) {
    const accessToken = localStorage.getItem('accessToken');
    const body = {
      accessToken: accessToken,
      username: username
    }
    if (accessToken) {
      this.http.put('/api/user/unfollowUser', body).subscribe({
        next: () => {
          this.getCurrentUser();
        },
        error: (error: any) => console.log(error)
      });
    }
  }
  unfollowArtist(artistName: string) {
    const accessToken = localStorage.getItem('accessToken');
    const body = {
      accessToken: accessToken,
      artistName: artistName
    }
    if (accessToken) {
      this.http.put('/api/user/unfollowArtist', body).subscribe({
        next: () => {
          this.getCurrentUser();
        },
        error: (error: any) => console.log(error)
      });
    }
  }
  searchWishlist(e: any) {
    this.wishlist = [...this.wishlistCopy];
    if (e.target.value.length > 0) {
      this.wishlist = this.wishlist.filter((album) => {
        return album.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          album.artist.toLowerCase().includes(e.target.value.toLowerCase());
      })
    } else {
      this.wishlist = [...this.wishlistCopy];
    }
  }
  searchCollection(e: any) {
    this.collection = [...this.collectionCopy];
    if (e.target.value.length > 0) {
      this.collection = this.collection.filter((album) => {
        return album.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          album.artist.toLowerCase().includes(e.target.value.toLowerCase());
      })
    } else {
      this.collection = [...this.collectionCopy];
    }
  }
  showWishlistButtons(index: number) {
    const showItem = this.elementRef.nativeElement.querySelector(`.item-button-${index}`);
    console.log(showItem)
    this.renderer.setStyle(showItem, 'visibility', 'visible');
  }
  hideWishlistButtons(index: number) {
    const showItem = this.elementRef.nativeElement.querySelector(`.item-button-${index}`);
    console.log(showItem)
    this.renderer.setStyle(showItem, 'visibility', 'hidden');
  }
  showCollectionLinks(index: number) {
    const showItem = this.elementRef.nativeElement.querySelector(`.item-links-${index}`);
    console.log(showItem)
    this.renderer.setStyle(showItem, 'visibility', 'visible');
  }
  hideCollectionLinks(index: number) {
    const showItem = this.elementRef.nativeElement.querySelector(`.item-links-${index}`);
    console.log(showItem)
    this.renderer.setStyle(showItem, 'visibility', 'hidden');
  }



  showWishlist: boolean = true;
  showCollection: boolean = false;
  showFollower: boolean = false;
  showFollowing: boolean = false;
  currentTab: any;
  changeTab(className: string) {
    this.showWishlist = false;
    this.showCollection = false;
    this.showFollower = false;
    this.showFollowing = false;
    if (className === '.wishlistButton') {
      this.showWishlist = true;
    } else if (className === '.collectionButton') {
      this.showCollection = true;
    } else if (className === '.followerButton') {
      this.showFollower = true;
    } else if (className === '.followingButton') {
      this.showFollowing = true;
    }
    this.resetChangeButtonRender()
    const selectedTab = this.elementRef.nativeElement.querySelector(className);
    this.setCurrentChangeButtonRender(selectedTab);
    this.currentTab = selectedTab;
  }
  resetChangeButtonRender() {
    const changeButtons = this.elementRef.nativeElement.querySelectorAll('.contentChangeButton');
    changeButtons.forEach((element: any) => {
      this.renderer.setStyle(element, 'cursor', "pointer")
      this.renderer.setStyle(element, 'color', "rgb(0, 161, 198)")
      this.renderer.setStyle(element, 'borderBottom', "none")
      this.renderer.setStyle(element, 'marginBottom', "0px")
    });
  }
  setCurrentChangeButtonRender(element: any) {
    this.renderer.setStyle(element, 'cursor', "default")
    this.renderer.setStyle(element, 'color', "black")
    this.renderer.setStyle(element, 'borderBottom', "2px solid black")
    this.renderer.setStyle(element, 'marginBottom', "-2px")
  }
  onMouseOver(e: any) {
    if (e.target != this.currentTab && e.target.tagName != "SPAN") {
      e.target.style.borderBottom = '2px solid rgb(0, 161, 198)';
      e.target.style.marginBottom = '-2px';
    }
  }
  onMouseLeave(e: any) {
    if (e.target != this.currentTab && e.target.tagName != "SPAN") {
      e.target.style.borderBottom = "none";
      e.target.style.marginBottom = "0px";
    }
  }
}
