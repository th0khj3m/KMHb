import Header from "../components/header";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import {
  Box,
  Button,
  Container,
  Typography,
  Menu,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { PlayCircleOutline } from "@mui/icons-material";

export const MovieOverview = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  color: "#666",
});

export const PlayButton = styled(PlayCircleOutline)(({ theme }) => ({
  color: "black",
  "&:hover": {
    color: theme.palette.main,
  },
}));

export const ArrowButton = styled(IconButton)({
  position: "absolute",
  top: "45%",
  transform: "translateY(-70%)",
  backgroundColor: "#3A3E29",
  opacity: 0.5,
  border: "1px solid white",
});

export const clampStyles = {
  overflow: "hidden",
  height: "40px",
  display: "-webkit-box",
  textOverflow: "ellipsis",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2, // Limit to 2 lines
};

export const StyledMenu = styled(Menu)(({ theme }) => ({
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  marginTop: theme.spacing(1.5),
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    marginLeft: theme.spacing(-0.5),
    marginRight: theme.spacing(1),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: theme.spacing(1.75),
    width: 10,
    height: 10,
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
}));

export const DashboardBox = styled(Box)({
  padding: "30px",
  flexGrow: 1,
  textAlign: "center",
  borderradius: "15px",
});

export const Img = styled("img")({
  display: "block",
  margin: "auto",
  maxWidth: "100%",
  maxHeight: "100%",
});

export const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: 24,
  p: 4,
};

export const WhiteTypography = styled(Typography)({
  color: "#fff",
});

export const MediaLoginButton = styled(Button)({
  height: "60px",
  width: "40px",
  backgroundColor: "white",
  border: "1px solid #EEEEEE",
  mr: "20px",
  borderradius: "20px",
  py: "10px",
  px: "20px",
  "&:hover": {
    backgroundColor: "#EEEEEE",
  },
});

export const AuthButton = styled(Button)({
  padding: "10px 20px",
  backgroundColor: "#01C6AC",
  color: "white",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  font: "16px",
  width: "300px",
  borderradius: "20px",
  "&:hover": {
    backgroundColor: "#00A099",
  },
});

export const WatchlistButton = styled(Button)({
  backgroundColor: "#2C2C2C",
  color: "#0DB597",
  "&:hover": { backgroundColor: "rgba(13, 181, 151, 0.4)" },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#0DB597",
    },
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
      >
        <Header />
        <Container component={"main"} maxWidth="xl" disableGutters>
          <Outlet />
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
