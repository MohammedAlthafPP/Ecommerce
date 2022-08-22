const app =require('./app');
const dotenv = require('dotenv');
//const { path } = require('./app');
const connectDatabase = require('./config/database')
var path = require('path');


//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);

    process.exit(1);
})

//config 
dotenv.config({path:"backend/config/.env"})

//Connectiong to Database
connectDatabase()

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is Running Sucessfully on http://localhost:${process.env.PORT}`);
});


//Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });

})




//======================================================================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');






//======================================================================