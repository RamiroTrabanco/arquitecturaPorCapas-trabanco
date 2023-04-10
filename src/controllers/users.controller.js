import ProductManager from "../dao/mongoManagers/ProductManager.js"
import passport from "passport";

const productManager = new ProductManager()

export const registerUserController = async (req, res)=>{
    const newUser = await usersManager.createUser(req.body)
    const token = generateToken(newUser)
    res.cookie("token", token)
    if(newUser){
        res.redirect("/views")
    } else {
        res.redirect("/views/registerError")
    }
}

export const logoutController = async (req,res)=>{
    req.session.destroy(error=>{
        if(error){console.log(error)}
        res.redirect("/views")
    })
}