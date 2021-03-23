import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl = 'https://localhost:44392/api/';

  constructor(private httpClient:HttpClient) { }

  getCarDetails(id:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+ "cars/getcardetails?id=" + id
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)

  }
}
