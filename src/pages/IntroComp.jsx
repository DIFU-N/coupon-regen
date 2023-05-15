import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../components/Input";
import {
  cell_validation,
  date_validation,
  email_validation,
  gender_validation,
  name_validation,
} from "../utils/InputValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "../components/Select";
import SelectDate from "../components/Date";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { parseISO } from "date-fns";
import { generate } from "voucher-code-generator";
import { setCouponCode } from "../app/coupon";
import { setSubmitTime, setThreeHoursLater } from "../app/time";
import { useDispatch, useSelector } from "react-redux";
import PhoneInputField from "../components/PhoneNumber";
import background from "../assets/WebpageG+.png";
import { MySvg } from "../assets/svgComp";
import { CouponRateSvg } from "../assets/CouponRateComp";
import { MotionConfig, motion } from "framer-motion";
import * as firebase from 'firebase/app';
import 'firebase/functions';
import { firebaseConfig } from "../firebase";
import sendSMS from "../utils/SendSMS";

const IntroComp = () => {
  const navigate = useNavigate();
  const validationSchema = useSelector((state) => state.validate.validation);
  const formOptions = { resolver: yupResolver(validationSchema) };
  const methods = useForm(formOptions);
  // const emailMethod = useForm(formOptions);
  const { control } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [schedule, setSchedule] = useState("");
  const [users, setUsers] = useState(null);
  const dispatch = useDispatch();
  const getTime = () => {
    const timestamp = new Date().getTime();
    const newTime = new Date(timestamp);
    const offsetMs = newTime.getTimezoneOffset() * 60 * 1000; // get timezone offset in milliseconds
    const adjustedTimestamp = timestamp - offsetMs; // adjust timestamp to UTC
    const timeNow = new Date(adjustedTimestamp).toISOString().replace('T', ' ').substr(0, 16);
    const threeHoursLater = new Date(adjustedTimestamp + 0.10 * 60 * 60 * 1000).toISOString().replace('T', ' ').substr(0, 16);
    console.log(timeNow);
    console.log(threeHoursLater);
    const schedulingTime = new Date(threeHoursLater).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(',', '');

    return schedulingTime;
  }
  // create
  const onFormDataSubmitted = async (data) => {
    const voucherCode = generate({
      length: 5,
      count: 1,
      prefix: "GEN-",
    });
    dispatch(setCouponCode(voucherCode[0]));
    const dateObject = parseISO(data.birthday.toString());
    const cleanedNumber = data.cell.replace(/^0?\s*|\s*/g, "");
    const phoneNumber = data.cell.startsWith("+234")
    ? data.cell
    : "+234" + cleanedNumber;
    const editedNumber = phoneNumber.replace(/^(\+234)|\s*/g, "");
    const textableNumber = "0" + editedNumber;
    try {
      await addDoc(collection(db, "user"), {
        name: data.name,
        email: data.email,
        cell: phoneNumber,
        birthday: Timestamp.fromDate(dateObject),
        gender: data.gender,
        coupon: voucherCode[0],
        redeemed: false,
      });
      const schedulingTime = getTime();
    setTimeout(() => {
      const sendSMSfxn = async () => {
        const result = await sendSMS({ to: textableNumber , text: `Hello ${data.name}, your Coupon is ${voucherCode[0]}`, schedule: schedulingTime })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
      }
      sendSMSfxn();
    }, [3000]);
      // 👇️ navigate to /coupon-degen
      navigate("/coupon-degen");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const onSubmit = methods.handleSubmit(onFormDataSubmitted);

  // const onSubmit = async (e) => {
  //     e.preventDefault(e);
  //     await methods.handleSubmit(data => {
  //     console.log(data);
  //     addDoc(collection(db, 'user'), {
  //         name: data.name,
  //         email: data.email,
  //         cell: data.cell,
  //         birthday: data.date,
  //         gender: data.gender
  //     })
  //     // 👇️ navigate to /contacts
  //     // , {replace: true}
  //     navigate('/coupon-degen');
  //     // const navigateToCoupon = () => {
  //     // };
  //     })
  // }

  // read
  // useEffect(() => {
  //   const readData = query(collection(db, "user"));
  //   const unsubscribe = onSnapshot(readData, (querySnapshot) => {
  //     let usersArr = [];
  //     //doc can be named anything
  //     querySnapshot.forEach((doc) => {
  //       usersArr.push({ ...doc.data(), id: doc.id });
  //     });
  //     setUsers(usersArr);
  //     // console.log(users);
  //   });
  //   return () => unsubscribe();
  // }, []);

  // update
  const couponUsed = async (users) => {
    await updateDoc(doc(db, "user", users.id), {
      retrieved: !users.retrieved,
    });
  };

  // delete
  const deleteUser = async () => {
    await deleteDoc(doc(db, "user", id));
  };
  const deleteAllUsers = async () => {
    const userRef = collection(db, "user");
    const querySnapshot = await getDocs(userRef);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  };
  const divStyle1 = {
    fontFamily: "Barlow, sans-serif",
  };
  const divStyle = {
    fontFamily: "Bebas Neue, cursive",
  };
  const containerVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 0.5,
      },
    },
    wiggle: {
      x: [-5, 5, -3, 3, 0],
      y: [0, 0, -5, 5, 0],
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 0.5,
      },
    },
  };
  firebase.initializeApp(firebaseConfig);
  const sendEmail = async () => {
    const sendEmailFunction = firebase.functions().httpsCallable('sendEmail');
    const result = await sendEmailFunction({ 
      toEmail: "desktopsupport.qsr@genesisgroupng.com", 
      toName: "Testing", 
      subject: "testing", 
      textPart: "test text", 
      htmlPart: "html part?" });
    console.log(result);
  };
  // Get the window width to determine the screen size
  const windowWidth = window.innerWidth;
  // Choose the background image based on the screen size
  let backgroundImage;
  if (windowWidth < 768) {
    backgroundImage = '';
  } else if (windowWidth >= 768 && windowWidth < 1024) {
    backgroundImage = background;
  } else {
    backgroundImage = background;
  }
  return (
    <div>
      <div className="w-full">
        <div
          className={`w-full space-y-8 h-full lg:h-screen bg-cover bg-`}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="pt-10">
            {/* <img
              className="mx-auto h-16 w-auto"
              src="src/assets/genesis G .png"
              // src="https://genesisrestaurant.com.ng/static/media/logo_dark.d490bb1bb034cf3c253f.webp"
              alt="Workflow"
            /> */}
            <MySvg className="mx-auto lg:hidden h-16 w-auto" />
          </div>
          <div className="grid grid-row gap-10 mx-3 pb-10 lg:grid-cols-2">
            <div
              style={divStyle1}
              className="flex mx-3 md:mt-[50%] lg:mt-[40%] gap-3 font-medium text-2xl text-black flex-col"
            >
              {/* <MySvg className="mx-auto hidden lg:block justify-center h-16 w-auto" /> */}
              {/* <motion.div
                className="flex flex-col items-center justify-center"
                initial={{ y: -100 }}
                animate={{
                  y: 0,
                  x: [-10, 10, -5, 5, 0],
                  transition: {
                    duration: 1.5,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.4, 0.6, 1],
                  },
                }}
              >
                <motion.div
                  transition={{
                    delay: 0.5,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300,
                  }}
                  animate={{ scale: 1 }}
                  initial={{ scale: 0 }}
                >
                  <CouponRateSvg className="mx-auto h-40 w-auto" />
                </motion.div>
                <motion.span
                  animate={{
                    y: [0, -5, 0],
                    transition: {
                      delay: 1.5,
                      duration: 0.3,
                      times: [0, 0.5, 1],
                    },
                  }}
                >
                  Coupon Code
                </motion.span>
              </motion.div> */}
              <div className="font-bold text-center md:text-xl lg:text-lg">
                <p style={divStyle} className="text-5xl md:text-5xl pb-3">
                  Welcome to our coupon code portal!
                </p>
                <p>
                  Complete the form to receive a coupon code via email or SMS
                  within 3 to 6 hours.
                </p>
                  <p className="mt-3">
                    We look forward to helping you save money with our unique
                    coupon code portal!
                  </p>
              </div>
            </div>
            <div className="items-center justify-center mx-4 px-3 lg:mr-28 lg:h-[540px] rounded-md flex bg-white flex-col border">
              <h2 className="mt-4 lg:mt-4 text-center text-3xl font-extrabold text-gray-900">
                Enter Your Details
              </h2>
              <p className="mt-2 lg:mt-0 text-center text-sm text-gray-600">
                For{" "}
                <a
                  href="#"
                  className="font-medium text-[#f30000] hover:text-red-400"
                >
                  Your Deserved 15% Discount
                </a>
              </p>
              <FormProvider {...methods}>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  noValidate
                  autoComplete="off"
                  className="container"
                >
                  <div
                    style={divStyle1}
                    className="rounded-md flex lg:h-[400px] flex-col gap-y-5 lg:gap-y-2 shadow-sm -space-y-px"
                  >
                    <Input {...name_validation} />
                    <Input {...email_validation} />
                    <PhoneInputField
                      {...cell_validation}
                      control={control}
                      validation={validationSchema}
                    />
                    <Select {...gender_validation} />
                    <SelectDate {...date_validation} />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={onSubmit}
                      className="group relative w-full flex justify-center my-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white
                     bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        {/* <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            aria-hidden="true" /> */}
                        <img
                          src="src/assets/genesis-G-full.ico"
                          className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                          alt="icon"
                        />
                      </span>
                      Sign in
                    </button>
                    <button onClick={deleteAllUsers}>delete all</button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroComp;
