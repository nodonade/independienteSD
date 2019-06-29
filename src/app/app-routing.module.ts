/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

// TODO ver que hace el secureinnerpagesguard
// Components
import { ProfileComponent } from './components/profile/profile.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PlayerComponent } from './components/player/player.component';

// Basic imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import canActivate guard services
import { AuthGuard } from './services/guard/auth.guard';
import { SecureInnerPagesGuard } from './services/guard/secure-inner-pages.guard';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerNewComponent } from './components/player-new/player-new.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'inicio', component: HomeComponent },
  
  { path: 'login', component: LoginComponent, /* canActivate: [SecureInnerPagesGuard] */},
  { path: 'logout/:sure', component: LoginComponent },
  


  { path: 'registro', component: RegisterComponent, /* canActivate: [SecureInnerPagesGuard] */},

  { path: 'jugadores', component: PlayerListComponent},
  { path: 'crear-jugador', component: PlayerNewComponent},
  { path: 'editar-jugador/:uid', component: EditPlayerComponent},
  

  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }