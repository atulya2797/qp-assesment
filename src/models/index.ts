// Define interfaces for Grocery Item and Order
export interface GroceryItem {
    id: number;
    name: string;
    price: number;
    inventory: number;
  }
  
  export interface OrderItem {
    itemId: number;
    quantity: number;
  }
  
  export interface Order {
    userId: number;
    items: OrderItem[];
  }
  