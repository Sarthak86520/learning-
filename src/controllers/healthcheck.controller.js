import {ApiResponse} from "../utils/api-Response.js";
import {asyncHandler} from "../utils/async-handler.js";
/** 
const healthcheck = async (req, res ,next) => {
    try{
        const user = await getUserFromDB()
        res.status(200)
        .json( new ApiResponse(true, "Service is healthy", null));
    }catch(err){  
        next(err);
    }};
*/
const healthcheck = asyncHandler (async (req, res ,next) => {
    res
    .status(200)
    .json( new ApiResponse(true, "Service is healthy", null));
});
    export {healthcheck}