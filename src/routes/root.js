import Header from "../components/header";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import { Box, Container, Typography } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

export const clampStyles = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  WebkitLineClamp: 2, // Limit to 2 lines
};

export const Img = styled("img")({
  display: "block",
  margin: "auto",
  maxWidth: "100%",
  maxHeight: "100%",
});

export const ModalContainer = styled(Container)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
});

export const WhiteTypography = styled(Typography)({
  color: "#fff",
});

const theme = createTheme({
  palette: {
    main: "#0DB597",
    secondary: {
      main: "#000",
    },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#c3c3c3",
          opacity: "0.4",
        },
      },
    },
  },
  typography: {
    details_info: {
      fontWeight: "600",
      color: "#41A58D", // Your desired color for release date
    },
    details_banner: {
      color: "#fff",
    },
  },
});

export default function Root() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        display={"grid"}
        gridTemplateRows={"auto 1fr auto"}
        minHeight={"100vh"}
        alignItems={"center"}
      >
        <Header />
        <Outlet />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
