import { useNavigate } from "react-router-dom";

import { Box, Stack, Typography } from "@mui/material";
import theme from "../../theme";

import { IProduct } from "../../types/product";


import StarRateIcon from "@mui/icons-material/StarRate";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate({
      pathname: `/product-detail`,
      search: `?id=${product.id}`,
    });
  };

  return (
    <Stack
      sx={{
        width: "272px",
        height: "380px",
        borderRadius: "8px",
        border: "1px solid #e6e6e6",
        cursor: "pointer",
        boxShadow: "none",
        transition: "box-shadow 0.2s linear",
        "&:hover": {
          boxShadow: "1px 5px 7px 0px rgba(175,171,171,.7)",
        },
      }}
      onClick={handleClickCard}
    >
      <Box
        sx={{
          position: "relative",
          "& .product-image": {
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            height: "250px",
            width: "100%",
            objectFit: "cover",
          },
          width: "100%",
        }}
      >
        <img
          className="product-image"
          src={product.imageUrl}
          loading="lazy"
          alt={product.name}
        />
      </Box>
      <Stack
        sx={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px" }}
      >
        <Typography
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontSize: { xs: "13px", sm768: "15px" },
            fontWeight: theme.fontWeight.semiBold,
            width: "100%",
            height: "20px",
          }}
        >
          HIGHLANDER
        </Typography>
        <Typography
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontSize: { xs: "12px", sm768: "14px" },
            fontWeight: theme.fontWeight.light,
            width: "100%",
            height: "30px",
            color: "grey",
          }}
        >
          Men Tapered Fit Jeans
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "12px", sm768: "14px" },
            fontWeight: theme.fontWeight.semiBold,
            height: "30px",
          }}
        >
          <Box component="span" sx={{ marginRight: "15px" }}>
            <StarRateIcon style={{ color: "green", fontSize: "16px" }} />
            <StarRateIcon style={{ color: "green", fontSize: "16px" }} />
            <StarRateIcon style={{ color: "green", fontSize: "16px" }} />
            <StarRateIcon style={{ color: "green", fontSize: "16px" }} />
          </Box>
          <Box component="span">28.1K</Box>
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "12px", sm768: "16px" },
          }}
        >
          <Box
            component="span"
            sx={{
              fontWeight: 200,
              textDecoration: "line-through",
              color: "grey",
            }}
          >
            $1,499
          </Box>
          <Box component="span" sx={{ fontWeight: 800, marginLeft: "15px" }}>
            $749
          </Box>
          <Box
            component="span"
            sx={{
              fontWeight: 700,
              color: "red",
              marginLeft: "15px",
            }}
          >
            $700 OFF!
          </Box>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ProductCard;
