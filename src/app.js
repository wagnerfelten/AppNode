require("express-async-errors");

const express = require("express");
const routes = require("./Routes")
const AppError = require("./utils/appError");
const app = express();


app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            staus: "Error",
            message: error.message,
        });
    }

    console.log(error)

    return res.status(500).json({
        status: "error",
        message: "Internal server Error."
    });
});


const PORT = 2020;
app.listen(PORT, () => console.log(`Server Running PORT ${PORT}`))