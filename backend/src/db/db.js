const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tls: true, // TLS/SSL enable
        tlsAllowInvalidCertificates: false, // true if self-signed certificate
    })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });
}

module.exports = connectDB;
