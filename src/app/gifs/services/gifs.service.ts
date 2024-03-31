import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = 'vDyfhWXzGZUESWoYIsyGdtugZ6t69rDi';
const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/search';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagsHistory: string[] = [];

  private _gifs: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadHistoryGifsFromLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  get gifs(): Gif[] {
    return [...this._gifs];
  }

  // Info: This method is used to save the tags history in the local storage.
  private setHistoryGifsInLocalStorage(): void {
    localStorage.setItem('tagsHistory', JSON.stringify(this._tagsHistory));
  }

  private loadHistoryGifsFromLocalStorage(): void {
    const tagsHistory = localStorage.getItem('tagsHistory');
    if (tagsHistory) {
      this._tagsHistory = JSON.parse(tagsHistory);
    }
    if (this._tagsHistory.length > 0) {
      this.searchTag(this._tagsHistory[0]);
    }
  }

  private organizeTagsHistory(tag: string): void {
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.slice(0, 10);
    this.setHistoryGifsInLocalStorage();
  }

  async searchTag(tag: string): Promise<void> {
    this.organizeTagsHistory(tag);
    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('q', tag)
      .set('limit', '8');
    const httpRequest = await this.http.get<SearchResponse>(
      `${GIPHY_API_URL}`,
      { params }
    );

    httpRequest.subscribe((response) => {
      this._gifs = response.data;
    });
  }
}
