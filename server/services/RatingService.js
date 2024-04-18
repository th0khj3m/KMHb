import createError from "http-errors";
import RatingModel from "../models/rating.js";
const RatingModelInstance = new RatingModel();

export default class RatingService {
  async rate(data) {
    try {
      const createdRating = await RatingModelInstance.create(data);
      return {
        success: true,
        data: createdRating,
      };
    } catch (err) {
      return {
        success: false,
        error: err.messsage,
      };
    }
  }

  async loadRatings(user_id) {
    try {
      const ratings = await RatingModelInstance.find(user_id);
      return ratings;
    } catch (err) {
      throw err;
    }
  }
}
