import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-restaurant-items',
  templateUrl: './restaurant-items.component.html',
  styleUrls: ['./restaurant-items.component.css']
})
export class RestaurantItemsComponent {

  items: any[]=[];

  constructor (private activate:ActivatedRoute, private master:MasterService){
    this.activate.params.subscribe((res: any)=>{
      debugger
      this.loadFoodItemsByCategory(res.categoryId)
  
    })
  }

  loadFoodItemsByCategory(id: string){
    this.master.getItemsByRestaurantByCategoryId(id).subscribe((res: any)=>{
      this.items=res.data
     
    })
  }
}
