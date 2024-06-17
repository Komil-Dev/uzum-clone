import SearchIcon from '@mui/icons-material/Search';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import GetGoods from "../../hooks/getGoods";
import searchContext from "../../modules/context/searchContext";
import { styled } from '@mui/material/styles';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const SearchShow = ({ activeIndex }) => {
  const { searchText } = useContext(searchContext);
  const { searchHintGoods } = GetGoods();

  useEffect(() => { }, [searchText]);

  return (
    <Box sx={{ position: 'absolute', width: '45%', zIndex: 1, maxHeight: '400px', overflowY: 'auto', backgroundColor: 'white', boxShadow: 3 }}>
      <List>
        {searchHintGoods.map((item, index) => (
          <Link to={`/product?id=${item.id}`} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
            <StyledListItem button selected={index === activeIndex}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemAvatar>
                <Avatar src={item.media[0]} alt={item.title} />
              </ListItemAvatar>
              <ListItemText primary={item.title} />
            </StyledListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default SearchShow;
