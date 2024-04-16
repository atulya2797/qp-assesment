import express, { Request, Response } from 'express';
import { GroceryManager } from '../controllers/groceryController';
import { GroceryItem } from '../models';

const router = express.Router();
const groceryManager = new GroceryManager();

// Add new grocery item to the system
router.post('/add', (req: Request, res: Response) => {
  const { id, name, price, inventory } = req.body;
  const newItem: GroceryItem = { id, name, price, inventory };
  groceryManager.addGroceryItem(newItem);
  res.send('Grocery item added successfully');
});

// View existing grocery items
router.get('/list', (req: Request, res: Response) => {
  const groceryItems = groceryManager.getGroceryItems();
  res.json(groceryItems);
});

// Remove grocery item from the system
router.delete('/remove/:id', (req: Request, res: Response) => {
  const itemId = parseInt(req.params.id);
  groceryManager.removeGroceryItem(itemId);
  res.send('Grocery item removed successfully');
});

// Update details of existing grocery item
router.put('/update/:id', (req: Request, res: Response) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  groceryManager.updateGroceryItem(itemId, updatedItem);
  res.send('Grocery item updated successfully');
});

// Manage inventory levels of grocery items
router.put('/manage-inventory/:id', (req: Request, res: Response) => {
  const itemId = parseInt(req.params.id);
  const { quantity } = req.body;
  groceryManager.manageInventory(itemId, quantity);
  res.send('Inventory managed successfully');
});

export default router;
