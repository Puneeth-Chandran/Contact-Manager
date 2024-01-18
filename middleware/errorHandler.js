const {constants}= require("../constants")


const errorHandler = (err,req,res,next) =>{
  const statusCode= res.statusCode? res.statusCode:500
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
        res.json({title:"Validatioin failed", Message:err.message,stackTrace:err.stack})
        break;
        case constants.NOT_FOUND:
            res.json({title:"It's not found", Message:err.message,stackTrace:err.stack})
            break;
            case constants.UNAUTHORIZED:
                res.json({title:"Unauthorized", Message:err.message,stackTrace:err.stack})
                break;
                case constants.FORBIDDEN:
                    res.json({title:"Forbidden", Message:err.message,stackTrace:err.stack})
                    break;
                    case constants.SERVER_ERROR:
                        res.json({title:"Server error", Message:err.message,stackTrace:err.stack})
                        break;
    default:
        console.log("No errors!! ");
        break;
  }
  
  
}

module.exports= errorHandler;