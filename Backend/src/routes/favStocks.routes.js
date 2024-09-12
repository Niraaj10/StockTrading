import { Router } from 'express'
import { verfiyJWT } from '../middleware/auth.mw.js'
import { addToFavoriteStock, getFavStocks, getStock, removeFromFavoriteStock } from '../controllers/favoriteStock.ctrls.js';


const router = Router();

// router.use(verfiyJWT)

router.route('/getFavorites').get(verfiyJWT, getFavStocks)

router.route('/getStock/:stock').get(verfiyJWT, getStock)

router.route('/addFavoriteStock').post(verfiyJWT, addToFavoriteStock)

router.route('/removeFavoriteStock').delete(verfiyJWT, removeFromFavoriteStock)





export default router