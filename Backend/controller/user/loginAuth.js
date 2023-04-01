const userSchema = require('../../config/model/userSchema')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}
const loginAuth = async(req,res) => {
    try {
        const { email, password } = req.body
        const currentUser = await userSchema.findOne({email : email})
        if(currentUser){
            if(currentUser.password === password){
                const token = createToken(currentUser._id)
                res.json({data : currentUser, token , message : 'logged in successfully'})
            }else{
                return res.status(400).send({message : 'Password incorrect'})
            }
        }else{
            return res.status(400).send({message : 'Email not Registered'})
        }

    } catch (error) {
        console.log(error);
        res.json({message : 'error occured'})
    }
}


module.exports = loginAuth