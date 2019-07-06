/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

 // Routing
import { AppRoutingModule } from './app-routing.module';

// Service for Authentication
import { AuthenticationService } from './services/authentication.service';

// Basic Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { FirestoreSettingsToken} from '@angular/fire/firestore';
// import * as firebase from 'firebase';  //No lo uso


// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatPaginatorModule ,MatTableModule, MatIconModule, 
  MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, 
  MatSortModule, MatInputModule, MAT_DATE_LOCALE } from '@angular/material';
import { PlayerComponent } from './components/player/player.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerNewComponent } from './components/player-new/player-new.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    PlayerComponent,
    PlayerListComponent,
    PlayerNewComponent,
    EditPlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firestore for using database
    AngularFireAuthModule, // imports firebase auth for authentication
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatInputModule,
    FlexLayoutModule,
    MatPaginatorModule,
  ],
  providers: [
    AuthenticationService,
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
