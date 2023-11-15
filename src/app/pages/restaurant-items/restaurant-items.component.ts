import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-restaurant-items',
  templateUrl: './restaurant-items.component.html',
  styleUrls: ['./restaurant-items.component.css']
})
export class RestaurantItemsComponent {

  // items are all the items
  items: any[]=[];

  //no of fod items quantity
  quantity: number=0;

  orderObj : any ={
    
      "userId": 0,
      "totalAmount": 0,
      "restaurantId": 0,
      "deliveryAddress": "string" 
  }

  //one paticular item selected its details
  selectedFoodItem: any;

  constructor (private activate:ActivatedRoute, private master:MasterService){
    this.activate.params.subscribe((res: any)=>{
      debugger
      this.loadFoodItemsByCategory(res.categoryId)
  
    })
    const loggedData = localStorage.getItem('zomatoUser');
    if(loggedData !=null){
      const data =JSON.parse(loggedData);
      this.orderObj.userId=data.userId;
    }
         
  }

  loadFoodItemsByCategory(id: string){
    this.master.getItemsByRestaurantByCategoryId(id).subscribe((res: any)=>{
      this.items=res.data
     
    })
  }

  openQtyModel(item: any){
    const model = document.getElementById('myModal');
    
    if(model!=null){
      model.style.display="block";
    }
    this.selectedFoodItem = item;
  }

  closeQtyModel(item: any){
    const model = document.getElementById('myModal');
    if(model!=null){
      model.style.display="none";
    }
  }

  addToCart(){  
    
    this.orderObj.restaurantId=this.selectedFoodItem.restaurantID;
    this.master.placeOrder(this.orderObj).subscribe((res:any)=>{
      if(res.result){
        alert(res.message)
      }else{
        alert(res.message)
      }
    })
  }
}
