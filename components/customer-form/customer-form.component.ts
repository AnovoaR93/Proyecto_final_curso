import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { digestedCustomerData } from 'src/data_modeling/customer';

@Component({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})

export class CostumerFormComponent implements OnInit{

    CostumerProfile = new FormGroup({
      name : new FormControl("", [Validators.required, Validators.minLength(3)]),
      surename : new FormControl("", [Validators.required, Validators.minLength(3)]),
      dni : new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      phone : new FormControl("", Validators.required),
      sex : new FormControl("", [Validators.required, Validators.pattern(/m|w/i)]),
    });
    defaultName!: string;

  @Input() operationOnSubmit!: string;
  @Input() index!: number;
  @Input() title!: string;
  @Input() buttonText!: string;
  @Input() defaultValues: digestedCustomerData = new digestedCustomerData();
  @Output()
  submitEvent: EventEmitter<{"index": number,"operation": string, "data": digestedCustomerData}>
   = new EventEmitter<{"index": number, "operation": string, "data": digestedCustomerData}>();

  constructor() {
  }

  ngOnInit() {
    let phone;
    if (isNaN(this.defaultValues.phone))
      phone = "";
    else
      phone = String(this.defaultValues.phone);
    this.CostumerProfile.setValue({
      "name": this.defaultValues.name,
      "surename": this.defaultValues.surename,
      "dni": this.defaultValues.dni,
      "phone": phone,
      "sex": this.defaultValues.sex
    });
  }

  submit() {
    let data = this.CostumerProfile.value;
    this.submitEvent.emit({
      "index": this.index,
      "operation": this.operationOnSubmit,
      "data": {
        "name": data.name!,
        "surename": data.surename!,
        "dni": data.dni!,
        "phone": Number(data.phone!),
        "id": "",
        "sex": data.sex!,
      }
    });
  }

  get name() { return this.CostumerProfile.get('name'); }
  get surename() { return this.CostumerProfile.get('surename'); }
  get phone() { return this.CostumerProfile.get('phone'); }
  get sex() { return this.CostumerProfile.get('sex'); }
  get dni() { return this.CostumerProfile.get('dni'); }
}