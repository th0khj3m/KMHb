import React from "react";
import {
  Box,
  Grid,
  Button,
  Paper,
  IconButton,
  Typography,
  Chip,
  Container,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Star, Create as CreateIcon } from "@mui/icons-material";

export default function Reviews() {
  return (
    <Container maxWidth="xl">
      <Grid container mt="30px">
        <Grid item md={3} textAlign={"center"}>
          <Button
            variant="contained"
            startIcon={<CreateIcon />}
            sx={{ bgcolor: "black", fontWeight: "bold", borderRadius: "20px" }}
          >
            WRITE REVIEW
          </Button>
        </Grid>
        <Grid item md={9}>
          {Array.from({ length: 4 }).map((index) => (
            <Paper elevation={3} sx={{ mb: 4 }}>
              <Box p={"15px"}>
                <Grid container ml={"-8px"}>
                  <Grid item>
                    <IconButton>
                      <Avatar
                        alt="user-profile"
                        src=""
                        sx={{ width: 47, height: 47 }}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Box display={"flex"} flexDirection={"column"}>
                      <Typography fontWeight={"bold"} fontSize={"20px"}>
                        A review by user
                      </Typography>
                      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                        <Chip
                          icon={<Star color="common.white" />}
                          label={"8.4"}
                          size="small"
                          sx={{
                            color: "white",
                            bgcolor: "#0DB597",
                            borderRadius: "6px",
                          }}
                        />
                        <Typography>Written by user on date</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box>
                  <Typography component={"p"} mt={"10px"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
