import { style } from '@angular/animations';
import { Component, OnInit, Renderer2, ɵɵqueryRefresh } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { CityService } from '../model/city/city.service';
import { City } from '../model/city/cityModel';
declare var M : any
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [CityService]

})
export class HomepageComponent implements OnInit {
  inputForm:FormGroup = new FormGroup({
    _id : new FormControl(null,Validators.required),
    cityName : new FormControl(null,Validators.required),
    country : new FormControl(null,Validators.required),
    description : new FormControl(null,Validators.required),
  });
  
  // insertionForm:FormGroup = new FormGroup({
  //   city: new FormControl('',Validators.required),
  //   country:new FormControl('', Validators.required),
  //   title:new FormControl('',Validators.required)
  // })
  // title:string = '';
  // city:string = '';
  // country:string = '';
  constructor(public cityService:CityService, private renderer:Renderer2) { }
  

  ngOnInit(): void {
    // this.reset();
    this.liveUpdateTable();
  }
 
  reset(form?: FormGroup){ //optional parameters
    if(form){
      form.reset();
    }
    // this.cityService.selectedCity = {
    //   _id : "",
    //   cityName : "",
    //   country : "",
    //   code : "",
    //   description : ""
    // }
  }

  liveUpdateTable(){
    this.cityService.getAllCity().subscribe((res)=>{
      this.cityService.allCity = res as City[];
    })
  }
  addRecord(){
    console.log('addrecord function is working')
    var addRecordElement = document.getElementById('addRecord')
    // this.renderer.setStyle(addRecordElement,"display","block")
    addRecordElement?.setAttribute("style","display : inline-block")
  }
  
  // submit(){
  //   // console.log(form.value)
  //   console.log(this.inputForm.value)
  //   console.log(this.inputForm.value._id)
  //   if(this.inputForm.value._id == null){
  //     this.cityService.post(this.inputForm.value).subscribe((res)=>{
  //       this.reset(this.inputForm);
  //       this.liveUpdateTable()
  //     })
  //   }
  //   else{
  //     console.log(this.inputForm.value)
  //     this.cityService.putCity(this.inputForm.value).subscribe((res)=>{
  //       this.reset(this.inputForm);
  //       this.liveUpdateTable();
  //       // M.toast({
  //       //   html : 'Update Successfuly',
  //       //   class : 'rounded'

  //       // })
  //     })
  //   }
  // }
  add(){
    this.cityService.post(this.inputForm.value).subscribe((res)=>{
      this.reset(this.inputForm);
      this.liveUpdateTable()
      
      alert("Update Successful")
    })
  } 
  update(){
    this.cityService.putCity(this.inputForm.value).subscribe((res)=>{
      this.reset(this.inputForm);
      this.liveUpdateTable();
      alert("Update Successful")
    })
  }
  delete(){
    
    if(confirm("This record will be deleted after pressing 'Confirm' ")==true){
      this.cityService.deleteCityByID(this.inputForm.value._id).subscribe((res)=>{
        this.liveUpdateTable();
        this.reset(this.inputForm);
          alert("Delete SuccessFul")
      })
    }
  }
 
  
}
