import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [contact, setContact] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [verified, setVerified] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Video handling
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        video.play().catch(error => {
          console.log("Auto-play prevented:", error);
          video.muted = true;
          video.play();
        });
      };

      video.addEventListener('canplay', handleCanPlay);
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  const handleSendOTP = (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(contact)) {
      alert('Please enter a valid 10-digit number');
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    alert(`OTP sent: ${otp} (for demo only)`);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otpInput === generatedOtp) {
      setVerified(true);
      alert('✅ OTP Verified');
      navigate('/login');
    } else {
      alert('❌ Incorrect OTP');
      window.location.reload();
    }
  };

  return (
    <div className='min-h-screen w-screen flex items-center justify-center font-mono relative overflow-hidden'>
      {/* Video Background */}
      <video
        ref={videoRef}
        className='absolute z-0 object-cover w-full h-full'
        src="/assets/loginBG.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>
      
      {/* Semi-transparent overlay */}
      <div className='absolute z-1 w-full h-full bg-black/50'></div>
      
      {/* Registration Form */}
      <div className='flex flex-col items-center justify-center p-10 relative z-10 bg-white/20 backdrop-blur-sm rounded-lg group hover:scale-105 hover:shadow-xl/20 transition-all duration-300'>
        <h1 className='absolute top-1 font-mono font-bold text-xl'>Register</h1>
        <form className='flex flex-col gap-5' onSubmit={otpSent ? handleVerifyOTP : handleSendOTP}>
          <input
            className='border-1 text-center group-hover:scale-105 group-hover:shadow-xl/20 transition-all duration-300 hover:scale-100 p-2'
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder='First Name'
            required
          />
          <input
            className='border-1 text-center group-hover:scale-105 group-hover:shadow-xl/20 transition-all duration-300 hover:scale-100 p-2'
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder='Last Name'
          />
          <input
            className='border-1 text-center group-hover:scale-105 group-hover:shadow-xl/20 transition-all duration-300 hover:scale-100 p-2'
            type="text"
            name="contact"
            id="contact"
            onChange={(e) => setContact(e.target.value)}
            value={contact}
            placeholder='Enter contact number'
            maxLength={10}
            required
          />
          {otpSent && (
            <input
              className='border-1 text-center group-hover:scale-105 group-hover:shadow-xl/20 transition-all duration-300 hover:scale-102 p-2'
              type="text"
              placeholder='Enter OTP'
              maxLength={6}
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
            />
          )}
          <button
            type="submit"
            className='border-1 hover:bg-black hover:text-white duration-300 p-2'>
            {otpSent ? 'Verify OTP' : 'Get OTP'}
          </button>
        </form>

        {verified && <p className='mt-4 text-green-600'>OTP Verified Successfully!</p>}
      </div>
    </div>
  );
};

export default Register;