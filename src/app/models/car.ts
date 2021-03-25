import { CarDetail } from "./carDetail";
import { CarImage } from "./carImage";


export interface Car {

    carId:number;
    carName:string;
    brandId:number;
    brandName:string;
    colorName:string;
    colorId:number;
    modelYear:string;
    dailyPrice:number;
    description:string;
    imagePath:string;


}