const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const verifyToken = require('./middleware/authMiddleware');
const config = require('./config/config');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' })); // Aumenta el límite de carga a 50 MB

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});

const authController = require('./controllers/authController');
const documentRoutes = require('./routes/documentRoutes');
const userRoutes = require('./routes/usersRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const rolRoutes = require('./routes/rolRoutes');
app.post('/login', authController.login);
console.log('login');
app.post('/register', authController.register);
app.get('/protected', verifyToken, authController.protected);
app.use('/users' ,userRoutes );
app.use('/roles', rolRoutes);
// Rutas para documentos
app.use('/documents', documentRoutes);
app.use('/empresa',empresaRoutes)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
