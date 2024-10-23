export interface CreateAgentInput {
      Company_name:string,
      Address:string,
      Country:string,
      City:string,
      Zip_code:number,
      IATA_Code:number,
      Gst_Vat_Tax_number:number, 
      Contact_number:number,
      Email:string,
      Password:string,
      Office_number:number,
      Mobile_number:number,
      Currency:string,
      Gst_Tax_Certificate:string, 
}

export interface CreateOtpInput {
  email:string,
  otp: string,
//   isVerified:boolean,
  verificationCode: string,
}