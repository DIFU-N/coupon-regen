import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import AdminComp from '../AdminComp';
import AdminAuth from './AdminAuth';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../../app/auth';

const Admin = () => {
  // const [authUser, setAuthUser] = useState(null);
  const authUser = useSelector((state) => state.auth.authUser)
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      // const { password, email } = user;
// const authUser = { password, email };
        if (user) {
            dispatch(setAuthUser(user.uid));
          } else {
            dispatch(setAuthUser(null));
          }
    });
    return unsubscribe;
  }, []);

  return (
    <div>
        {authUser ? <AdminComp /> : <AdminAuth />}
    </div>
  )
}

export default Admin;