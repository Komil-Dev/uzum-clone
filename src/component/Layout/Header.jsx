import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  Button,
  InputBase,
  Modal,
  Stack,
  TextField,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import GetGoods from "../../hooks/getGoods";
import searchContext from "../../modules/context/searchContext";
import customIcon from "../Layout/image.jpg";
import BagModal from "./bagModal";
import SearchInput from "./searchInput";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: `1px solid gray`,
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
  width: "65%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "gray", // Setting icon color to gray
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "black", // Setting input text color to black
    "&:focus": {
      outline: "none",
    },
  },
}));

const Logo = styled("img")(({ theme }) => ({
  width: "auto",
  height: "60px",
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  "&:hover": {
    cursor: "default",
  },
}));

const NavBarButton = styled("button")(({ theme }) => ({
  background: "none",
  border: "none",
  color: "gray", // Setting navbar button color to gray
  marginLeft: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  padding: "8px",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
}));
const ButtonText = styled(Typography)({
  marginLeft: "5px",
});

const names = [
  "Muddatli to'lov",
  "Yozgi savdo",
  "Uyda salqinlik",
  "Hovuzlar",
  "Electronika",
  " Maishiy Texnika",
  "Kiyim",
  "Poyabzallar",
  "Akssesuarlar",
  "Go'zallik va Parvarish",
  "Smartfonlar",
  "Yana",
];

const SecondNavBarButton = styled("div")(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "0%",
    height: "2px",
    backgroundColor: "black",
    transition: "width 1s ease",
    gap: "20px",
  },
  "&:hover::after": {
    width: "100%", // Expand width to 100% on hover
  },
}));

export default function SearchAppBar() {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const { res } = GetGoods();
  const numberOfGoods = res.length; // Get the number of goods from the response

  const openModal = () => {
    setIsOpened(true);
  };

  const changeSearchText = (text) => {
    setSearchText(text);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <searchContext.Provider value={{ searchText, changeSearchText }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "white", color: "black", boxShadow: "none" }}>
          <Toolbar sx={{ justifyContent: "space-between", flexWrap: "nowrap" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link to={"/"}>
                <Logo alt="Custom Icon" src={customIcon} />
              </Link>

              <NavBarButton
                sx={{
                  width: "100px",
                  bgcolor: "#F0F8FF",
                  height: "6vh",
                  textAlign: "center",
                  color: "gray", // Setting navbar button color to gray
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "17px",
                  color: "Darkviolet",
                }}
              >
                Katalog
              </NavBarButton>
            </Box>
            <SearchInput />

            <NavBarButton>
              <PersonOutlinedIcon />
              <ButtonText onClick={handleOpen} variant="body1">
                Kirish
              </ButtonText>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropComponent={Backdrop}
                BackdropProps={{
                  sx: { backdropFilter: "blur(1px)" }, // Add blur effect to the backdrop
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    borderRadius: "15px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    width: "25%",
                    height: "55vh",
                    padding: "1%", // Add padding for better spacing
                    textAlign: "center",
                    paddingTop: "5%",
                  }}
                >
                  <Typography id="modal-modal-title" variant="h5" component="h2">
                    Telefon raqamini kiriting
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Tasdiqlash kodini SMS orqali yuboramiz
                  </Typography>

                  {/* Telephone Input */}
                  <TextField
                    placeholder="+998 00 000-00-00"
                    variant="outlined"
                    sx={{ mt: 2, width: "90%", height: "4vh" }} // Adjusted height to 4vh
                  />

                  <Button variant="contained" sx={{ mt: 6, width: "90%", bgcolor: "#8A2BE2" }}>
                    Kodni Olish
                  </Button>

                  <Typography sx={{ mt: 6, fontSize: "0.885rem", width: "95%" }}>
                    Avtotizatsiyadan o'tish orqali siz shaxsiy ma'lumotlarni qayta ishlash siyosatiga rozilik bildirasiz
                  </Typography>
                </Box>
              </Modal>
            </NavBarButton>

            <Link to="/favorites" style={{ textDecoration: "none" }}>
              <NavBarButton>
                <FavoriteBorderOutlinedIcon />
                <ButtonText variant="body1">Saralangan</ButtonText>
              </NavBarButton>
            </Link>
            <Stack
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
              sx={{
                height: "40px",
                width: "100px",
                ":hover": { bgcolor: "white" },
                position: "relative",
                alignItems: "center",
              }}
            >
              <Link to="/bag" style={{ textDecoration: "none" }}>
                <NavBarButton>
                  <ShoppingCartOutlinedIcon />

                  <ButtonText variant="body1">Savat</ButtonText>
                  <Badge sx={{ background: "violet" }} badgeContent={numberOfGoods} color="secondary"></Badge>
                </NavBarButton>
              </Link>

              {isShown && numberOfGoods >= 1 && (
                <div style={{ position: "absolute", bottom: 0, left: "-207%" }}>
                  <div
                    style={{
                      position: "absolute",
                      zIndex: "40",
                      display: "flex",
                      width: "420px",
                      backgroundColor: "white",
                      flexDirection: "column",
                    }}
                  >
                    {res && res.map((item) => <BagModal key={item.id} item={item} />)}
                    <div>
                      <Link to="/bag">
                        <button
                          style={{
                            width: "90%",
                            height: "4vh",
                            margin: "0 auto",
                            marginLeft: "5%",
                            backgroundColor: "#8A2BE2",
                            marginTop: "5%",
                            border: "none",
                            borderRadius: "10px",
                            color: "white",
                          }}
                        >
                          Buyutmani rasmiylashtirish
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </Stack>
          </Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "25px",
              paddingLeft: "2%",
              marginBottom: "1px",
            }}
          >
            {names.map((name, index) => (
              <SecondNavBarButton key={index}>
                <Typography sx={{ color: "gray" }} variant="body1">
                  {name}
                </Typography>
              </SecondNavBarButton>
            ))}
          </Box>
        </AppBar>
      </Box>
    </searchContext.Provider>
  );
}
