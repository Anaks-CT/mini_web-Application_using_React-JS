const userSchema = require('../../config/model/userSchema')

const loginAuth = async(req,res) => {
    try {
        const adminDetail = {
            email : 'admin@gmail.com',
            password : '123'
        }
        const { email, password } = req.body
        if(adminDetail.email !== email){
            return res.status(400).send({message : 'Invalid Email or Password'})
        }
        if(adminDetail.password !== password){
            return res.status(400).send({message : 'Invalid Email or Password'})
        }
        res.json({data : adminDetail, message : 'logged in successfully'})
    } catch (error) {
        console.log(error);
        res.json({message : 'error occured'})
    }
}


module.exports = loginAuth