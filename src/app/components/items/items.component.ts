import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../../services/items.service';
import {Item} from '../../model/Item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;

  constructor(private itemService: ItemsService) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
     this.items =items;
    })

    
  }

  deleteItem(event,item){
    this.clearState();
    this.itemService.deleteItem(item);
  }

  editItem(event, item){
    this.editState = true;
    this.itemToEdit = item;
  }

  clearState(){
    this.editState = false;
    this.itemToEdit = null;
  }

  updateItem(item :Item){
    this.itemService.updateItem(item);
    this.clearState();
  }
}
