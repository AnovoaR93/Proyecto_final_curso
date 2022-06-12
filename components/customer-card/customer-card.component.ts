import { Component,  Input, Output, EventEmitter } from '@angular/core';
import { digestedCustomerData } from 'src/data_modeling/customer';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent{
  @Input() index!: number;
  @Input() customerData!: digestedCustomerData;
  @Output()
  updateEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  deleteEvent: EventEmitter<number> = new EventEmitter<number>();

  updateCustomer(){
    this.updateEvent.emit(this.index);
  }

  deleteCustomer(){
    this.deleteEvent.emit(this.index);
  }

}
