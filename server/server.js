import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { verifyToken } from './middlewares/auth.js';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { search, recommendations, trending, random, categoryFilter } from './controllers/search.js'

/* CONFIGURATIONS  */
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({        // Multer GitHub repo
  destination: function(req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});         // this is how you can save files anytime someone uploads a file on the website then the server will save the file at the destination('public/assets') mentioned with the filename
const upload = multer({ storage });

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

/* ROUTES WITH FILES */
app.post('/auth/register', upload.single('picture'), register);
// app.post('/auth/register', register);
// app.post('/create', verifyToken, upload.single('picture'), createPost);
app.post('/post/create', createPost);

app.post('/getPassword', async (req, res) => {
  try {
    const { password } = req.body;
  
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
  
    return res.json({ password: hashedPassword });
  } catch (error) {
    return res.json({ error: error.message })
  }
})

// search apis
app.post('/search',search)
app.get('/recommendations',recommendations)
app.get('/trending',trending)
app.get('/random',random)
app.get('/category/:type',categoryFilter)


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;

try {
  mongoose.set('strictQuery', false);
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Database is connected...');
  
  app.listen(PORT, () => {
    console.log(`Server Port: ${PORT}`);
  });
} catch (error) {
  console.log('Database not connected...')
}