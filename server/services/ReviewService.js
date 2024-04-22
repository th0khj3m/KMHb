import createError from "http-errors";
import ReviewModel from "../models/review.js";
const ReviewModelInstance = new ReviewModel();

export default class ReviewService {
  async create(data) {
    try {
      const reviews = await ReviewModelInstance.create(data);
      return reviews;
    } catch (err) {
      throw err;
    }
  }

  async loadReviews(movie_id) {
    try {
      const reviews = await ReviewModelInstance.find(movie_id);
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

  async update(id, data) {
    try {
      const review = await ReviewModelInstance.update(id, data);
      return review;
    } catch (err) {
      throw err;
    }
  }

  async remove(id) {
    try {
      const review = await ReviewModelInstance.delete(id);
      return review;
    } catch (err) {
      throw err;
    }
  }
}
