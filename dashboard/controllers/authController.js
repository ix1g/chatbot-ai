const login = async (req, res) => {
    const { username, password } = req.body;
    
    // In a real application, you should validate against a database
    // This is just a simple example
    if (username === process.env.DASHBOARD_USERNAME && 
        password === process.env.DASHBOARD_PASSWORD) {
        req.session.user = {
            username,
            role: 'admin'
        };
        res.redirect('/');
    } else {
        res.render('login', {
            title: 'Login',
            error: 'Invalid credentials'
        });
    }
};

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
};

module.exports = {
    login,
    logout
};