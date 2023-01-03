import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlbumAction } from 'src/app/store/album/album.action';
import { selectAlbum } from 'src/app/store/album/album.selector';
import { ArtistAction } from 'src/app/store/artist/artist.action';
import { selectArtist } from 'src/app/store/artist/artist.selector';
import { selectUser } from 'src/app/store/user/user.selector';
import { AuthService } from 'src/app/services/auth.service';
import { UserAction } from 'src/app/store/user/user.action';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  constructor(private store: Store,
    private http: HttpClient,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) { }

  album$: Observable<any> = this.store.select(selectAlbum);
  currentAlbum: any;
  artist$: Observable<any> = this.store.select(selectArtist);
  currentArtist: any;
  user$: Observable<any> = this.store.select(selectUser);
  currentUser: any = undefined;

  ngOnInit(): void {
    const _id = this.route.snapshot.paramMap.get('_id');
    this.http.get(`/api/albums/getAlbum/${_id}`)
      .subscribe({
        next: (album: any) => {
          this.store.dispatch(AlbumAction.getAlbum({ album }));
          this.album$.subscribe(album => this.currentAlbum = album);
          this.http.get(`/api/artist/getArtist/${this.currentAlbum.artistRef}`)
            .subscribe({
              next: (artist: any) => {
                this.store.dispatch(ArtistAction.getArtist({ artist }));
                this.artist$.subscribe(artist => this.currentArtist = artist);
              },
              error: (err: any) => {
                this.router.navigate(['*']);
              }
            })
        },
        error: (err: any) => {
          this.router.navigate(['*']);
        }
      });
    this.auth.verify().subscribe({
      next: () => {
        if (localStorage.getItem('user')) {
          this.getCurrentUser();
        }
      },
      error: (error: any) => {
        this.currentUser = undefined;
      }
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
  albumIsOwned(id: string): boolean {
    const userCollection = this.currentUser.userCollection;
    for(let album of userCollection) {
      if(album._id === id) {
        return true;
      }
    }
    return false;
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
  addToWishlist(id: string) {
    const accessToken = localStorage.getItem('accessToken');
    const body = {
      accessToken: accessToken,
      albumId: id
    }
    if (accessToken) {
      console.log(body)
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
  isFollowingUser(artistName: string) {
    console.log(this.currentUser)
    if (this.currentUser) {
      const followingArtist = this.currentUser.followingArtist;
      for (let artist of followingArtist) {
        if (artist.name === artistName) {
          return true;
        }
      }
    }
    return false;
  }
  followArtist(artistName: string) {
    const accessToken = localStorage.getItem('accessToken');
    const body = {
      accessToken: accessToken,
      artistName: artistName
    }
    if (accessToken) {
      this.http.put('/api/user/followArtist', body).subscribe({
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


  playerButtonClick(source: string, index: number) {
    const audioPlay = this.elementRef.nativeElement.querySelector('audio');
    audioPlay.src = source;
    const playButtons = this.elementRef.nativeElement.querySelectorAll('.track-play-button');
    playButtons.forEach((element: any) => {
      element.innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`;
    });
    const isPlaying = this.elementRef.nativeElement.querySelector('.isPlaying');
    const playButton = this.elementRef.nativeElement.querySelector(`#track${index}`);
    if (isPlaying) {
      isPlaying.classList.remove('isPlaying');
      if (isPlaying === playButton) {
        playButton.innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`;
        audioPlay.pause();
      } else {
        playButton.classList.add('isPlaying');
        playButton.innerHTML = `<i class="fa fa-pause" aria-hidden="true"></i>`;
        audioPlay.play();
      }
    } else {
      playButton.classList.add('isPlaying');
      audioPlay.play();
      playButton.innerHTML = `<i class="fa fa-pause" aria-hidden="true"></i>`;
    }
  }
}
