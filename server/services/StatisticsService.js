import StatisticsModel from "../models/statistics.js";
const StatisticsModelInstance = new StatisticsModel();

export default class StatisticService {
  async fetchTotalOvertime() {
    try {
      const results = await StatisticsModelInstance.findTotalOvertime();
      return results;
    } catch (err) {
      throw err;
    }
  }

  async fetchTodayRatings() {
    try {
      const results = await StatisticsModelInstance.findTodayRatings();
      return results;
    } catch (err) {
      throw err;
    }
  }

  async fetchTodayReviews() {
    try {
      const results = await StatisticsModelInstance.findTodayReviews();
      return results;
    } catch (err) {
      throw err;
    }
  }

  async fetchTodayRegistrations() {
    try {
      const results = await StatisticsModelInstance.findTodayRegistrations();
      return results;
    } catch (err) {
      throw err;
    }
  }
}
