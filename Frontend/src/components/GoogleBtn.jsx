import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";
import api from "../services/api";

const GoogleBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async (response) => {
    try {
      const idToken = response.credential;

      // include userType in payload
      const res = await api.post("/auth/google-login", {
        idToken,
        userType: "guest",
      });

      if (res.data.success) {
        const { token, user } = res.data;

        // store token
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // update redux
        dispatch(
          loginSuccess({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          })
        );

        navigate("/");
      }
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  useEffect(() => {
    /* global google */
    const initializeGoogle = () => {
      if (window.google) {
        console.log("Google Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleLogin,
        });

        google.accounts.id.renderButton(
          document.getElementById("google-login-btn"),
          { theme: "outline", size: "large", width: "250" }
        );
      }
    };

    if (!document.getElementById("google-login-script")) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.id = "google-login-script";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.body.appendChild(script);
    } else {
      initializeGoogle();
    }
  }, []);

  return <div id="google-login-btn" className="flex justify-center mt-2"></div>;
};

export default GoogleBtn;
