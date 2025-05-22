import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth({ onClose }) {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const res = await fetch("/api/user/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          avatar: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center gap-2 py-2 px-3 mt-2"
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
      }}
      onClick={handleGoogleClick}
    >
      <FcGoogle size={20} />
      <span>Google</span>
    </div>
  );
}
