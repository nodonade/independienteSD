import { Component, OnInit, Input } from '@angular/core';

import { PlayerService } from './../../services/player.service';

import { Player } from './../../models/player';

import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  @Input() players;
  @Input() identity;

  public displayedColumns = ['photoURL', 'nombre', 'fechaNacimiento', 'ciudad', 'posicion', 'cedula', 'camiseta', 'altura', 'peso', 'actualizar', 'borrar'];

  public dataSource = new MatTableDataSource<Player>()

  constructor(
    private _playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.readPlayers();
  }

  readPlayers(){
    this._playerService.readPlayers().subscribe(
      response => {
        this.dataSource.data = response as Player[];
      },
      error => {
        console.log(error);
      }
    )
  }

  deletePlayer(id) {
    this._playerService.deletePlayer(id).then(
      response => {
        this.readPlayers();
    })
  }
}
/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */