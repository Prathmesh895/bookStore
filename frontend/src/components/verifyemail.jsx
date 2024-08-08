import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function VerifyEmail() {
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/verify/${token}`);
        const result = await response.text();
        alert(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    verifyEmail();
  }, [token]);

  return <div>Verifying...</div>;
}

export default VerifyEmail;
