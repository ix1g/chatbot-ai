const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const flash = require('connect-flash');

// Import routes
const statsRouter = require('./routes/stats');
const authRouter = require('./routes/auth');
const configRouter = require('./routes/config');
const presenceRouter = require('./routes/presence');

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
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));
app.use(flash());

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Flash messages middleware
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Authentication middleware
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// Routes
app.use('/stats', statsRouter);
app.use('/auth', authRouter);
app.use('/config', configRouter);
app.use('/presence', presenceRouter);

// Home route
app.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    res.render('index', {
        title: 'Dashboard',
        botStatus: 'Online'
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Start server if not imported as a module
if (!module.parent) {
    app.listen(PORT, () => {
        console.log(`Dashboard running on http://localhost:${PORT}`);
    });
}

module.exports = app;