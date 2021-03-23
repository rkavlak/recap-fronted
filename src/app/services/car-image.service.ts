import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = 'https://localhost:44392/api/';

  constructor(private httpClient:HttpClient) { }
  getCarImages(id:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"carImages/getimagesbycarid?id="+id

    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);

  }

  getAllCarImages():Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"carImages/getall"

    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);

  }
}
