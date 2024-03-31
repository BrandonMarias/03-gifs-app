import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gif-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  constructor() {}

  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if(!this.gif) throw new Error('Gif is required');
  }
}
