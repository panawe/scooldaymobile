import { Country } from '../models/country';
import { College } from '../models/college';
import { SchoolYear } from '../models/schoolYear';
import { Level } from './level';
export class User {
  id: number = 0;
  address: string;
  birthDate: Date;
  cityResidence: string;
  email: string;
  userName:string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  cellPhone: string;
  role: number;
  sex: string; 
  countryResidence:Country;
  countryOrigin:Country;
  currentLocale:string;
  zipCode:string;
  status:boolean;
  token:string;
  online:boolean;
  createDate:Date;
  modDate:Date;
  modifiedBy:Date;
  comments:string;
  college:College;
  level:Level;
  currentDiploma:string;
  schoolYear:SchoolYear;
  pic:  string;
  name: string;
  event: string;
  sendMail: boolean = false;
  fromAdmin: boolean= false;
}