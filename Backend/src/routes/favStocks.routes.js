import { Router } from 'express'
import { verfiyJWT } from '../middleware/auth.mw.js'
import { addToFavoriteStock, getFavStocks, getStock, removeFromFavoriteStock } from '../controllers/favoriteStock.ctrls.js';


const router = Router();

router.use(verfiyJWT)

router.route('/getFavorites').get(getFavStocks)

router.route('/getStock/:stock').get(getStock)

router.route('/addFavoriteStock').post(addToFavoriteStock)

router.route('/removeFavoriteStock').delete(removeFromFavoriteStock)



export default router