import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js"

// Get all Hotels
export const getHotels = async (req, res, next) => {
  const { min, max, limit: queryLimit, featured, city, ...others } = req.query;
  try {
    let query = {};
    // Nutze queryLimit, falls vorhanden, sonst Standardwert 10
    const limit = parseInt(queryLimit) || 10;

    // Check if any query parameters are provided
    if (
      min !== undefined ||
      max !== undefined ||
      featured === "true" ||
      city !== undefined ||
      Object.keys(others).length > 0
    ) {
      if (min !== undefined || max !== undefined) {
        query.cheapestPrice = {};

        if (min !== undefined) {
          query.cheapestPrice.$gte = parseInt(min) || 1;
        }

        if (max !== undefined) {
          query.cheapestPrice.$lte = parseInt(max) || 999;
        }
      }

      if (featured === "true") {
        query.featured = true;
      } else if (featured === "false") {
        query.featured = false;
      }

      if (city !== undefined) {
        query.city = city;
      }

      const hotels = await Hotel.find(query).limit(limit);
      res.status(200).json(hotels);
    } else {
      const hotels = await Hotel.find({}).limit(limit);
      res.status(200).json(hotels);
    }
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
};

// count hotels by city
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
// count Hotels by type
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// Get hotel by ID
export const getHotelById = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotel.findById(hotelId);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// Create a new Hotel
export const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body);
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (err) {
    next(err);
  }
};

// Update Hotel by ID
export const updateHotel = async (req, res, next) => {
  const hotelId = req.params.id;
  const updatedHotelData = req.body;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      updatedHotelData,
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

// Delete Hotel by ID
export const deleteHotel = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    await Hotel.findByIdAndRemove(hotelId);
    res.status(204).send("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req,res,next) => {

  try {
    const hotel = await Hotel.findById(req.params.id);
    const roomsList = await Promise.all(hotel.rooms.map(room => {
      return Room.findById(room)
    })) 
    res.status(200).json(roomsList)
  } catch (err) {
    next(err);
  }
}
