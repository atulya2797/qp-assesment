import express from 'express';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());

// Admin routes
app.use('/admin', adminRoutes);

// User routes
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
