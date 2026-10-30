import 'dotenv/config'; 
// import dotenv from 'dotenv';
// dotenv.config();
import app from './app';

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Failed to start server on port ${PORT}:`, err.message);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${PORT}`);
});