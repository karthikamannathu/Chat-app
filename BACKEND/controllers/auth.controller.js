import User from "../models/UserModels.js"
import generateToken from "../utilts/generateToken.js"
import bcrypt from 'bcryptjs'

export const signup = async (req,res) => {
    try{
const { fullName,userName,password,confirPassword,gender} = req.body
 if(password !== confirPassword){
return res.status(400).json({error:"Password don't match"}) 
    }

const user = await User.findOne({userName})

if(user){
   
    return res.status(400).json({error:"Username alredy exists"}) 
}

// HASH PASSWORD HERE


//AVATHAR API PASS
const boyProfilePic ='https://avatar.iran.liara.run/public/boy'
const girlProfilePic ='https://avatar.iran.liara.run/public/girl'

const newUser = new User ({
  fullName,
  userName,
  password,
  gender,
  profilePic:gender === 'male'? boyProfilePic :  girlProfilePic
})

if(newUser) {
     // GENERATE JWT TOKEN HERE AND SET COOKIES
     
     generateToken(newUser._id,res)
    await newUser.save();
res.status(201).json({
   _id: newUser._id,
   fullName:newUser.fullName,
   username:newUser.userName,
   profilePic:newUser.profilePic
})
}else{
    res.status(400).json({error: " Invalid user data"})
}
} catch (error){
 console.log("error in sign up controller ",error.message)
 res.status(500).json({error:"Internal servern Error"})
    }
};

export const login = async (req,res) => {
   try {
    const {username,password} = req.body;
    const user = await User.findOne({username});
      const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");
   
      if (!user || !isPasswordCorrect){
        return res.status(400).json({error:"Invaild username or password "})
      }

      generateToken(user._id,res);
      res.status(200).json({
        _id: user._id,
        fullname: user.fullName,
        username:user.userName,
        profilePic:user.profilePic
    })
   
    }catch (error) {
    
   console.log("Errorn in login controller",error.messages)
   res.status(500).json({error:"internal server error"})
}};

export const logout = () => {
    console.log("logout");
}




