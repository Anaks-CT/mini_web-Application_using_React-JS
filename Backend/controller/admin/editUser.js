const userSchema = require('../../config/model/userSchema')

const editUser = async(req,res) => {
    try {
        const user = await userSchema.findOne({_id : req.body.id})
        if(user){
            await userSchema.updateOne({ _id : req.body.id}, {$set : {name : req.body.name}})
            const updatedUser = await userSchema.find()
            res.json({data : updatedUser })
        }else{
            res.json({message : 'user not found'})
        }
    } catch (error) {
        console.log(error);
        res.json({message : 'error occured'}) 
    }
}


module.exports = editUser