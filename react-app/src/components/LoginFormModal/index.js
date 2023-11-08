import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  //Demo User Button Config
  const demoUserButton = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'));
    closeModal();
    history.push('/');
  } ;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <div className="login-form-modal">
      <p className="log-in">Log In</p>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="error-message">{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            className={`login-form-modal-input ${errors.length ? 'input-error' : ''}`}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            className={`login-form-modal-input ${errors.length ? 'input-error' : ''}`}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="login-button">Log In</button>

        <div className="login-button-div">
              <button
                className="login-button"
                type="submit"
                onClick={demoUserButton}>
                Demo User
              </button>
          </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
