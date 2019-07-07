/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */
import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { PlayerService } from './../../services/player.service';

import { Player } from './../../models/player';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { AngularFirestore } from '@angular/fire/firestore';

declare var $: any;

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  @Input() players;
  @Input() identity;

  public displayedColumns = ['photoURL', 'nombre', 'apellidos', 'fechaNacimiento', 'fechaDePago', 'ciudad', 'posicion', 'cedula', 'camiseta', 'altura', 'peso', 'actualizar', 'borrar'];

  public dataSource = new MatTableDataSource<Player>();

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _playerService: PlayerService,
    private _afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.readPlayers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  readPlayers(){
    this._playerService.readPlayers().subscribe(
      response => {
        this.dataSource.data = response as Player[];
        this.dataSource.data.forEach(player => {
          // @ts-ignore
          if (player.fechaDePago.toDate() < new Date (new Date().getFullYear(), new Date().getMonth(), 1)) { // I know this is poorly made, please forgive me I'm still a noob
            $("#myModal").modal('show');
          }
        });
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

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
