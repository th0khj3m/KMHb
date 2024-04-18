import createError from "http-errors";
import ReviewModel from "../models/review.js";
const ReviewModelInstance = new ReviewModel();

export default class ReviewService {
  async list() {
    try {
      const reviews = await ReviewModelInstance.find();
      return reviews;
    } catch (err) {
      throw err;
    }
  }

  async get(id) {
    try {
      const review = await ReviewModelInstance.findOne(id);
      if (!review) {
        throw createError(404, "Review does not exist");
      }
      return review;
    } catch (err) {
      throw err;
    }
  }

  async update(id) {
    
  }

  async remove(id) {

  }
}
