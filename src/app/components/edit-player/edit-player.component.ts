import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: '../player-new/player-new.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

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
    this.player = {uid :'', nombre: '', apellidos: '', fechaNacimiento: undefined, posicion: '', peso: 80, photoURL: '',
      altura: 180, cedula: '', camiseta: 1, ciudad: '', fechaDePago: undefined};
      this.readPlayer();
  }

  onSubmit(form) {
    this._playerService.updatePlayer(this.player).then(
      response => {
        this._router.navigate(['/jugadores']);
      }
    );
  }

  readPlayer(){
    this._route.params.subscribe(params => {
      let id = params['uid'];

      this._playerService.readPlayer(id).subscribe(
        response => {
          if (response == undefined) {
            this._router.navigate(['/inicio']);
          } else {
            this.player = response as Player;
          }
        },
        error => {
          console.log(error);
        }
      );
    })

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
