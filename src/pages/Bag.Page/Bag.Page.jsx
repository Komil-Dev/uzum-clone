import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Checkbox, Container, Grid, Icon, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import BagCard from "../../component/BagCard";
import SearchAppBar from "../../component/Layout/Header";
import ProductCard from "../../component/productCard";
import BagGoods from "../../hooks/getGoods";

const BagPage = () => {
  const [time, setTime] = useState("");
  const { Goods, res: bagItems, bagLoading, goodsloading, bagError, goodError } = BagGoods();
  const [percentage, setPercentage] = useState(0);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [res, setRes] = useState([]);

  useEffect(() => {
    if (bagItems) {
      setRes(bagItems);
    }
  }, [bagItems]);

  const handleIncrease = () => {
    setPercentage((prevPercentage) => Math.min(prevPercentage + 10, 100));
  };

  const handleDecrease = () => {
    setPercentage((prevPercentage) => Math.max(prevPercentage - 10, 0));
  };

  useEffect(() => {
    const currentDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);
    setTime(tomorrowDate.toDateString());
  }, []);

  const popProds = useMemo(() => (Goods ? Goods.filter((good) => good.type === "PC") : []), [Goods]);

  const updateQuantity = (id, newQuantity) => {
    console.log(`Update quantity for item ID ${id} to ${newQuantity}`);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = new Set(bagItems.map((item) => item.prod_id));
      setSelectedItems(allIds);
    } else {
      setSelectedItems(new Set());
    }
  };

  const toggleCheckbox = (id) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleDeleteAll = () => {
    console.log(`Deleting items: ${Array.from(selectedItems).join(", ")}`);
    const updatedRes = res.filter((item) => !selectedItems.has(item.prod_id));
    setSelectedItems(new Set());
    setRes(updatedRes);
  };

  if (bagLoading || goodsloading) {
    return <Typography>Loading...</Typography>;
  }

  if (bagError || goodError) {
    return <Typography>Error loading data</Typography>;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 },
        "@media (min-width:1920px)": {
          maxWidth: "1600px",
        },
      }}
    >
      <SearchAppBar />
      <Box sx={{ display: "flex", gap: "20px", mt: 4 }}>
        <Box
          sx={{
            width: "68%",
            bgcolor: "white",
            border: "1px solid lightgray",
            p: 2,
            mb: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", width: "100%", mb: 2 }}>
            <Checkbox
              onChange={handleSelectAll}
              checked={selectedItems.size === res.length}
              indeterminate={selectedItems.size > 0 && selectedItems.size < res.length}
              sx={{ mr: 1 }}
            />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              My Bag
            </Typography>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteAll}
              sx={{
                marginLeft: "auto",
                bgcolor: "#FFFFFF",
                boxShadow: "0",
                color: "#000000",
                '&:hover': {
                  bgcolor: "#f0f0f0",
                },
              }}
            >
              Delete All
            </Button>
          </Box>
          {res.map((goods, index) => (
            <BagCard
              key={goods.prod_id}
              goods={goods}
              index={index}
              updateQuantity={updateQuantity}
              checked={selectedItems.has(goods.prod_id)}
              toggleCheckbox={() => toggleCheckbox(goods.prod_id)}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
            width: "32%",
          }}
        >
          <Box
            sx={{
              width: "90%",
              maxHeight: "39vh",
              overflow: "hidden",
              bgcolor: "white",
              border: "1px solid lightgray",
              borderRadius: "10px",
              p: 2,
              mb: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                justifyContent: "start",
                alignItems: "start",
              }}
              variant="body1"
            >
              Buyutmangiz
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: 2 }}>
              <Typography variant="body1">Mahsulotlar(2)</Typography>
              <Typography sx={{ fontSize: "12px" }} variant="body1">
                126 000 so'm
              </Typography>
            </Box>
            <input
              style={{
                width: "90%",
                height: "3vh",
                border: "1px solid #8A2BE2",
                textAlign: "center",
                marginTop: "20px",
                justifyContent: "center",
              }}
              type="text"
              placeholder="Yetkazib berish M06 7 (Ertaga)"
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: 2 }}>
              <Typography variant="body1">Jami:</Typography>
              <Typography variant="body1">120 000 so'm</Typography>
            </Box>
            <Typography variant="body1" sx={{ fontSize: "12px", color: "green", textAlign: "end" }}>
              tejovingiz: 20 000 so'm
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: "10px",
                width: "90%",
                bgcolor: "#8A2BE2",
                mt: 2,
              }}
            >
              rasmiylashtirishga o'tish
            </Button>
          </Box>

          <Box
            sx={{
              position: "relative",
              width: "90%",
              borderRadius: "10px",
              p: 2,
              mb: 4,
              bgcolor: "#F5F5F5",
              height: "15vh",
            }}
          >
            <Typography sx={{ fontWeight: 700, marginRight: "5px" }} variant="body2">
              Buyurtmalarni topshirish punkitiga bepul yetkazib beramiz
            </Typography>
            <Typography sx={{ fontSize: "14px", marginRight: "5px" }} variant="body2">
              Kuryer orqali bepul yetkazishgacha 880 000 soʻm qoldi
            </Typography>
            <Icon
              variant="outlined"
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                color: "gray",
              }}
            >
              <HelpOutlineIcon />
            </Icon>
            <div
              style={{
                position: "absolute",
                bottom: "-10px",
                width: `${percentage}%`,
                borderTop: "1px solid green",
                borderRadius: "5px",
                transition: "width 0.5s ease-in-out",
                height: "4px",
                fontWeight: "bold",
                fontSize: "2px",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleDecrease}
                  sx={{ marginRight: "5px" }}
                >
                  -
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={handleIncrease}
                  sx={{ marginLeft: "5px" }}
                >
                  +
                </Button>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", color: "green", fontSize: "14px", marginTop: "5px" }}
              >
                <Typography variant="body2">1 000 000 so'm</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {popProds.map((good) => (
          <Grid item key={good.id} xs={12} sm={6} md={4} lg={3} xl={2.2}>
            <ProductCard good={good} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BagPage;
