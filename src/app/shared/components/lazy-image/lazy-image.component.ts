import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.scss',
})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public hasBeenLoaded: boolean = false;

  onLoaded() {
    this.hasBeenLoaded = true;
  }

  ngOnInit(): void {
    if (!this.url) throw new Error('Url is required');
  }
}
