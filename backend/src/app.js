// create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const cors = require('cors');

const app = express();
// when deployed behind a proxy (Vercel/Render) enable trust proxy
app.set('trust proxy', 1);

// normalize duplicate slashes (e.g. //api/food) to avoid redirects
app.use((req, res, next) => {
    if (req.url && req.url.includes('//')) {
        req.url = req.url.replace(/\/\/{2,}/g, '/');
    }
    next();
});

// flexible CORS: allow localhost and common hosted frontends (vercel/onrender)
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // allow non-browser clients
        const allowed = [ 'http://localhost:5173' ];
        if (allowed.includes(origin)) return callback(null, true);
        try {
            const host = new URL(origin).hostname;
            if (host.endsWith('.vercel.app') || host.endsWith('.onrender.com')) {
                return callback(null, true);
            }
        } catch (e) {
            // invalid origin
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;