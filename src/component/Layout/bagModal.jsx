import DeleteIcon from "@mui/icons-material/Delete"; // Import the DeleteIcon from Material-UI
import { Link } from "react-router-dom";
import GetGoods from "../../hooks/getGoods";

const BagModal = ({ item }) => {
  const { bagGoods } = GetGoods();

  const myProd = bagGoods && bagGoods.find((good) => +good.prod_id === +item.id);

  return (
    <>
      {item && (
        <Link to={`/product?id=${item.id}`} style={{ textDecoration: "none" }}>
          <div
            key={item.id}
            style={{ display: "flex", backgroundColor: "white", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.10)" }}
          >
            <img style={{ width: "80px", height: "6vh" }} src={item.media[0]} alt="" />
            <div>
              <p style={{ color: "gray", fontSize: "15px", textDecoration: "none" }}>{item.title.slice(0, 30)}...</p>
              <span style={{ color: "black", fontSize: "15px" }}>
                {item.price -
                  Math.floor((item.price * item.salePercentage) / 100)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
                  " "}
                so'm {myProd && myProd.num}
              </span>
            </div>
            <DeleteIcon style={{ width: "20px", height: "20px", marginTop: "5%", color: "gray" }} />
          </div>
        </Link>
      )}
    </>
  );
};
export default BagModal;
