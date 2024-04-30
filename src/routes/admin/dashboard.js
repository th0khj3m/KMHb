import React, { useEffect, useState } from "react";
import { Typography, Stack, Box, Grid, Container } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import {
  fetchTotalOvertime,
  fetchTodayRegistrations,
  fetchTodayRatings,
  fetchTodayReviews,
} from "../../apis/statistics";
import { DashboardBox } from "../root";

ChartJS.register(...registerables);

export default function Dashboard() {
  //   const user = useSelector((state) => state.user);
  const [totalOvertime, setTotalOvertime] = useState([]);
  const [todayRegistrations, setTodayRegistrations] = useState();
  const [todayRatings, setTodayRatings] = useState([]);
  const [todayReviews, setTodayReviews] = useState([]);

  const formatDate = (timePeriod) => {
    const date = new Date(timePeriod);

    // Format the date into a readable format (e.g., "Apr 20, 2024")
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalOvertimeResponse = await fetchTotalOvertime();
        setTotalOvertime(totalOvertimeResponse);
        const todayRegistrationsResponse = await fetchTodayRegistrations();
        setTodayRegistrations(
          todayRegistrationsResponse.length > 0
            ? todayRegistrationsResponse[0].total_registrations
            : 0
        );
        const todayRatingsResponse = await fetchTodayRatings();
        setTodayRatings(
          todayRatingsResponse.length > 0
            ? todayRatingsResponse[0].total_ratings
            : 0
        );
        const todayReviewsResponse = await fetchTodayReviews();
        setTodayReviews(
          todayReviewsResponse.length > 0
            ? todayReviewsResponse[0].total_reviews
            : 0
        );
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Create a Set to store unique time_period values
  const uniqueTimePeriods = new Set();

  // Iterate over totalOvertime and add unique time_period values to the Set
  totalOvertime.forEach((item) => {
    uniqueTimePeriods.add(item.time_period);
  });

  // Convert the Set back to an array of unique time_period values
  const uniqueTimePeriodArray = Array.from(uniqueTimePeriods);

  const chartData = {
    labels: uniqueTimePeriodArray.map((timePeriod) => formatDate(timePeriod)),
    datasets: [
      { label: "Users", data: [] },
      { label: "Ratings", data: [] },
      { label: "Reviews", data: [] },
    ],
  };

  // Populate datasets with counts from totalOvertime
  totalOvertime.forEach((item) => {
    switch (item.type) {
      case "user":
        chartData.datasets[0].data.push(item.count);
        break;
      case "rating":
        chartData.datasets[1].data.push(item.count);
        break;
      case "review":
        chartData.datasets[2].data.push(item.count);
        break;
      default:
        break;
    }
  });

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Total Over Time",
        font: {
          size: 20,
        },
      },
    },
  };
  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
      <Typography variant="h5" fontWeight="bold" component={"h1"} mb={2}>
        Welcome lmao user{" "}
      </Typography>

      <Grid container>
        <Grid item md={8}>
          <Box>
            <Line options={options} data={chartData} />
          </Box>
        </Grid>

        <Grid item md={4}>
          <Stack
            direction={"row"}
            useFlexGap
            spacing={3}
            flexWrap={"wrap"}
            mr={"15px"}
          >
            <DashboardBox bgcolor={"#cdf5f5"}>
              <Typography>Today's Ratings</Typography>
              <Typography>{todayRatings}</Typography>
            </DashboardBox>
            <DashboardBox bgcolor={"#40d6d7"}>
              <Typography>Today's Reviews</Typography>
              <Typography>{todayReviews}</Typography>
            </DashboardBox>
            <DashboardBox bgcolor={"#82e7c1"}>
              <Typography>Today's Registrations</Typography>
              <Typography>{todayRegistrations}</Typography>
            </DashboardBox>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
