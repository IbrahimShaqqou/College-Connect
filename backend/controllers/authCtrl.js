const Users = require("../middlewares/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authCtrl = {
    register: async(req,res)=>{
        try{
            const {fullname, username, email, password, gender} = req.body;

            const newUsername = username.toLowerCase().replace(/ /g,'');
            console.log(newUsername);

            const user_name = await Users.findOne({username: newUsername})
           
            if (user_name) return res.status(400).json({msg: 'this username already exists'})

            const Email = await Users.findOne({email: email})
            if (Email)  return res.status(400).json({msg: 'this email already exists'})

            if (password.length < 6) return res.status(400).json({msg: "password must be at least 6 characters long."})

            const passwordHash = await bcrypt.hash(password,13);

            const newUser = new Users({
                fullname: fullname,
                username: newUsername,
                email: email,
                password: passwordHash,
                gender: gender,
            })

            

            const access_token = createAccessToken({id: newUser._id});
            const refresh_token = createRefreshToken({id: newUser._id});


            res.cookie('refreshtoken',refresh_token,{
                httpOnly: true,
                path:"/api/refresh_token",
                maxAge: 24*30*60*60*1000
            })
            await newUser.save();


            res.json({
                msg:"register success",
                access_token,
                user:{
                ...newUser._doc,
                password:''
                }
                
            })

        }catch(err) {
            res.status(500).json({msg: err.message})
        }
    },
    login: async(req,res)=>{
        try{
            const {email , password} = req.body;

            const user = await Users.findOne({email})
            .populate("friends following" , "-password")

            if(!user) return res.status(400).json({msg: 'User does not exist'})

            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch) return res.status(400).json({msg: 'User password is incorrect.'})

            const access_token = createAccessToken({id: user._id});
            const refresh_token = createRefreshToken({id: user._id});


            res.cookie('refreshtoken',refresh_token,{
                httpOnly: true,
                path:"/api/refresh_token",
                maxAge: 24*30*60*60*1000
            })


            res.json({
                msg:"login success",
                access_token,
                user:{
                ...user._doc,
                password:''
                }
                
            })


        }catch(err) {
            res.status(500).json({msg: err.message})
        }
    },
    logout: async(req,res)=>{
        try{
            res.clearCookie('refreshtoken',{path:"/api/refresh_token"})
            res.json({msg:"Logged out"})
        }catch(err) {
            res.status(500).json({msg: err.message})
        }
    },
    generateAccessToken: async(req,res)=>{
        try{
            const rf_token = req.cookies.refreshtoken;
            console.log(rf_token)

            if(!rf_token) return res.status(400).json({msg:"please login now"})

            jwt.verify(rf_token, process.env.REFRESHTOKENSECRET, async(err, result)=>{
                if(err) return res.status(400).json({msg:"Please login now"})
                
                const user = await Users.findById(result.id).select("-password")
                .populate("friends following")

                if(!user) return res.status(400).json({msg:"user does not exist"})

                const access_token = createAccessToken({id: result._id});

                res.json({
                    access_token,
                    user
                })
                
            })
        }catch(err) {
            res.status(500).json({msg: err.message})
        }
    },
}

const createAccessToken = (  payload) =>{
    return jwt.sign(payload, process.env.ACCESSTOKENSECRET, {expiresIn:"1d"})
}
const createRefreshToken = ( payload) =>{
    return jwt.sign(payload, process.env.REFRESHTOKENSECRET, {expiresIn: "30d"})
}
module.exports = authCtrl