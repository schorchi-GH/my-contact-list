import { FC, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/background.jpg";
import "./LoginPage.scss";
import { Button } from "../../components/Buttons/Button/Button";

export const LoginPage: FC = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const hideError = () => setError(false);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    navigate("/contacts");
  };

  return (
    <>
      <div className="page">
        <div className="login-wrapper">
          <img
            src={background}
            alt="Login form background"
            className="backgroundImage"
          />
          <div className="form-wrapper">
            <form className="login-form" onSubmit={handleSubmit}>
              <h1 className="form-header">Welcome</h1>
              <div>
                <input
                  className="form-input login"
                  type="email"
                  placeholder="Email"
                  required
                  onFocus={hideError}
                />
              </div>
              <div>
                <input
                  className="form-input password"
                  type="password"
                  placeholder="Password"
                  required
                  onFocus={hideError}
                />
              </div>
              <div>
                <Button type="submit" value="Login" isIcon={false}>
                  Login
                </Button>
                {error && (
                  <div className="login-error">
                    Login failed. Invalid email or password.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
