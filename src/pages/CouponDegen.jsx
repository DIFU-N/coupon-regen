import React, {useRef, useState, useEffect} from 'react';
import SlotCounter from 'react-slot-counter';
import Loader from '../components/swirl/loader';
import {useSelector} from 'react-redux';
import background from '../assets/bg.jpg';

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
    // fontFamily: 'Bebas Neue, cursive',
    fontFamily: 'Barlow, sans-serif'
  };
  const counterRef = useRef(null);

  function handleClick() {
    const isCodeText = document.querySelector('.is-code-text');
    counterRef.current?.startAnimation();
    isCodeText.classList.add('is-active');
    // const showText = document.querySelector(".hidden-text");
    // showText.classList.remove("hidden");
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
          style={divStyle1}
          className="w-full h-screen flex flex-col gap-y-16 lg:gap-y-28  items-center"
        >
          <div className="justify-center mt-9 md:mx-20 md:border-2 md:border-gray-900 md:rounded-md lg:mx-[25%]">
            <p className="text-3xl font-bold mx-9 md:text-2xl text-center lg:text-xl pb-5 py-1 border-b-2 md:py-2 md:mb-2 border-gray-900">
              Rules for the Coupon Retrieval
            </p>
            <ul className="list-disc my-5 list-inside mx-5 text-xl md:text-sm lg:text-sm font-semibold">
              <li className='py-1 px-2'>
                You will recieve your coupon code 3 hours from now.
              </li>
              <li className='py-1 px-2'>
                The code cannot be redeemed immediately upon receipt.
                It can only be used on your next purchase.
              </li>
              <li className='py-1 px-2'>
                Present your coupon code to our customer service agent at the
                Benin City outlet along Sapele Road.
              </li>
              <li className='py-1 px-2'>
                Our agent will verify the validity of your coupon code through
                our Coupon Redemption Portal.
              </li>
              <li className='py-1 px-2'>
                If your coupon code is verified, the agent will give it to the
                cashier at the point of sale.
              </li>
              <li className='py-1 px-2'>The discount will be applied to your purchase.</li>
              <li className='py-1 px-2'>
                Please note that the coupon code can only be redeemed at the
                Benin City outlet along Sapele Road.
              </li>
            </ul>
          </div>
          {/* <div className="hero text-center">
            <div className="text-3xl font-black">
              <p>Click To Reveal Your Coupon Code</p>
            </div>
            <div className="hero-body">
              <button className="button has-code" onClick={handleClick} onMouseOver={handleClick}>
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
          </div> */}
        </div>
      )}
    </div>
  );
};

export default CouponDegen;
