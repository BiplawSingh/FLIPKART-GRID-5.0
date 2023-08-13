import { useState } from "react";
import { Button, TextField } from "@mui/material";

const ApplyCoupon = () => {
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const handleCouponCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(event.target.value);
  };

  const handleApplyCoupon = () => {
    // TODO: Implement the logic to apply the coupon code
    // You can make an API call to validate the coupon code and update the price accordingly
    // Example: setIsCouponApplied(true);
  };

  return (
    <div>
      <TextField
        label="Coupon Code"
        value={couponCode}
        onChange={handleCouponCodeChange}
      />
      <Button variant="contained" onClick={handleApplyCoupon}>
        Apply Coupon
      </Button>
      {isCouponApplied && <p>Coupon applied successfully!</p>}
    </div>
  );
};

export default ApplyCoupon;
