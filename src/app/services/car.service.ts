import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44392/api/';

  constructor(private httpClient: HttpClient) {}
  getCars(): Observable<ListResponseModel<Car>> {
    let newPath=this.apiUrl+ "cars/getall"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number): Observable<ListResponseModel<Car>> {
    let newPath=this.apiUrl + "cars/getbybrand?brandId=" + brandId 
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl + "cars/getbycolor?colorId=" + colorId 
    return this.httpClient.get<ListResponseModel<Car>>(newPath);

  }

}
