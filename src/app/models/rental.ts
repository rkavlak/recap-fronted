export interface Rental{
    rentalId?:number,
    carId:number,
    companyName?:string,
    modelYear:string,
    dailyPrice:number,
    description:string,
    rentDate:Date,
    returnDate:Date,
    customerId?:number,
    
}