import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { CarComponent } from '../car/car.component';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers:[DatePipe]
})
export class RentalComponent implements OnInit {
  customers: Customer[];
  customerId:number;
  @Input() car: Car;
  rentals:Rental[];
  dataLoaded=false;

  minDate:string | null;
  maxDate:string | null;
  maxMinDate:string | null;
  firstDateSelected:boolean=false;  

  rentDate:Date;
  returnDate:Date;

  constructor(private rentalService:RentalService,
    private datePipe:DatePipe,
    private router:Router,
    private toastrService:ToastrService,
    private customerService:CustomerService) { }

  ngOnInit(): void {

    this.createRental();

    
  }

  getRentals(){
    this.rentalService.getRentals().subscribe((response)=>{
        this.rentals=response.data;
        this.dataLoaded=true;

    })

  } getCustomer() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
      console.log(response.data);
    });
  }

  getRentMinDate(){
    this.minDate=this.datePipe.transform(new Date(), "yyyy-MM-dd");
    return this.minDate;
  }

  getReturnMinDate() {
    if (this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate);
      let new_date = new Date();
      new_date.setDate(stringToDate.getDate() + 1);
      return new_date.toISOString().slice(0, 10);
    } else {
      return this.rentDate;
    }
  }

  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }
  
  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }

  
  setCustomerId(customerId: string) {
    this.customerId = +customerId;
    console.log(this.customerId);
  }

  createRental() {
    let MyRental: Rental = {
      carId:this.car.carId,
      modelYear:this.car.modelYear,
      description:this.car.description,
      dailyPrice: this.car.dailyPrice,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      customerId: this.customerId,
    };
    if (MyRental.customerId == undefined || MyRental.rentDate == undefined) {
      this.toastrService.error("Eksik bilgi girdiniz","Bilgilerinizi kontrol edin")
    } else{
      this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
      this.toastrService.success(
        'Ödeme sayfasına yönlendiriliyorsunuz...',
        'Ödeme İşlemleri'
      );
    }
  }





}
