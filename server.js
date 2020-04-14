const mongoose = require('mongoose');
const app = require('./app');
const keys = require('./config/keys');


// DB Config
const db = keys.mongoURL;


// Connect to MongoDB
// mongoose
//     .connect(
//         db,
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//             useFindAndModify: false
//         }
//     )
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));

mongoose.connect('mongodb://localhost/project-fair-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('DB connection successful!'))
    .catch(err => {
        console.log(Error, err.message);
    });


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
