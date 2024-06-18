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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import GetGoods from "../../hooks/getGoods";
import searchContext from "../../modules/context/searchContext";

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
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      margin: "0 auto",
      textAlign: "center",
    },
  },
}));

const Logo = styled("img")(({ theme }) => ({
  width: "auto",
  height: "60px",
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  paddingLeft: "5%", // Padding left for the logo
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

const MobileButton = styled(Button)(({ theme }) => ({
  background: "none",
  color: "gray",
  marginLeft: "auto", // Align to the right side
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
          <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link to="/">
                <Logo
                  sx={{ width: "60%" }}
                  alt="Custom Icon"
                  src="data:image/svg+xml,%3csvg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_2057_199813)'%3e %3cmask id='mask0_2057_199813' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='36' height='36'%3e %3cpath d='M18 0C33 0 36 3 36 18C36 33 33 36 18 36C3 36 0 33 0 18C0 3 3 0 18 0Z' fill='white'/%3e %3c/mask%3e %3cg mask='url(%23mask0_2057_199813)'%3e %3crect width='36' height='36' fill='%23FFFF00'/%3e %3cpath d='M1.7424 8.42296C1.3915 9.57087 1.63459 10.9497 2.12075 13.7073L3.09512 19.2342C3.4556 21.2789 3.68243 22.5655 4.07004 23.4849L0 24.2027V36H4.5L29.8228 31.532C33.1937 30.9375 35.4445 27.7225 34.8501 24.351C34.5822 22.831 33.7816 21.5386 32.6742 20.6322C32.9649 20.2115 33.1912 19.7461 33.3425 19.251C33.6934 18.1031 33.4503 16.7242 32.9642 13.9666L31.9898 8.43977C31.5036 5.68212 31.2605 4.30329 30.5383 3.34464C29.9029 2.50138 29.017 1.88094 28.0074 1.57223C26.8597 1.22128 25.4811 1.46441 22.7239 1.95065L8.6088 4.43993C5.8516 4.92618 4.47301 5.16931 3.51451 5.8917C2.67139 6.52714 2.05105 7.41323 1.7424 8.42296Z' fill='%237000FF'/%3e %3cpath d='M17.9998 6.96094C17.5841 6.96094 17.1755 6.97855 16.7703 7.01378L16.7633 12.7266H19.2293V7.01378C18.8241 6.96094 18.4155 6.96094 17.9998 6.96094Z' fill='white'/%3e %3cpath d='M22.8722 19.3328C24.1644 18.0406 24.8904 16.2879 24.8904 14.4604V10.3352C23.9968 10.0367 23.0833 9.80122 22.1567 9.63061V14.4357C22.1567 17.8916 20.6912 19.6988 17.9998 19.6988C15.3084 19.6988 13.8464 17.8916 13.8464 14.4357V9.63061C12.9187 9.80166 12.0041 10.0371 11.1092 10.3352V14.4604C11.1092 16.2879 11.8351 18.0406 13.1274 19.3328C14.4196 20.625 16.1723 21.375 17.9998 21.375C19.8273 21.375 21.58 20.625 22.8722 19.3328Z' fill='white'/%3e %3cpath d='M20.4184 28.8032H21.5025V26.9742L23.1982 28.8032H24.477L22.7257 26.8911L24.338 25.0621H23.0592L21.5025 26.808V23.8983H20.4184V28.8032Z' fill='white'/%3e %3cpath d='M7.32527 25.6719C7.60325 25.2562 8.10362 24.9791 8.79858 24.9791C9.96612 24.9791 10.5221 25.7273 10.5221 26.6418V28.831H9.43795V26.8081C9.43795 26.3647 9.18776 25.9767 8.65959 25.9767C8.13142 25.9767 7.88124 26.337 7.88124 26.7804V28.831H6.7971V26.7804C6.7971 26.337 6.51911 25.9767 5.99094 25.9767C5.46277 25.9767 5.24039 26.3647 5.24039 26.8081V28.831H4.15625V26.6418C4.15625 25.7273 4.74002 24.9791 5.90755 24.9791C6.49132 24.9791 7.07508 25.2562 7.32527 25.6719Z' fill='white'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.4981 27.5009V25.0622H14.4139V25.6442C14.1915 25.2839 13.7746 24.9791 13.0518 24.9791C11.8009 24.9791 11.1615 25.949 11.1615 26.9189C11.1337 27.9165 11.8565 28.8864 12.9962 28.8864C13.6078 28.8864 14.1637 28.6093 14.4139 28.1382C14.5251 28.4431 14.8031 28.7756 15.3591 28.7756H15.9706V27.8611H15.8038C15.5814 27.9165 15.4981 27.8334 15.4981 27.5009ZM13.2742 27.972C12.6626 27.972 12.19 27.5563 12.19 26.9466C12.19 26.3647 12.6626 25.949 13.2742 25.949C13.9135 25.949 14.3583 26.3647 14.3583 26.9466C14.3861 27.5286 13.9135 27.972 13.2742 27.972Z' fill='white'/%3e %3cpath d='M16.8881 28.8033H17.9722V27.1406C17.9722 26.5032 18.4448 26.0876 19.0286 26.0876H19.7513V24.9791H19.2232C18.556 24.9791 18.0834 25.5333 17.9722 25.8659V25.0622H16.8881V28.8033Z' fill='white'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M25.6721 27.2237C25.6721 27.6394 25.8945 28.0551 26.5895 28.0551C27.2288 28.0551 27.3122 27.6671 27.3122 27.6671H28.5076C28.5076 27.6671 28.3964 28.8864 26.5895 28.8864C25.3386 28.8864 24.5324 28.1936 24.5324 26.9189C24.5324 25.6719 25.3108 24.9791 26.5617 24.9791C27.7848 24.9791 28.591 25.6719 28.591 26.9189C28.591 27.0575 28.5632 27.196 28.5632 27.196H25.6721V27.2237ZM25.6999 26.5587H27.4512C27.4512 26.2538 27.2844 25.8105 26.5895 25.8105C25.8945 25.8382 25.6999 26.2538 25.6999 26.5587Z' fill='white'/%3e %3cpath d='M31.1762 27.8611C30.8148 27.8611 30.6758 27.6948 30.6758 27.1683V25.8659H31.8434V24.9791H30.6758V24.2309H30.0921L29.0357 25.2285V25.8382H29.5917V27.3069C29.5917 28.3599 30.1199 28.8033 31.1762 28.8033H31.8434V27.8611H31.1762Z' fill='white'/%3e %3c/g%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_2057_199813'%3e %3crect width='36' height='36' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e %3c/svg%3e"
                />
              </Link>
              {isMobile && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: theme.spacing(2),
                    marginLeft: "-10%",
                    marginTop: "-1.5%",
                  }}
                >
                  <Typography variant="body1">Uzum Market</Typography>
                  <Typography variant="body1">Скачать приложение</Typography>
                </Box>
              )}
            </Box>

            {!isMobile && <SearchInput />}

            {!isMobile && (
              <>
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

                      <TextField
                        placeholder="+998 00 000-00-00"
                        variant="outlined"
                        sx={{ mt: 2, width: "90%", height: "4vh" }} // Adjusted height to 4vh
                      />

                      <Button variant="contained" sx={{ mt: 6, width: "90%", bgcolor: "#8A2BE2" }}>
                        Kodni Olish
                      </Button>

                      <Typography sx={{ mt: 6, fontSize: "0.885rem", width: "95%" }}>
                        Avtotizatsiyadan o'tish orqali siz shaxsiy ma'lumotlarni qayta ishlash siyosatiga rozilik
                        bildirasiz
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
              </>
            )}

            {/* Mobile Button moved to the end */}
            {isMobile && (
              <Button
                sx={{
                  marginLeft: "auto", // Align to the right side
                  bgcolor: "darkviolet",
                  color: "white",
                  "&:hover": {
                    bgcolor: "purple", // Change bgcolor on hover
                  },
                  width: "29%",
                  borderRadius: "10px",
                }}
              >
                Yuklash
              </Button>
            )}
          </Toolbar>

          {!isMobile && (
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
          )}
        </AppBar>

        {/* Additional content for mobile view */}
        {isMobile && (
          <Box sx={{ display: "flex", width: "150%", paddingRight: "5%", height: "5vh" }}>
            <Search>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => changeSearchText(e.target.value)}
              />
            </Search>
          </Box>
        )}
      </Box>
    </searchContext.Provider>
  );
}
