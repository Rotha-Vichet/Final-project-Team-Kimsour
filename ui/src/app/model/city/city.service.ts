import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from './cityModel';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  selectedCity:City = new City();
  allCity:City[] = [];
  toURL = "http://localhost:3000/city"
  constructor(private _http: HttpClient) { }

  post(city: City){
    return this._http.post(this.toURL,city) ;
  }

  getAllCity(){
    return this._http.get(this.toURL);
  }
  getCityByID(){
    return this._http.get(this.toURL);
  }
  putCity(city: City){
    return this._http.put(this.toURL+`/${city._id}`,city);
  }
  deleteCityByID(_id : String){
    return this._http.delete(this.toURL+`/${_id}`);
  }

}
