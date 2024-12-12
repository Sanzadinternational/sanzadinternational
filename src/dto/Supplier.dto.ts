export interface CreateSupplierInput {
  Company_name:string,
  Owner: string,
  Address: string,
  Country: string, 
  City: string,
  Zip_code: string,
  Office_number: string,
  Email: string,
  Contact_Person: string,
  Otp:string,
  Mobile_number: string,
  Gst_Vat_Tax_number: string, 
  PAN_number: string, 
  Currency: string,
  Gst_Tax_Certificate: string,
  Password: string,
  Api_key:string,
  Is_up:string,
  }
export interface SupplierPriceInput{
  country:string,
  city:string,
  location_from_airport:string,
  location_from_port_cruise:string,
  location_from_station:string,
  location_from_city_center:string, 
  location_to_airport:string,
  location_to_port_cruise:string,
  location_to_station:string,
  location_to_city_center:string,
  night_time_supplement:string,
  vice_versa:string,
  half_day_city_limit_4hrs:string,
  full_day_city_limit_8hrs:string,
  from_date: string, 
  to_date: string,   
  price: string, 
  new_location: string,
} 
  export interface CreateTransportNodesInput{
  formatted_address:string,
  location_lat:string,
  location_lon:string,
  description:string,
  place_id:string,
  country:string,
  airport_or_establishment:string,
  }
  export interface CreateSupplierOneWayInput{
    country:string,
    city:string,
    location_from_airport:string,
    location_from_port_cruise:string,
    location_from_station:string,
    location_from_city_center:string,
    location_to_airport:string,
    location_to_port_cruise:string,
    location_to_station:string,
    location_to_city_center:string,
    night_time_supplement:string,
    vice_versa:string,
    half_day_city_limit_4hrs:string,
    full_day_city_limit_8hrs:string,
    from_date:string,
    to_date:string,
    price:number,
    new_location:string
  }
  export interface Roundtrip_Service_Price_Details{
    country:string,
    city:string,
    location_from_airport:string,
    location_from_port_cruise:string,
    location_from_station:string,
    location_from_city_center:string,
    location_to_airport:string,
    location_to_port_cruise:string,
    location_to_station:string,
    location_to_city_center:string,
    night_time_supplement:string,
    vice_versa:string,
    half_day_city_limit_4hrs:string,
    full_day_city_limit_8hrs:string,
    from_date:string,
    to_date:string, 
    price:number,
    new_location:string
  }

  export interface CreateSupplierApidata{ 
    Api:string,
    Api_User:string,
    Api_Password:string,
    Api_Id_Foreign:number
  } 

export interface CreateCartDetails{
  Vehicle_type:string,
  Vehicle_brand:string,
  Service_type:string,
  Vehicle_model:string,
  Doors:string,
  Seats:string, 
  Cargo_space:string,
  Passenger:string,
  Medium_bag:string,
  Small_bag:string,
  Extra_space:string,
  Transfer_from:string,
  Transfer_to:string,
  Vice_versa:{
    type:string,
    default:'No',
    enum:['Yes','No',]
  },
  Price:string,
  Half_day_ride_4hrs:{
    type:string,
    default:"No",
    enum:['Yes','No']
  },
  Full_day_ride_8hrs:{
    type:string,
    default:"No",
    enum:['Yes','No']
  },
  Vehicle_rent:string,
  Fuel:{
    type:string,
    default:"No",
    enum:['Yes','No']
  },
  Driver:string,
  Parking_fee:{
    type:string,
    default:"No",
    enum:['Yes','No']
  },
  Toll_or_taxes:{
    type:string,
    default:"No",
    enum:['Yes','No']
  },
  Driver_tips:{
    type:string,
    default:"No",
    enum:['Yes','No']
  },
  Other:string
}