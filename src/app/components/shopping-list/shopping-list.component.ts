import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingListItem } from 'src/app/models/ShoppingListItem';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  item: ShoppingListItem = {
    name: '',
    count: 1
  };
  shoppingList: ShoppingListItem[];
  @ViewChild('form', {static: false}) form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.shoppingList = [
      {
        id: 0,
        name: 'apple',
        count: 2
      },
      {
        id: 1,
        name: 'peach',
        count: 3
      }
    ];
  }

  onSubmit(e, form) {

    if(form.invalid) return;

    const newItem: ShoppingListItem = {
      name: this.item.name,
      count: this.item.count,
      id: this.shoppingList.length
    };
    this.shoppingList.push(newItem);
    console.log(form);
    form.reset();
    //e.target.reset();
    //console.log(this.form)
  }

}
