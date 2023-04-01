const userSchema = require('../../config/model/userSchema')



const addUser = async(req, res) => {
    try {
    const {name, email, password} = req.body
    const userCheck = await userSchema.findOne({email : email})
    if(!userCheck){
        const newUser = new userSchema({
            name, email, password
        })
        await newUser.save()
        res.json({data : req.body})
    }else{
        return res.status(400).send({message : 'Email Aldready Registered'})
    }
    } catch (error) {
        return res.status(401).send({message : 'Error occured in the backend'})
    }
    
}

module.exports = addUser