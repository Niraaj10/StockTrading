import { Router } from 'express'
import { loginUser, logoutUser, registerUser, updateAccountDetails } from '../controllers/user.ctrls.js'
import { verfiyJWT } from '../middleware/auth.mw.js'


const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.route('/logout').post(verfiyJWT, logoutUser)
router.route('/updateuser').patch(verfiyJWT, updateAccountDetails)


export default router