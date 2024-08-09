import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/verify-email/${token}`, {
          method: 'GET',
        });

        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
          setTimeout(() => {
            navigate('/login');
          }, 3000); // Redirect to login after 3 seconds
        } else {
          setMessage(data.message || "Verification failed");
        }
      } catch (error) {
        console.error("Verification error:", error.message);
        setMessage("An error occurred during verification");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h1 className="text-2xl font-bold">{message}</h1>
        <p>If verified, you will be redirected to the login page shortly.</p>
      </div>
    </div>
  );
}

export default VerifyEmail;
