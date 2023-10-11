import express from "express";
import { createHotel,
         getHotels, 
         getHotelById, 
         updateHotel, 
         deleteHotel, 
         countByCity,
         countByType,
         getHotelRooms} from "../controller/hotelsController.js";
import { verifyAdmin} from "../utils/verifyToken.js";
         
const router = express.Router();

router.route('/')
.get(getHotels)
.post(verifyAdmin,createHotel);

router.route('/countByCity')
.get(countByCity)

router.route('/countByType')
.get(countByType)

router.route('/hotel/:id')
.get(getHotelById)
.put(verifyAdmin,updateHotel)
.delete(verifyAdmin,deleteHotel);

router.route("/:id/rooms")
.get(getHotelRooms);


export default router;