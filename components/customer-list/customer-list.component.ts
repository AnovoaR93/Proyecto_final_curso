import { Component } from '@angular/core';
import { customer, digestedCustomerData } from 'src/data_modeling/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent{
  createOrder = "CREATE";
  updateOrder = "UPDATE";

  customersOnUpdate: Array<boolean>;
  customers: Array<customer>;

  constructor() {
    this.customers = new Array<customer>();
    this.customersOnUpdate = new Array<boolean>();
  }

  handleFormSubmit(submitOperation: {"index": number, "operation": string, "data": digestedCustomerData}) {
    if(submitOperation['operation'] == this.createOrder)
      this.createUser(submitOperation['data']);
    else if(submitOperation['operation'] == this.updateOrder)
    this.updateUser(submitOperation['data'], submitOperation['index']);
  }

  createUser(cData: digestedCustomerData) {
    let newId;
    console
    let ids = new Array<string>();
    this.customers.forEach(customer => ids.push(customer.getId()) );
    do{ //generate random id
      newId = "";
      for ( var i = 0; i < 5; i++) {
        newId += '0123456789'.charAt(Math.floor(Math.random() * 10));
      }
    } while (ids.includes(newId))
    let newCustomer = new customer(
      cData.name,
      cData.surename,
      cData.dni,
      cData.phone,
      newId,
      cData.sex
    )
    this.customers.push(newCustomer);
    this.customersOnUpdate.push(false);
  }

  deleteUser(index:number) {
    this.customers.splice(index, 1);
    this.customersOnUpdate.splice(index, 1);
  }

  updateUser(CData: digestedCustomerData, index: number) {
    let cToUpdate = this.customers[index];
    console.log(index);
    console.log(this.customers);
    cToUpdate.setName(CData.name);
    cToUpdate.setSurname(CData.surename);
    cToUpdate.setDni(CData.dni);
    cToUpdate.setPhone(CData.phone);
    cToUpdate.setSex(CData.sex);
    this.customersOnUpdate[index] = false;
  }

  loadUpdateForm(index: number){
    this.customersOnUpdate[index] = true;
  }

  getDigestedData(index: number){
    return new digestedCustomerData(this.customers[index])
  }
}
