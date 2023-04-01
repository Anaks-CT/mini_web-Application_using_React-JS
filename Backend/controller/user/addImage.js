const userSchema = require('../../config/model/userSchema');

const addImage = async(req, res) => {
    try {
        const user = await userSchema.findOne({email : req.body.email})
        if(user){
            await userSchema.updateOne({email : req.body.email},{$set : { image : req.body.url}})
            res.json({data : req.body.url , success : 'imageuploaded'})
        }else{
            return res.status(400).send({message : 'no user'})
        }
    } catch (error) {
        return res.status(401).send({message : 'crashed in backend'})
    }
}

module.exports = addImage