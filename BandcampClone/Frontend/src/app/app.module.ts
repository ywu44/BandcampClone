import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { AlbumComponent } from './components/album/album.component';
import { ArtistComponent } from './components/artist/artist.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchComponent } from './components/search/search.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarVisitorComponent } from './components/header/navbar-visitor/navbar-visitor.component';
import { NavbarUserComponent } from './components/header/navbar-user/navbar-user.component';
import { ArticlesComponent } from './components/home/articles/articles.component';
import { SellingNowComponent } from './components/home/selling-now/selling-now.component';
import { FeedComponent } from './components/home/feed/feed.component';
import { StoreModule } from '@ngrx/store';
import { albumsReducer } from './store/albums/albums.reducer';
import { albumReducer } from './store/album/album.reducer';
import { NgxPaginationModule } from 'ngx-pagination';
import { artistReducer } from './store/artist/artist.reducer';
import { DateConvertPipe } from './pipes/date-convert.pipe';
import { TimeConvertPipe } from './pipes/time-convert.pipe';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { userReducer } from './store/user/user.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    AlbumComponent,
    ArtistComponent,
    PageNotFoundComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent,
    NavbarVisitorComponent,
    NavbarUserComponent,
    ArticlesComponent,
    SellingNowComponent,
    FeedComponent,
    DateConvertPipe,
    TimeConvertPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({
      albums: albumsReducer,
      album: albumReducer,
      artist: artistReducer,
      user: userReducer
    }),
    NgxPaginationModule
  ],
  providers: [LoginGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
