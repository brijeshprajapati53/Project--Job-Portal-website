import userModels from "../models/userModels.js";

export const registerController = async(req,res,next) => {

    
        const {name,email,password} = req.body;

        //valid
        if(!name){
            next("Name is required");
        }
        if(!email){
            next("Email is required");

        }
        if(!password){
            next("Password is required greater than 6 chracter");

        }

        const existingUser = await userModels.findOne({email});

        if(existingUser){
            
            next("Email Already Register Please Login");
        }

        const user = await userModels.create({name,email,password})

     //token
      const token = user.createJWT();

        res.status(201).send({
            success:true,
            message:"User created successfully",
            user:{
                name:user.name,
                lastName:user.lastName,
                email:user.email,
                location:user.location,
            },
            token,
        }); 

}

export const loginController = async (req,res,next) => {

    const {email,password} = req.body;

    //validation
    if(!email || !password){
        next('Please Provide all fields')
    }

    //find user by email
    const user = await userModels.findOne({email}).select("+password");
    if(!user){
        next('Invalid Username or Password')
    }

    //check password
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        next('Invalid Username or Password');
    }
    
    user.password = undefined;

    const token = user.createJWT()
    res.status(200).json({
        success:true,
        message:'Login Successfully',
        user,
        token,
    })
};