import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorReponseModel } from '../models/colorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'https://localhost:44392/api/colors/getall';

  constructor(private httpClient:HttpClient) { }
  getColors():Observable<ColorReponseModel>{
    return this.httpClient.get<ColorReponseModel>(this.apiUrl);

  }
}
