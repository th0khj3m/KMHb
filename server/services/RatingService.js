import createError from "http-errors";
import RatingModel from "../models/rating.js";
const RatingModelInstance = new RatingModel();

export default class RatingService {
  async rate(data) {
    try {
      const rating = await RatingModelInstance.create(data);
      return rating;
    } catch (err) {
      throw err;
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

  async get(data) {
    try {
      const rating = await RatingModelInstance.findOneByUser(data);
      return rating;
    } catch (err) {
      throw err;
    }
  }

  async updateRating(data) {
    try {
      const rating = await RatingModelInstance.update(data);
      return rating;
    } catch (err) {
      throw err;
    }
  }

  async removeRating(data) {
    try {
      const rating = await RatingModelInstance.delete(data);
      return rating;
    } catch (err) {
      throw err;
    }
  }
}
