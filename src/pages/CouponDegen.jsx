import React, { useRef, useState, useEffect } from "react";
import SlotCounter from "react-slot-counter";
import Loader from "../components/swirl/loader";
import { useSelector } from "react-redux";
import background from "../assets/bg.jpg";

const CouponDegen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const couponCode = useSelector((state) => state.coupon.couponCode);

  useEffect(() => {
    getCouponCode();
  }, []);

  const getCouponCode = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating an API call
    console.log(couponCode);
    setIsLoading(false);
  };
  const divStyle1 = {
    // fontFamily: "Anton, sans-serif",
    fontFamily: "Bebas Neue, cursive",
    // fontFamily: 'Barlow, sans-serif'
  };
  const counterRef = useRef(null);

  function handleClick() {
    const isCodeText = document.querySelector(".is-code-text");
    isCodeText.classList.add("is-active");
    // const showText = document.querySelector(".hidden-text");
    // showText.classList.remove("hidden");
    counterRef.current?.startAnimation();
  }
  return (
    <div className="text-black">
      {isLoading ? (
        <div className="flex bg-black justify-center items-center h-screen">
          {/* <Swirl /> */}
          <Loader />
        </div>
      ) : (
        // backgroundImage: `url(${background})`
        <div
          style={{ divStyle1 }}
          className="w-full h-screen flex bg-gray-600 flex-col gap-y-16 lg:gap-y-28  items-center"
        >
          <div className="justify-center mt-9 md:mx-20">
            <p className="text-3xl font-bold mx-9 md:text-5xl text-center pb-5">
              Rules for the Coupon Retrieval
            </p>
            <ul className="list-disc list-inside mx-5 text-xl md:text-2xl font-semibold">
              <li>
                The discount code cannot be redeemed immediately upon receipt.
                It can only be used on your next purchase.
              </li>
              <li>
                Present your coupon code to our customer service agent at the
                Benin City outlet along Sapele Road.
              </li>
              <li>
                Our agent will verify the validity of your coupon code through
                our Coupon Redemption Portal.
              </li>
              <li>
                If your coupon code is verified, the agent will give it to the
                cashier at the point of sale.
              </li>
              <li>The discount will be applied to your purchase.</li>
              <li>
                Please note that the coupon code can only be redeemed at the
                Benin City outlet along Sapele Road.
              </li>
            </ul>
          </div>
          <div className="hero text-center">
            <div className="text-3xl font-black">
              <p>Click To Reveal Your Coupon Code</p>
            </div>
            <div className="hero-body">
              <button className="button has-code" onClick={handleClick}>
                <span className="is-code text-3xl text-black">
                  <SlotCounter
                    ref={counterRef}
                    value={couponCode}
                    charClassName="w-fit h-fit font-medium"
                    separatorClassName="sep"
                  />
                </span>
                <span className="is-code-text text-3xl">
                  <em>GET CODE</em>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponDegen;
