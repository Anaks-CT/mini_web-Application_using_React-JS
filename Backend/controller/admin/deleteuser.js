const userSchema = require('../../config/model/userSchema')

const userDetail = async(req,res) => {
    try {
        const user = await userSchema.findOne({_id : req.params.id})
        if(user){
            await userSchema.findByIdAndDelete(req.params.id)
            res.json({success : 'user deleted'})
        }else{
            res.json({message : 'user not found'})
        }
    } catch (error) {
        console.log(error);
        res.json({message : 'error occured'})
    }
}


module.exports = userDetail