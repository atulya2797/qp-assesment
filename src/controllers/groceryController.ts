import { GroceryItem, OrderItem, Order } from '../models';
import {GroceryItems} from '../util/index'

// Define a class to manage the grocery items
export class GroceryManager {
  private groceryItems: GroceryItem[] = GroceryItems;

  // Method to add a new grocery item
  addGroceryItem(item: GroceryItem): void {
    this.groceryItems.push(item);
  }

  // Method to view existing grocery items
  getGroceryItems(): GroceryItem[] {
    return this.groceryItems;
  }

  // Method to remove a grocery item
  removeGroceryItem(itemId: number): void {
    this.groceryItems = this.groceryItems.filter(item => item.id !== itemId);
  }

  // Method to update details of a grocery item
  updateGroceryItem(itemId: number, updatedItem: Partial<GroceryItem>): void {
    this.groceryItems = this.groceryItems.map(item => {
      if (item.id === itemId) {
        return { ...item, ...updatedItem };
      }
      return item;
    });
  }

  // Method to manage inventory levels
  manageInventory(itemId: number, quantity: number): void {
    const item = this.groceryItems.find(item => item.id === itemId);
    if (item) {
      item.inventory += quantity;
    }
  }
}
