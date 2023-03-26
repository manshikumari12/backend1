const jwt =require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    if(token){
        const decoded= jwt.verify(token,"masai")
        if(decoded){
            next()
        }else{
            res.status(400).send({"msg":"please login first"})
        }
    }

}
module.exports={auth}