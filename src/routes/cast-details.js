import React, { useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCastDetails } from "../store/cast/cast.actions";
import { Img } from "./root";
import { clampStyles } from "./root";

export default function CastDetails() {
  const dispatch = useDispatch();
  const { castId } = useParams();
  const { castDetails: cast, loading } = useSelector((state) => state.cast);
  const { movieImages, movieCredits, externalIds } = cast || {};
  const filteredCast = movieCredits?.cast.filter((movie) => movie.poster_path); // Filter movies with valid poster_path

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCastDetails(castId));
    };

    fetchData();
  }, [dispatch, castId]);

  const social = ["facebook", "twitter", "instagram"];

  const actorDetails = [
    { title: "facebook", value: externalIds?.facebook_id },
    { title: "twitter", value: externalIds?.twitter_id },
    { title: "instagram", value: externalIds?.instagram_id },
    { title: "Known For", value: cast?.known_for_department },
    { title: "Gender", value: cast?.gender === 2 ? "Male" : "Female" },
    { title: "Birthday", value: cast?.birthday },
    { title: "Day of Death", value: cast?.deathday },
    { title: "Place of Birth", value: cast?.place_of_birth },
  ];

  return (
    <>
      {!loading && (
        <Container maxWidth="xl" sx={{ my: "20px" }}>
          <Grid container>
            <Grid item md={3}>
              <Box width="90%">
                <Img
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  sx={{ borderRadius: "8px" }}
                />
              </Box>
              <Box py={"15px"}>
                {actorDetails.map((detail) => {
                  const socialLink = social.find(
                    (platform) => platform === detail.title && detail.value
                  );
                  if (socialLink) {
                    const key = externalIds[`${socialLink}_id`];
                    return (
                      <IconButton
                        key={detail.title}
                        component={MuiLink}
                        href={`https://www.${socialLink}.com/${key}`}
                        target="_blank"
                      >
                        {socialLink === "facebook" && (
                          <Facebook fontSize="large" />
                        )}
                        {socialLink === "instagram" && (
                          <Instagram fontSize="large" />
                        )}
                        {socialLink === "twitter" && (
                          <Twitter fontSize="large" />
                        )}
                      </IconButton>
                    );
                  }
                  return null; // Skip rendering if the condition is not met
                })}
              </Box>
              <Typography fontSize={"20px"} fontWeight={"bold"}>
                Personal Info
              </Typography>
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={"15px"}
                mt={"5px"}
              >
                {actorDetails.map((detail) => {
                  // Skip rendering if the field is deathday and its value is null
                  if (detail.value === null || social.includes(detail.title)) {
                    return null;
                  }

                  // Render other details as usual
                  return (
                    <Box key={detail.title}>
                      <Typography fontWeight={"bold"}>
                        {detail.title}
                      </Typography>
                      <Typography>{detail.value}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Grid>
            <Grid item md={9}>
              <Stack spacing={4}>
                <Typography variant="h4" component={"h1"} fontWeight={"800"}>
                  {cast.name}
                </Typography>
                <Box>
                  <Typography variant="h6" component="h2" fontWeight={"bold"}>
                    Biography
                  </Typography>
                  <Typography mt={"5px"}>{cast.biography}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" component="h2" fontWeight={"bold"}>
                    Known for
                  </Typography>
                  <Box display="flex" mt="5px" gap={"10px"} overflow={"auto"}>
                    {filteredCast &&
                      filteredCast.map((movie, index) => (
                        <Box
                          key={index}
                          display={"flex"}
                          flexDirection={"column"}
                          borderWidth={1}
                          flexShrink={0}
                          textAlign={"center"}
                          width={"15%"}
                          gap={"10px"}
                        >
                          <Link to={`/movies/${movie.id}`}>
                            <Img
                              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                              alt={movie.title}
                              sx={{ borderRadius: "8px" }}
                            />
                          </Link>
                          <Typography
                            mb={3}
                            variant="body2"
                            sx={{ ...clampStyles, flexGrow: 1 }}
                          >
                            {movie.title}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h6" component="h2" fontWeight={"bold"}>
                    Media
                  </Typography>
                  <Box display="flex" gap={"10px"} overflow={"auto"} mt="5px">
                    {movieImages?.profiles?.map((image, index) => (
                      <Box key={index} width={"15%"} flexShrink={0} mb="30px">
                        <Img
                          src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                          sx={{ borderRadius: "8px" }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
