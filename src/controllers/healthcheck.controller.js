import {ApiResponse} from "../utils/api-Response.js";


const healthcheck = (req, res) => {
    try{
        res.status(200)
        .json( new ApiResponse(true, "Service is healthy", null));
    }catch(error){}
        console.error(error);
    };

    export {healthcheck};