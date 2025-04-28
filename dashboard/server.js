const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

// Import routes
const statsRouter = require('./routes/stats');
const authRouter = require('./routes/auth');
const configRouter = require('./routes/config');

const app = express();
const PORT = process.env.DASHBOARD_PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/stats', statsRouter);
app.use('/auth', authRouter);
app.use('/config', configRouter);

// Home route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Discord Bot Dashboard',
        botStatus: 'Online'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Dashboard running on http://localhost:${PORT}`);
});