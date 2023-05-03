import {signInWithEmailAndPassword} from 'firebase/auth';
import React, {useState} from 'react';
import {auth} from '../../firebase';
import {useDispatch} from 'react-redux';
import {setAuthUser} from '../../app/auth';

const AdminAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
      dispatch(setAuthUser(userCredential.user.uid));
    }).catch((error) => {
      console.log(error);
    });
  };
  return (
    <div className="bg-[#eae2e2] flex h-screen px-10 justify-center items-center">
      <div className="bg-white p-5 w-full md:w-[600px] lg:w-[400px] flex flex-col gap-y-5 py-5 rounded-md">
      <span className="text-3xl font-semibold w-full text-center border-b-2 p-3">Sign In, ADMIN.</span>
      {/* {if (user.length < 1) ? null :} */}
      {/* Yo0u have ${user.length} coupons generated*/}
      <form onSubmit={signIn} className="flex gap-3 flex-col">
        <span className="text-2xl font-medium lg:text-lg">Email</span>
        <input type="email" className="border-2 p-3 border-black" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <span className="text-2xl font-medium lg:text-lg">Password</span>
        <input type="password" className="border-2 p-3 border-black" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" className="border-2 p-3 my-6 md:my-12 border-black bg-black text-white">Sign In</button>
      </form>
      </div>

      <div>
        {/* <input type="checkbox" checked={user.retrieved ? 'checked' : ''} /> */}
      </div>
    </div>
  );
};

export default AdminAuth;
