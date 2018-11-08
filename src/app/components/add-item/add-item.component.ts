import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../model/Item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
 item: Item = {
   title: '',
   description: ''
 }
  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
 
  }

  onSubmit(){
    if(this.item.title != '' && this.item.description !=''){
      this.itemsService.addItem(this.item);
    }
    this.item.title ='';
    this.item.description ='';
  }

}
