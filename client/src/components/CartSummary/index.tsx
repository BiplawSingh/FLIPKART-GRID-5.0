import { useEffect, useState } from "react";

// Styles
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { DeliveryMethodCard, PaymentMethodsRenderer } from "..";
import theme from "../../theme";

// Data
import {
  ICartAddressData,
  ISelectedDeliveryMethod,
} from "../../types/cartTypes";

// Components
import { DeliveryIconDHL, DeliveryIconDPD, DeliveryIconInPost } from "../../ui";
import { ICountry } from "../../types/country";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IModifiedProduct } from "../../types/product";
import { stepperButtonStyles } from "../CartFooter";
import { useNavigate } from "react-router-dom";
interface IProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
interface ICartSummaryData {
  addressData: ICartAddressData;
  selectedDeliveryMethod: ISelectedDeliveryMethod;
  selectedCountry: ICountry;
  phone: string;
}

const DEFAULT_DISCOUNT = 100.0;

const CartSummary = ({ setActiveStep }: IProps) => {
  const [cartSummaryData, setCartSummaryData] = useState<ICartSummaryData>();
  const [totalItems, setTotalItems] = useState<number>(0);
  const {
    products: { cartProducts },
  } = useSelector((state: RootState) => state);
  const navigate = useNavigate();

  const getTotalItemsInCart = ({
    products,
  }: {
    products: IModifiedProduct[] | null;
  }) => {
    const total =
      products?.reduce((accumulator: any, element: IModifiedProduct) => {
        return accumulator + element.amount;
      }, 0) || 0;
    setTotalItems(total);
  };

  useEffect(() => {
    let addressData = JSON.parse(localStorage.getItem("addressData") as string);
    let selectedDeliveryMethod = JSON.parse(
      localStorage.getItem("selectedDeliveryMethod") as string
    );
    let selectedCountry = JSON.parse(
      localStorage.getItem("selectedCountry") as string
    );
    let phone = localStorage.getItem("phone") as string;
    if (addressData && selectedDeliveryMethod && selectedCountry && phone) {
      setCartSummaryData({
        addressData,
        selectedDeliveryMethod,
        selectedCountry,
        phone,
      });
    }
    getTotalItemsInCart({ products: cartProducts.products });
  }, []);

  const setAndReturnCardIcon = (iconName: string) => {
    switch (iconName) {
      case "inPost":
        return <DeliveryIconInPost />;
      case "dhl":
        return <DeliveryIconDHL />;
      case "dpd":
        return <DeliveryIconDPD />;
    }
  };

  const renderDeliveryMethodCard = () => {
    if (cartSummaryData?.selectedDeliveryMethod) {
      const icon = setAndReturnCardIcon(
        cartSummaryData.selectedDeliveryMethod.iconName
      );
      return (
        <DeliveryMethodCard
          cardData={cartSummaryData.selectedDeliveryMethod}
          icon={icon!}
          sx={{ border: "1px solid #FBB03B" }}
          isShowChangeButton={true}
          handleClickChangeButton={() =>
            setActiveStep((previousState) => previousState - 1)
          }
        />
      );
    }
  };

  const handleClickChangeAddressButton = () => {
    setActiveStep((previousState) => previousState - 1);
  };

  const handleClickContinueShoppingButton = () => {
    navigate({ pathname: "/" });
  };

  return (
    <>
      {cartSummaryData && cartProducts.products && (
        <Stack
          rowGap="60px"
          columnGap="40px"
          flexWrap="wrap"
          sx={{
            flexDirection: { md: "row" },
            justifyContent: { xs: "center", md1000: "space-between" },
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Stack
            rowGap="60px"
            columnGap="40px"
            sx={{
              flexDirection: { md: "row" },
              flexWrap: "wrap",
              justifyContent: { xs: "center", md1000: "space-between" },
              alignItems: { xs: "center", md: "flex-start" },
              width: "100%",
              maxWidth: { md: "1340px" },
            }}
          >
            <Box sx={{ width: "max-content", maxWidth: "100%" }}>
              <Typography
                fontSize="14px"
                fontWeight={theme.fontWeight.semiBold}
                marginBottom="29px"
                sx={{ textAlign: { xs: "center", lg: "start" } }}
              >
                Payment method
              </Typography>
              <PaymentMethodsRenderer />
            </Box>

            <Stack
              direction="row"
              flexWrap="wrap"
              gap="40px"
              sx={{
                flexGrow: { md1000: 1 },
                justifyContent: "center",
              }}
            >
              <Stack
                alignItems="center"
                sx={{
                  width: "max-content",
                  maxWidth: "100%",
                  flexGrow: { md1000: 1 },
                }}
              >
                <Box width="143px">
                  <Typography
                    fontSize="14px"
                    fontWeight={theme.fontWeight.semiBold}
                    marginBottom="29px"
                    sx={{ textAlign: { xs: "center", lg: "start" } }}
                  >
                    Delivery method
                  </Typography>
                  {renderDeliveryMethodCard()}
                </Box>
              </Stack>

              <Stack
                sx={{
                  alignItems: { xs: "center", lg: "flex-start" },
                  width: { xs: "max-content", lg: "350px" },
                  maxWidth: "100%",
                  "& p": {
                    textAlign: { xs: "center", lg: "start" },
                    fontSize: "14px",
                    fontWeight: theme.fontWeight.regular,
                  },
                }}
              >
                <Typography
                  marginBottom="29px"
                  sx={{ fontWeight: `${theme.fontWeight.semiBold}!important` }}
                >
                  Address delivery
                </Typography>

                <Stack rowGap="5px" maxWidth="300px">
                  <Typography>{`${cartSummaryData.addressData.firstName} ${cartSummaryData.addressData.lastName}`}</Typography>
                  <Typography>{`${cartSummaryData.addressData.address}. ${cartSummaryData.addressData.city}, ${cartSummaryData.addressData.postalCode}`}</Typography>
                  <Typography>{`${cartSummaryData.selectedCountry.label}`}</Typography>
                  <Typography>{`${cartSummaryData.phone}`}</Typography>
                  <Typography>{`${cartSummaryData.addressData.email}`}</Typography>
                </Stack>

                <Button
                  sx={{
                    border: "1px solid #D8D8D8",
                    borderRadius: "49px",
                    color: "#000000",
                    fontSize: "13px",
                    fontWeight: theme.fontWeight.semiBold,
                    marginTop: "20px",
                    textAlign: "center",
                    height: "49px",
                    width: "300px",
                  }}
                  onClick={handleClickChangeAddressButton}
                >
                  CHANGE ADDRESS
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            rowGap="40px"
            sx={{
              width: "100%",
              flexDirection: { md: "row" },
              justifyContent: { xs: "center", lg: "flex-start" },
            }}
          >
            <Stack
              direction="column"
              spacing={1}
              sx={{
                alignItems: { xs: "center", lg: "flex-start" },
                justifyContent: { xs: "center", md: "flex-start" },
                width: { lg1300: "69%" },
              }}
            >
              <Typography
                fontSize="14px"
                fontWeight={theme.fontWeight.semiBold}
                marginBottom="29px"
                sx={{ textAlign: { xs: "center", md: "start" } }}
              >
                Delivery Estimates
              </Typography>

              <Stack
                rowGap="40px"
                columnGap="10px"
                direction="row"
                flexWrap="wrap"
                alignItems="center"
                sx={{
                  width: "100%",
                  maxWidth: { xs: "570px", md: "1400px" },
                  justifyContent: { xs: "center", lg: "space-between" },
                }}
              >
                <Stack
                  rowGap="30px"
                  columnGap="10px"
                  direction="row"
                  flexWrap="wrap"
                  alignItems="center"
                  sx={{
                    justifyContent: { xs: "center", sm: "space-between" },
                    width: { xs: "60%", lg: "801px" },
                  }}
                >
                  {cartProducts.products.map((product) => (
                    <Stack
                      key={product.id}
                      rowGap="20px"
                      direction="row"
                      columnGap="20px"
                      alignItems="center"
                      sx={{ width: { xs: "279px", md: "100%", border: 1 } }}
                    >
                      <Avatar
                        src={product.imageUrl}
                        sx={{ width: "70px", height: "70px" }}
                        alt={product.name}
                      />
                      <Stack
                        sx={{
                          flexDirection: { md: "row" },
                          justifyContent: { md: "space-between" },
                          width: { md: "100%" },
                        }}
                      >
                        <Typography
                          fontSize="14px"
                          fontWeight={theme.fontWeight.semiBold}
                          width="200px"
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          fontSize="14px"
                          fontWeight={theme.fontWeight.regular}
                          width="500px"
                        >
                          Estimated delivery by{" "}
                          <Box component="span" sx={{ fontWeight: 800 }}>
                            20 Aug 2023
                          </Box>
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Stack>

            <Stack
              direction="column"
              spacing={1}
              sx={{
                alignItems: { xs: "center", lg: "flex-start" },
                justifyContent: { xs: "center", md: "flex-start" },
                width: { lg1300: "31%" },
              }}
            >
              <Typography
                fontSize="14px"
                fontWeight={theme.fontWeight.semiBold}
                sx={{ textAlign: { xs: "center", md: "start" } }}
                marginBottom="30px"
              >
                Price details (
                {totalItems > 1 ? `${totalItems} items` : `${totalItems} item`})
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                columnGap="33px"
                width="300px"
                height="49px"
              >
                <Typography fontWeight={theme.fontWeight.light} fontSize="16px">
                  Total MRP
                </Typography>
                <Typography
                  fontWeight={theme.fontWeight.regular}
                  fontSize="16px"
                >
                  ${cartProducts.totalCost}
                </Typography>
              </Stack>
              {
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  columnGap="33px"
                  width="300px"
                  height="49px"
                >
                  <Typography
                    fontWeight={theme.fontWeight.light}
                    fontSize="16px"
                  >
                    Discount on MRP
                  </Typography>
                  <Typography
                    fontWeight={theme.fontWeight.regular}
                    fontSize="16px"
                    color={"green"}
                  >
                    -${cartProducts.discount ?? `${DEFAULT_DISCOUNT}.00`}
                  </Typography>
                </Stack>
              }
              <Stack
                direction="row"
                justifyContent="space-between"
                columnGap="33px"
                width="300px"
                height="49px"
              >
                <Typography
                  fontWeight={theme.fontWeight.semiBold}
                  fontSize="16px"
                >
                  Total Amount
                </Typography>
                <Typography
                  fontWeight={theme.fontWeight.semiBold}
                  fontSize="16px"
                >
                  $
                  {cartProducts.discount === undefined
                    ? cartProducts.totalCost - DEFAULT_DISCOUNT
                    : cartProducts.totalCost - cartProducts.discount}
                </Typography>
              </Stack>
              <Button
                sx={{
                  border: "1px solid #D8D8D8",
                  borderRadius: "49px",
                  color: "#000000",
                  fontSize: "13px",
                  fontWeight: theme.fontWeight.semiBold,
                  textAlign: "center",
                  height: "49px",
                  width: "300px",
                  marginBottom: "100px",
                }}
                onClick={handleClickContinueShoppingButton}
              >
                ADD MORE ITEMS
              </Button>
              <Button
                sx={{
                  ...stepperButtonStyles,
                  width: "300px",
                }}
              >
                PROCEED TO PAYMENT
              </Button>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default CartSummary;
