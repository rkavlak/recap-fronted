import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeCard } from '../models/fakeCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FakeCardService {

  constructor(private httpClient:HttpClient) { }

  
  apiUrl = 'https://localhost:44392/api/';

  isCardExist(fakeCard:FakeCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cards/iscardexist";
    console.log(fakeCard);
    return this.httpClient.post<ResponseModel>(newPath,fakeCard);
  }

  getCardByNumber(cardNumber:string):Observable<ListResponseModel<FakeCard>>{
    let newPath = this.apiUrl + "cards/getbycardnumber?cardnumber=" + cardNumber;
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath);
  }

  updateCard(fakeCard:FakeCard){
    let newPath = this.apiUrl + "cards/update";
    this.httpClient.put(newPath,fakeCard)
  }
}


