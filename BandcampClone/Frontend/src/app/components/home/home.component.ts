import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AlbumsAction } from '../../store/albums/albums.action'
import { selectAlbums } from 'src/app/store/albums/albums.selector';
import { Observable } from 'rxjs';
import { AlbumAction } from 'src/app/store/album/album.action';
import { AuthService } from 'src/app/services/auth.service';
import { ThisReceiver } from '@angular/compiler';
import { UserAction } from 'src/app/store/user/user.action';
import { selectUser } from 'src/app/store/user/user.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('genresScroll')
  genresScroll!: ElementRef;

  genres: string[] = [
    "electronic",
    "rock",
    "metal",
    "alternative",
    "hiphop",
    "experimental",
    "punk",
    "folk",
    "pop",
    "ambient",
    "soundtrack",
    "world",
    "jazz",
    "acoustic",
    "funk",
    "r&b/soul",
    "devotional",
    "classical",
    "reggae",
    "podcasts",
    "country",
    "spoken word",
    "comedy",
    "blues",
    "audiobooks",
    "latin",
  ];
  formats: string[] = ["digital", "vinyl", "compact disc", "cassette"];
  currentGenre: string = '';
  currentFormat: string = '';
  currentAlbum: any;

  constructor(private store: Store,
    private http: HttpClient,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private auth: AuthService,
    private router: Router) { }

  albums$: Observable<any> = this.store.select(selectAlbums);
  user$: Observable<any> = this.store.select(selectUser);
  currentUser: any = undefined;
  p = 1;
  isLoggedIn: any;

  ngOnInit(): void {
    this.elementRef.nativeElement.querySelector('.genreSelector').style.backgroundColor = 'black';
    this.elementRef.nativeElement.querySelector('.formatSelector').style.backgroundColor = 'black';
    this.http.get('/api/albums/getAlbums')
      .subscribe((albums: any) => {
        this.store.dispatch(AlbumsAction.getAlbums({ albums }));
        this.currentAlbum = albums[0];
      })
    this.auth.verify().subscribe({
      next: () => {
        if (localStorage.getItem('user')) {
          this.getCurrentUser();
        }
      },
      error: () => {
        localStorage.clear();
        this.router.navigate(['/']);
      }
    })
  }
  scrollLeft() {
    this.genresScroll.nativeElement.scrollLeft -= 350;
  }

  scrollRight() {
    this.genresScroll.nativeElement.scrollLeft += 350;
  }

  setFilter(event: any) {
    let genre: string = '';
    let format: string = '';
    if (event.target.classList.contains('genreSelector')) {
      genre = event.target.innerText;
      this.storeCurrentGenre(genre);
      this.renderGenreStyle(genre);
    } else {
      format = event.target.innerText;
      this.storeCurrentFormat(format);
      this.renderFormatStyle(format);
    }

    genre = this.currentGenre ? this.currentGenre : genre;
    genre = genre == 'all' ? '' : genre;
    format = this.currentFormat ? this.currentFormat : format;
    format = format === 'compact' ? 'compact disc' : format;
    format = format == 'any format' ? '' : format;
    this.http.get(`/api/albums/getAlbums?genre=${genre}&format=${format}`)
      .subscribe((albums: any) => {
        this.p = 1;
        this.store.dispatch(AlbumsAction.getAlbums({ albums }));
      })
  }

  getCurrentAlbum(event: any) {
    this.http.get(`/api/albums/getAlbum/${event.target.id}`)
      .subscribe((album: any) => {
        this.store.dispatch(AlbumAction.getAlbum({ album }));
        this.currentAlbum = album;
      })
  }
  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user') as string);
    const username = user.username;
    this.http.get(`/api/user/${username}`)
      .subscribe({
        next: (user: any) => {
          this.store.dispatch(UserAction.getUser({ user }));
          this.user$.subscribe(user => this.currentUser = user[0]);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }

  albumIsLiked(id: string): boolean {
    const userWishlist = this.currentUser.wishlist;
    for (let album of userWishlist) {
      if (album._id === id) {
        return true;
      }
    }
    return false;
  }
  albumIsOwned(id: string): boolean {
    const userCollection = this.currentUser.userCollection;
    for(let album of userCollection) {
      if(album._id === id) {
        return true;
      }
    }
    return false;
  }

  addToWishlist(id: string) {
    const accessToken = localStorage.getItem('accessToken');
    const body = {
      accessToken: accessToken,
      albumId: id
    }
    if (accessToken) {
      this.http.put('/api/user/addToWishList', body).subscribe({
        next: () => {
          this.getCurrentUser();
        },
        error: (error: any) => console.log(error)
      });
    }
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

  pleaseLogInToLike() {
    this.router.navigate(['/login']);
  }

  // Helpers to filter the albums
  storeCurrentGenre(genre: string): void {
    const genresElements = this.elementRef.nativeElement.querySelectorAll('.genreSelector');
    genresElements.forEach((element: any) => {
      element.classList.remove('currentGenre');
    });
    this.elementRef.nativeElement.querySelector(`#${genre}`).classList.add('currentGenre');
    this.currentGenre = this.elementRef.nativeElement.querySelector('.currentGenre').innerText;
  }
  storeCurrentFormat(format: string): void {
    const formatsElements = this.elementRef.nativeElement.querySelectorAll('.formatSelector');
    formatsElements.forEach((element: any) => {
      element.classList.remove('currentFormat');
    });
    format = format === 'compact disc' ? 'compact' : format;
    format = format === 'any format' ? 'any' : format;
    this.elementRef.nativeElement.querySelector(`#${format}`).classList.add('currentFormat');
    this.currentFormat = this.elementRef.nativeElement.querySelector('.currentFormat').innerText;
  }
  renderGenreStyle(genre: string): void {
    const genresElements = this.elementRef.nativeElement.querySelectorAll('.genreSelector');
    genresElements.forEach((element: object) => {
      this.renderer.setStyle(element, 'backgroundColor', "transparent")
    });
    this.elementRef.nativeElement.querySelector(`#${genre}`).style.backgroundColor = 'black';
  }
  renderFormatStyle(format: string): void {
    const formatsElements = this.elementRef.nativeElement.querySelectorAll('.formatSelector');
    formatsElements.forEach((element: object) => {
      this.renderer.setStyle(element, 'backgroundColor', "transparent")
    });
    format = format === 'compact disc' ? 'compact' : format;
    format = format === 'any format' ? 'any' : format;
    this.elementRef.nativeElement.querySelector(`#${format}`).style.backgroundColor = 'black';
  }
}
