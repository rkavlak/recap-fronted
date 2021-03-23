import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetails:CarDetail[]=[];
  cars:Car[]=[];
  carImages:CarImage[]=[];
  currentImage:CarImage;
  dataLoaded=false;
  imageUrl = 'https://localhost:44392';

  constructor(
    private carDetailService:CarDetailService,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getCarsDetailById(params["id"])
        this.getCarsImagesById(params["id"])
      }


    })
  }
  getCarsDetailById(id:number){
    this.carDetailService.getCarDetails(id).subscribe(response=>{
      this.carDetails=response.data
      this.dataLoaded = true;
      console.log(id)
    })

  }
  getCarsImagesById(id:number){
    this.carImageService.getCarImages(id).subscribe(response=>{
      this.carImages=response.data
      this.dataLoaded = true;
      console.log(response)
    })

  }
  getAllCarsImages(){
    this.carImageService.getAllCarImages().subscribe(response=>{
      this.carImages=response.data

    })

  }

  
  getSliderClassName(index:number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

}
