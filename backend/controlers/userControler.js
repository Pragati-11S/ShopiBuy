import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    
    const {email, password} = req.body

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))){
         res.json({
             _id: user._id,
             name:user.name,
             address:user.address,
             pincode:user.pincode,
             phonenumber:user.phonenumber,
             email: user.email,
             isAdmin: user.isAdmin,
             token:generateToken(user._id)
         })
    
    }else{
        res.status(401)
        throw new Error('Invalid email or password');
    }
    
    
})



// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    
    const {name,address,pincode,phonenumber,email, password} = req.body

    const userExists = await User.findOne({ email })

   if(userExists){
       res.status(400)
       throw new Error('User already exists');
   }

   const user = await User.create({
        name,
         
        address,
        pincode,
        phonenumber,
        email,
        password,
   })
   
   if(user){
    res.status(201).json({
        _id: user._id,
        name: user.name,
        address: user.address,
        pincode: user.pincode,
        phonenumber:user.phonenumber,
        email: user.email,
        isAdmin: user.isAdmin,
        token:generateToken(user._id)
    })
   }else{
        res.status(400)
        throw new Error('Invalid user data')
   }
    
})



// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
        _id: user._id,
        name: user.name,
        address: user.address,
        pincode: user.pincode,
        phonenumber:user.phonenumber,
        email: user.email,
        isAdmin: user.isAdmin,
        
    })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
    
    
})


// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password || user.password
        }

        const updatedUser = await user.save()
            res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            address: updatedUser.address,
            pincode: updatedUser.pincode,
            phonenumber:updatedUser.phonenumber,
             email: updatedUser.email,
             isAdmin: updatedUser.isAdmin,
             token:generateToken(updatedUser._id)
        })

    }else{
        res.status(404)
        throw new Error('User not found')
    }
    
    
})

// @desc Update user user
// @route PUT /api/users/:id
// @access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name
        user.address = req.body.name || user.address
        user.pincode = req.body.name || user.pincode
        user.phonenumber = req.body.name || user.phonenumber
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()
            res.json({
            _id: updatedUser._id,
             name: updatedUser.name,
             address: updatedUser.address,
             pincode: updatedUser.pincode,
             phonenumber: updatedUser.phonenumber,
             email: updatedUser.email,
             isAdmin: updatedUser.isAdmin,
            
            })

    }else{
        res.status(404)
        throw new Error('User not found')
    }
    
    
})

// @desc Get All users
// @route GET /api/users
// @access Private/admin
const getUsers = asyncHandler(async (req, res) => {
    
    const users = await User.find({})
    res.json(users)

    
    
})
// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/admin
const getUserByID = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
        console.log(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }

    
    
})
// @desc Delete User
// @route DELETE /api/users/:id
// @access Private/admin
const deleteUser = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message : 'User removed'})
    }else{
        res.status(404)
        throw new Error('User not found')
    }
    
    
})



export { authUser, getUserProfile, registerUser, updateUserProfile,getUsers,deleteUser,getUserByID,updateUser}