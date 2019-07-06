/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { PlayerService } from './../../services/player.service';
import { UserService } from './../../services/user.service';

import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Player } from '../../models/player';

@Component({
  selector: 'app-player-new',
  templateUrl: './player-new.component.html',
  styleUrls: ['./player-new.component.scss']
})
export class PlayerNewComponent implements OnInit {

  public identity;
  public token;
  public player: Player;
  public categories;
  public uploadPercent;
  file: File;

  task: AngularFireUploadTask;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _afStorage: AngularFireStorage,
    private _playerService: PlayerService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }
   
  ngOnInit() {
    this.player = {uid :'', nombre: '', apellidos: '', fechaNacimiento: new Date, posicion: '', peso: 80, photoURL: '',
      altura: 180, cedula: '', camiseta: 1, ciudad: '', fechaDePago: new Date};
  }

  onSubmit(form) {
    this._playerService.createPlayer(this.player).then(
      response => {
        this._router.navigate(['/jugadores']);
      }
    );
  }

  upload(event) {
    const randomId = Math.random().toString(36).substring(2);
    this.player.photoURL = randomId;
    this._afStorage.upload(`/upload/${randomId}`, event.target.files[0]).then(
      response => {
        let ref = this._afStorage.ref(`/upload/${this.player.photoURL}`);
        ref.getDownloadURL().subscribe(response =>{
          this.player.photoURL = response;
          console.log(this.player.photoURL);
        });
      }
    );
  }
}
