import { Component, OnInit, Input } from '@angular/core';
import { Cell } from './models/cell.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() board: Cell[][];

  constructor() { }

  ngOnInit(): void {
  }

}
