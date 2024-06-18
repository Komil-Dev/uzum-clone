import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box, Card, CardContent, CardMedia, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { addToBagMutation, patchtoBagMutation } from "../hooks/addToBag";
import GetGoods from "../hooks/getGoods";

const ProductCard = ({ good }) => {
  const [status, setStatus] = useState(good && good.status);
  const { bagGoods } = GetGoods();

  const { addToBag } = addToBagMutation();
  const { patchtoBag } = patchtoBagMutation();

  const { mutate: updateStatus } = useMutation(
    async (newStatus) =>
      await axios.patch(`http://localhost:3001/goods/${good.id}`, {
        status: newStatus,
      })
  );

  useEffect(() => {
    const likedGoods = JSON.parse(localStorage.getItem("likedGoods")) || [];
    if (likedGoods.some((item) => item.id === good.id)) {
      setStatus(true);
    }
  }, [good.id]);

  const handleLike = async (e) => {
    e.preventDefault();

    const newStatus = !status;
    setStatus(newStatus);
    updateStatus(newStatus);

    let likedGoods = JSON.parse(localStorage.getItem("likedGoods")) || [];
    if (newStatus) {
      likedGoods.push(good);
    } else {
      likedGoods = likedGoods.filter((item) => item.id !== good.id);
    }
    localStorage.setItem("likedGoods", JSON.stringify(likedGoods));
  };

  const handleBag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isProductExist = bagGoods.find((prod) => +prod.prod_id === +good.id);

    if (isProductExist === undefined) {
      addToBag(good && { productId: good.id, media: good.media[0], title: good.title });
    } else {
      isProductExist &&
        patchtoBag(
          good && {
            productId: isProductExist.id,
            productNum: isProductExist.num,
            media: good.media[0],
            title: good.title,
          }
        );
    }
  };

  // Modal state
  const [open, setOpen] = useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Card
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          alt={good.title}
          height={isMobile ? "150px" : "200px"}
          image={good.media[0]}
          title={good.title}
          sx={{
            objectFit: "contain",
            zIndex: 1,
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
        <IconButton
          size="small"
          aria-label="like"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: status ? "#7000FF" : "rgba(255, 255, 255, 0.8)",
            zIndex: 2,
            border: "1px solid rgba(0, 0, 0, 0.23)",
            borderRadius: "50%",
          }}
          onClick={(e) => {
            setStatus(!status);
            handleLike(e);
          }}
        >
          <FavoriteBorderOutlinedIcon sx={{ color: status ? "#FFFFFF" : "#000000" }} fontSize="small" />
        </IconButton>
        <CardContent sx={{ flex: "1 0 auto", paddingBottom: 0 }}>
          <Typography color={"#3B3C36"} variant="subtitle1" component="h6" noWrap>
            {good.title}
          </Typography>
          <Typography mt={2} marginBottom={"5%"} variant="caption" color="" component="mark">
            {Math.floor((good.price * 12) / 100)} So'm/oyiga
          </Typography>
          <Box mt={4} marginBottom={"10%"} display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="body2" color="textSecondary" component="del">
                {good.price - Math.floor((good.price * good.salePercentage) / 100)} So'm
              </Typography>
              <Typography sx={{ fontSize: "16px" }} variant="body2" component="span">
                {good.price} So'm
              </Typography>
            </Box>
            <IconButton size="small" aria-label="add to bag" onClick={handleClickOpen}>
              <AddOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {open && (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            marginTop: "1px",
            zIndex: 3,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
          onClick={handleClose}
        >
          <Box
            sx={{
              width: "95%",
              maxWidth: "800px",
              height: "17vh",
              display: "flex",
              padding: "20px",
              backgroundColor: "white",
              position: "relative",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img style={{ width: "70px", height: "10vh" }} src={good.media[0]} alt="" />
            <Box sx={{ gap: "10px" }}>
              <h4
                style={{
                  fontSize: "16px",
                  textDecoration: "none",
                  marginLeft: "10px",
                  marginTop: "-3px",
                }}
              >
                {good.title.slice(0, 23)}...
              </h4>
              <p style={{ color: "gray", fontSize: "15px", textDecoration: "none", marginLeft: "10px" }}>
                {good.title}
              </p>
            </Box>
            <Typography
              sx={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                color: "darkViolet",
                textAlign: "end",
              }}
              variant="p"
            >
              Savatga O'tish
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductCard;
