import { Router } from 'express'
import { loginUser, logoutUser, registerUser } from '../controllers/user.ctrls.js'
import { verfiyJWT } from '../middleware/auth.mw.js'


const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.route('/logout').post(verfiyJWT, logoutUser)

export default router