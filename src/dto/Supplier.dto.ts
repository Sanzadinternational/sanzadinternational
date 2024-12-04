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
    Api_Name:string,
    Api_User:string,
    Api_Password:string,
    Api_Id_Foreign:number
  } 