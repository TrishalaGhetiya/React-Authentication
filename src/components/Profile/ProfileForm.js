import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const newPasswordInputRef = useRef();
const submitHandler = (e) => {
  e.preventDefault();
  const enteredNewPassword = newPasswordInputRef.current.value;

  fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBaMjEyYa1-VQ3dRX6GfB9u_vd7uM8God4', {
    method: 'POST',
    body: JSON.stringify({
      idToken: authCtx.token,
      password: enteredNewPassword,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    return res.json().then(data => {
      console.log(data);
    }).catch(err => { 
      throw new Error(err);
    })
  }).catch(err => {
    alert(err);
  })
}
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
