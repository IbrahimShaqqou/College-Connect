const Users = require("../middlewares/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authCtrl = {
    register: async(req,res)=>{
        try{
            const {fullname, username, email, password, gender} = req.body;
            const newUsername = username.toLowerCase().replace(/ /g,'');
            console.log(newUsername)
            const user_name = await Users.findOne({username: newUsername})
           
            if (user_name) return res.status(400).json({msg: 'this username already exists'})

            const Email = await  Users.findOne({email: email})
            if (Email)  return res.status(400).json({msg: 'this email already exists'})

            if (password.length < 6) return res.status(400).json({msg: "password must be at least 6 characters long."})

            const passwordHash = await bcrypt.hash(password,13);

            const newUser = new Users({
                fullname, username:newUsername, email, password:passwordHash, gender
            })

            console.log(newUser)

            res.json({
                msg:"registerd sucess"
            })


        }catch(err) {
            res.status(500).json({msg: err.message})
        }
    },
    login: async(req,res)=>{
        try{

        }catch(err) {
            res.status(500).json({msg: err.message})
        }
    },
    logout: async(req,res)=>{
        try{

        }catch(err) {
            res.status(500).json({msg: err.message})
        }
    },
    generateAccessToken: async(req,res)=>{
        try{

        }catch(err) {
            res.status(500).json({msg: err.message})
        }
    },
}

module.exports = authCtrl