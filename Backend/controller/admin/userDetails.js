const userSchema = require('../../config/model/userSchema')

const userDetail = async(req,res) => {
    try {
        const userDetailss = await userSchema.find()
        res.json({data : userDetailss})
    } catch (error) {
        console.log(error);
        res.json({message : 'error occured'})
    }
}


module.exports = userDetail