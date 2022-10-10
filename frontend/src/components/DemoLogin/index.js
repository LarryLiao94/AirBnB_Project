import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./DemoLogin.css";

const DemoLogin = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) return <Redirect to="/" />;

  const user = {
    email: 'demo@user.io',
    password: 'password'
  }

 const handleClick = () => {
    return dispatch(sessionActions.login(user))
 }

  return (
    <>
    <button className="demo-login" onClick={handleClick}>
      Demo User
    </button>
    </>
  );
};

export default DemoLogin;
