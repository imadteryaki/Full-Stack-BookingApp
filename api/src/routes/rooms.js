import express from "express";
import { createRoom,
         getRooms, 
         getRoomById, 
         updateRoom, 
         deleteRoom, 
         updateRoomAvailability} from "../controller/roomsController.js";
import { verifyAdmin} from "../utils/verifyToken.js";
         
const router = express.Router();

router.route('/')
.get(getRooms)

router.route('/:hotelid')
.post(verifyAdmin,createRoom)

router.route('/:id')
.get(getRoomById)
.put(verifyAdmin,updateRoom)

router.route('/:id/:hotelid')
.delete(verifyAdmin,deleteRoom);

router.route("/availability/:id")
.put(updateRoomAvailability)


export default router;