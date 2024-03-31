import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
})
export class SearchBoxComponent {
  constructor(private gifsService: GifsService) {}

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag() {
    const newTag = this.tagInput.nativeElement.value.trim().toLowerCase();
    if (newTag.length === 0) return;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
