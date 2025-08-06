import app from './app';
import config from './config/config';
import connectDB from './config/connectDB';

connectDB();

app.listen(config.port, () => {
  console.log(`The-Tech-Insight server is running on port: ${config.port}`);
});
