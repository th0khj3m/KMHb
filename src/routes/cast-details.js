import React from "react";

import {
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  Link,
} from "@mui/material";
import { useParams } from "react-router-dom";

import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { Img } from "./root";

const cast = {
  adult: false,
  also_known_as: [
    "티모시 샬라메",
    "ტიმოთი შალამე",
    "蒂莫西·柴勒梅德",
    "Τιμοτέ Σαλαμέ",
    "טימותי שאלאמה",
    "蒂莫西·查拉梅",
    "提摩西·夏勒梅",
    " ტიმოთი შალამე",
    "ティモシー・シャラメ",
    "ティム",
    "ティミー",
    "Тимоти Шаламе ",
  ],
  biography:
    "Timothée Hal Chalamet (born December 27, 1995) is an American actor.\n\nHe began his career appearing in the drama series Homeland in 2012. Two years later, he made his film debut in the comedy-drama Men, Women & Children and appeared in Christopher Nolan's science fiction film Interstellar. He came into attention in Luca Guadagnino's coming-of-age film Call Me by Your Name (2017). Alongside supporting roles in Greta Gerwig's films Lady Bird (2017) and Little Women (2019), he took on starring roles in Beautiful Boy (2018) and Dune (2021).",
  birthday: "1995-12-27",
  deathday: null,
  gender: 2,
  homepage: null,
  id: 1190668,
  imdb_id: "nm3154303",
  known_for_department: "Acting",
  name: "Timothée Chalamet",
  place_of_birth: "Manhattan, New York City, New York, USA",
  popularity: 130.481,
  profile_path: "/BE2sdjpgsa2rNTFa66f7upkaOP.jpg",
  external_ids: {
    freebase_mid: "/m/0p2n1fp",
    freebase_id: null,
    imdb_id: "nm3154303",
    tvrage_id: null,
    wikidata_id: "Q19877770",
    facebook_id: null,
    instagram_id: "tchalamet",
    tiktok_id: null,
    twitter_id: "RealChalamet",
    youtube_id: null,
  },
  movie_credits: [
    {
      adult: false,
      backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
      genre_ids: [12, 18, 878],
      id: 157336,
      original_language: "en",
      original_title: "Interstellar",
      overview:
        "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
      popularity: 176.974,
      poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      release_date: "2014-11-05",
      title: "Interstellar",
      video: false,
      vote_average: 8.432,
      vote_count: 34054,
      character: "Young Tom",
      credit_id: "52fe4bbf9251416c910e480d",
      order: 13,
    },
  ],
  images: [
    {
      aspect_ratio: 0.666,
      height: 1685,
      iso_639_1: null,
      file_path: "/7nNdD5K9egTzXntXWyoiPBqwlcm.jpg",
      vote_average: 4.906,
      vote_count: 241,
      width: 1122,
    },
  ],
};

export default function CastDetails() {
  const { castId } = useParams(); 
  const { movie_credits } = cast;
  const { images } = cast;

  const actorDetails = [
    { title: "Facebook", value: cast.external_ids.facebook_id },
    { title: "Twitter", value: cast.external_ids.twitter_id },
    { title: "Instagram", value: cast.external_ids.instagram_id },
    { title: "Known For", value: cast.known_for_department },
    { title: "Gender", value: cast.gender === 2 ? "Male" : "Female" },
    { title: "Birthday", value: cast.birthday },
    { title: "Day of Death", value: cast.deathday },
    { title: "Place of Birth", value: cast.place_of_birth },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: "20px" }}>
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
              if (
                ["Facebook", "Twitter", "Instagram"].includes(detail.title) &&
                detail.value
              ) {
                const key =
                  cast.external_ids[`${detail.title.toLowerCase()}_id`];
                return (
                  <IconButton
                    key={detail.title}
                    component={Link}
                    href={`https://www.${detail.title.toLowerCase()}.com/${key}`}
                    target="_blank"
                  >
                    {detail.title === "Facebook" ? (
                      <Facebook fontSize="large" />
                    ) : detail.title === "Instagram" ? (
                      <Instagram fontSize="large" />
                    ) : detail.title === "Twitter" ? (
                      <Twitter fontSize="large" />
                    ) : null}
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
              if (
                detail.value === null ||
                ["Facebook", "Instagram", "Twitter"].includes(detail.title)
              ) {
                return null;
              }

              // Render other details as usual
              return (
                <Box key={detail.title}>
                  <Typography fontWeight={"bold"}>{detail.title}</Typography>
                  <Typography>{detail.value}</Typography>
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid item md={9}>
          <Box display={"flex"} flexDirection={"column"} gap="30px">
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
                {Array.from({ length: 7 }).map((index, _) => (
                  <Box
                    key={index}
                    textAlign={"center"}
                    flexShrink={0}
                    width={"15%"}
                    mb={"15px"}
                  >
                    <Img
                      src={`https://image.tmdb.org/t/p/w500${movie_credits[0].poster_path}`}
                      sx={{ borderRadius: "8px" }}
                    />
                    <Typography>{movie_credits[0].title}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box mb={"60px"}>
              <Typography variant="h6" component="h2" fontWeight={"bold"}>Media</Typography>
              <Box display="flex" gap={"10px"} overflow={"auto"} mt="5px">
                {Array.from({ length: 7 }).map((index, _) => (
                  <Box key={index} width={"15%"} flexShrink={0} mb="30px">
                    <Img
                      src={`https://image.tmdb.org/t/p/w500${images[0].file_path}`}
                      sx={{borderRadius:"8px"}}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
