import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { verifyEmail } from "../../api/auth"; // API function

export default function VerifyEmail() {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let timeoutId;
    
    if (token) {
      setIsLoading(true);
      setErrorMessage("");

      // Prevent multiple requests by delaying execution
      timeoutId = setTimeout(async () => {
        try {
          const response = await verifyEmail(token);
          setIsVerified(true);
          Swal.fire({
            icon: "success",
            title: response.message || "Email Verified Successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          setErrorMessage(error.response?.data?.message || "Invalid or Expired Token");
          Swal.fire({
            icon: "error",
            title: errorMessage,
            timer: 2000,
            showConfirmButton: false,
          });
        } finally {
          setIsLoading(false);
        }
      }, 5000); // Delay request for 5 seconds
    }

    return () => clearTimeout(timeoutId); // Cleanup function to clear timeout if component unmounts
  }, [token]);

  return (
<div className="d-flex vh-100 justify-content-center align-items-center">
  <div
    className="bg-light bg-opacity-50 border border-white border-opacity-25 shadow-lg rounded-3 p-4 p-md-5 text-center"
    style={{ backdropFilter: "blur(3px)", maxWidth: "500px", width: "100%" }}
  >
    {isLoading ? (
      <p className="fs-5 text-primary fw-bold">Verifying your email...</p>
    ) : isVerified ? (
      <p className="fs-5 text-success fw-bold">
        Email Verified Successfully! <br />
        You can now{" "}
        <a href="/auth/login" className="text-decoration-none text-warning">
          Login
        </a>.
      </p>
    ) : (
      <p className="fs-5 text-danger fw-bold">
        {errorMessage || "Verifying email..."}
      </p>
    )}
  </div>
</div>

  );
}
