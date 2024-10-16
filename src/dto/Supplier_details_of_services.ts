export interface CreateSupplierInput { 
 vehicle_type:string,
  vehicle_brand:number, 
  type_service:string,
  vehicle_model:number, 
  doors:string,
  seats:string,
  category_space:number,
  max_number_pax_accommodate:string,
  luggage_information:string,
  max_number_medium_suitcase:string,
  max_number_carbin_bag:string, 
  space_available_other_luggage:number, 
  location_details:string,
  transfer_information:string,
  service_providing_location:string,  
  airport:string,
  port_cruise:string,
  station:string,
  city_center:string,
  vehicle_for:string,
  half_day_city_limit_4hrs: boolean, 
  full_day_city_limit_8hrs: boolean,   
  inclusions:boolean,
  vehicle_rent:number,
  fuel:string,
  driver:string,
  parking_fees:number,
  toll_or_taxes:number, 
  driver_tips:number,
  other:string, 
  } 