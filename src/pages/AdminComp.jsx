import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { auth, db } from "../firebase";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props} style={{ display: "none" }} />
  );
};

const AdminComp = () => {
  const [users, setUsers] = useState([]);
  const [coupons, setCoupons] = useState([]);
  useEffect(() => {
    const readData = query(collection(db, "user"));
    const unsubscribe = onSnapshot(readData, (querySnapshot) => {
      let usersArr = [];
      //doc can be named anything
      querySnapshot.forEach((doc) => {
        usersArr.push({ ...doc.data(), id: doc.id });
      });
      setUsers(usersArr);
      console.log(usersArr);
      let couponArr = usersArr.map((user) => ({
        label: user.coupon,
        // redeemed: user.redeemed,
      }));
      //   const couponsArrOnly = couponArr.map((option) => option.coupon);
      setCoupons(couponArr);
    });
    return () => unsubscribe();
  }, []);

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const handleChange = (selected) => {
    if (selected) {
      setSelectedOption(selected);
      const user = users.find((u) => u.coupon === selected.label);
      setSelectedUser(user);
    }
  };
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const handleInputChange = (input) => {
    setInputValue(input);
    const filtered = coupons.filter((option) => {
      return option.label.toLowerCase().startsWith(input.toLowerCase());
    });
    setFilteredOptions(filtered);
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#F3F4F6",
      border: "none",
      borderRadius: "0.5rem",
      boxShadow: "none",
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: 0,
    }),
  };
  // const [isChecked, setIsChecked] = useState(false);

  // const couponUsed = async (users) => {
  //   await updateDoc(doc(db, "user", users.id), {
  //     redeemed: !users.redeemed,
  //   });
  // };
  // const [disableCheckbox, setDisableCheckbox] = useState(false);
  const handleCheckboxClick = async (selectedUser) => {
    try {
      // toggle the redeemed value
      const updatedValue = !selectedUser.redeemed;
      await updateDoc(doc(db, "user", selectedUser.id), {
        redeemed: updatedValue,
      });
      console.log("Coupon redeemed status updated successfully.");
      setSelectedUser((prevState) => ({
        ...prevState,
        redeemed: updatedValue,
      }));
      // setDisableCheckbox(true);
    } catch (error) {
      console.error("Error updating redeemed status:", error);
    }
  };
  const signOut = (e) => {
    e.preventDefault();

    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("User signed out");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <div className="bg-[#eae2e2] flex h-screen px-10 justify-center items-center">
      <div className="bg-white p-5 w-full md:w-[600px] lg:w-[400px] flex flex-col gap-y-5 py-5 rounded-md">
        <Select
          options={
            filteredOptions.length > 0
              ? [filteredOptions[0]]
              : coupons.length > 0
              ? [coupons[0]]
              : [{ label: "No Coupons Generated" }]
          }
          className="w-full rounded-lg px-4 py-2 lg:text-lg text-2xl mb-4"
          placeholder="Search..."
          value={selectedOption || { coupon: "Initial Value" }}
          onInputChange={handleInputChange}
          onChange={handleChange}
          components={{ DropdownIndicator }}
          styles={customStyles}
          // menuIsOpen={filteredOptions.length === 1}
        />
        <div>
          <div>
            {/* {console.log(selectedOption)} */}
            <div className="relative my-20">
              {selectedUser.coupon && (
                <p className="border-b-2 border-x-2 w-full lg:text-lg text-2xl border-black font-semibold p-3 grid grid-cols-[90%_10%]">
                  <span>
                  Coupon: {selectedUser.coupon} (
                  {selectedUser.redeemed ? "Redeemed" : "Not Redeemed"})
                  </span>
                  <input
                    style={{ backgroundColor: "yellow" }}
                    type="checkbox"
                    className="h-6 w-6 border-2 border-blue-500"
                    checked={selectedUser.redeemed ? true : false}
                    onChange={handleCheckboxClick.bind(this, selectedUser)}
                    // disabled={disableCheckbox}
                  />
                </p>
              )}
              {selectedUser.redeemed && (
                <div className="absolute inset-0 z-10 bg-gray-900 opacity-50"></div>
              )}
            </div>
          </div>
          <div>
            <button onClick={signOut}>log out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComp;
