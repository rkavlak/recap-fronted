import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';

import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  rentals:Rental[];
  carNameFilter=""
  carImage:CarImage[]=[];
  carImagePath="https://localhost:44392/"
  dataLoaded = false;

  constructor(private carService: CarService, 
    private carImageService:CarImageService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private rentalService:RentalService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarByBrand(params["brandId"]);

      }
      else if(params["colorId"]){
        this.getCarByColor(params["colorId"]);

      }
  
      else{
        this.getCars();
      }
    })
   
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;

    });
  }

  getCarByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      console.log(response)
    });
  }

  getCarByColor(colorId:number) {

    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars=response.data;
      this.dataLoaded = true;
      console.log(response)

    });
  }
  getCarImage(car:Car ){
    if(car.imagePath){
      return car.imagePath
    }
    else{
      return 'Images/default.jpg'
    }
  
  }
  addToCar(carId:number){
    this.rentalService.getRentalsByCarId(carId).subscribe((response)=>{
      this.rentals=response.data;
      this.toastrService.success("Kiralama sayfasına yönlendiriliyorsunuz", )
    })
   
  }



  
 


}
