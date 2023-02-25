const router = require('express').Router()
const User = require('../schema/registerSchema');
const bcrypt = require('bcrypt')

router.post("/" ,  async(req,res)=>{
try{
    const {email , password , confirmPassword} = req.body
    const IsUser = await User.findOne({email:email})
    if(IsUser){
        return res.status(400).send("User Exists with given Email")
    }else{
        bcrypt.hash(password , 10 , async function(err,hash){
            if(err){
                return res.status(400).json({
                    "message" : err.message
                })
            }else{
                if(password === confirmPassword){
                    const user = new User({
                        email: email,
                        password: hash
                    })
                    user.save().then(()=>{
                       res.status(200).json({
                        message:"User Created",
                        user
                       })
                    }).catch((e)=>{
                       res.status(400).send(e.message)
                    })
                }
              
            }
        })

    }

}catch(e){
    return res.status(400).send(e.message)
}

})
module.exports = router;