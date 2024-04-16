import express, { Request, Response } from 'express';
import { GroceryManager } from '../controllers/groceryController';
import { GroceryItem ,OrderItem,Order} from '../models';

const router = express.Router();
const groceryManager = new GroceryManager();

// View the list of available grocery items
router.get('/list', (req: Request, res: Response) => {
  const availableItems = groceryManager.getGroceryItems().filter(item => item.inventory > 0);
  res.json(availableItems);
});

// Book grocery items
router.post('/order', (req: Request, res: Response) => {
  const { userId, items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).send('Items array is required and must not be empty');
  }

  // Check if all items in the order are valid and have sufficient inventory
  for (const orderItem of items) {
    const { itemId, quantity } = orderItem;
    const item = groceryManager.getGroceryItems().find(item => item.id === itemId);

    // Check if the item exists and has sufficient inventory
    if (!item || item.inventory < quantity) {
      return res.status(400).send(`Item with ID ${itemId} is not available in sufficient quantity`);
    }
  }

  // Update inventory levels and generate order
  const orderItems: OrderItem[] = [];
  for (const orderItem of items) {
    const { itemId, quantity } = orderItem;
    groceryManager.manageInventory(itemId, -quantity); // Reduce inventory
    orderItems.push({ itemId, quantity });
  }

  const order: Order = { userId, items: orderItems };
  res.status(201).json({ message: 'Order placed successfully', order });
});

export default router;
