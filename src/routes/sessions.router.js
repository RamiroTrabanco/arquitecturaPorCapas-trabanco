import {Router} from "express"
import passport from "passport"

const router = Router()

router.get("/current", passport.authenticate("jwt", {session:false}), (req, res)=>{
    res.send(req.user)
})

export default router