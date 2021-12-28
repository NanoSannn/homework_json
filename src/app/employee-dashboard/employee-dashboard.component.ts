import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { EmployeeModels } from './employee-dashboard.models';
import { ApiService } from '../shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formEmployee!: FormGroup;
  employeeModel: EmployeeModels = new EmployeeModels();
  employeeData!: any;
  ShowAdd!: boolean;
  ShowUpdate!: boolean;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.formEmployee = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl(),
      formFile: new FormControl(),
    })
    this.getEmployee()
    let close = document.getElementById("close")
    close!.click()
  }

  postEmployee(){
    this.employeeModel.firstName = this.formEmployee.value.firstName
    this.employeeModel.lastName = this.formEmployee.value.lastName
    this.employeeModel.email = this.formEmployee.value.email
    this.employeeModel.phoneNumber = this.formEmployee.value.phoneNumber
    this.employeeModel.formFile = this.formEmployee.value.formFile
    console.log(this.employeeModel)
    this.api.postEmployee(this.employeeModel)
    .subscribe(res=>{
      Swal.fire("Complete","Add Employee Complete","success")
      this.getEmployee();
    },
    err=>{
      Swal.fire("Error","Add Employee Error","error")
    })
  }

  getEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  deleteEmployee(id: number){
    this.api.deleteEmployee(id)
    .subscribe(res=>{
      Swal.fire("Complete","Delete Employee Complete","success")
      this.getEmployee();
    },
    err=>{
      Swal.fire("Error","Delete Employee Error","error")
    })
  }

  clickAdd(){
    this.formEmployee.reset()
    this.ShowAdd = true
    this.ShowUpdate = false
    this.employeeData.id = 0

  }

  clickEdit(data: any){
    this.ShowAdd = false
    this.ShowUpdate = true
    this.employeeModel.id = data.id
    this.formEmployee.controls['firstName'].setValue(data.firstName)
    this.formEmployee.controls['lastName'].setValue(data.lastName)
    this.formEmployee.controls['email'].setValue(data.email)
    this.formEmployee.controls['phoneNumber'].setValue(data.phoneNumber)
    this.formEmployee.controls['formFile'].setValue(data.formFile)
  }

  updateEmployee(){
    this.employeeModel.firstName = this.formEmployee.value.firstName
    this.employeeModel.lastName = this.formEmployee.value.lastName
    this.employeeModel.email = this.formEmployee.value.email
    this.employeeModel.phoneNumber = this.formEmployee.value.phoneNumber
    this.employeeModel.formFile = this.formEmployee.value.formFile
    console.log(this.employeeModel)
    this.api.updateEmployee(this.employeeModel.id,this.employeeModel)
    .subscribe(res=>{
      Swal.fire("Complete","Update Employee Complete","success")
      this.getEmployee();
    },
    err=>{
      Swal.fire("Error","Update Employee Error","error")
    })
  }
}
