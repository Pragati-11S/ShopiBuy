import express from 'express'
const router = express.Router()
import { addorderitems, GetMyOrders, getOrderById, GetOrders, updateOrderToPaid,updateOrderToDelivered } from '../controlers/orderControler.js'
import {protect,admin} from '../middleware/authMiddleware.js'


router.route('/').post(addorderitems).get(admin,GetOrders)
router.route('/myorders').get(GetMyOrders) 

router.route('/:id').get(getOrderById) 
router.route('/:id/pay').put(updateOrderToPaid) 

router.route('/:id/deliver').put(admin,updateOrderToDelivered) 




export default router