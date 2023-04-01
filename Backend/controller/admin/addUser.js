const userSchema = require('../../config/model/userSchema')

const addUser = async(req,res) => {
    try {
        console.log(req.body);
        const newUser = new userSchema(req.body)
        newUser.save()
        res.json({message : 'success'}) 
    } catch (error) {
        console.log(error);
        res.json({message : 'error occured'})
    }
}


module.exports = addUser