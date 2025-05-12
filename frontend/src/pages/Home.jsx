import React from 'react'
import Image2 from '../assets/images/Image2.jpg';
import "./HomePage.css";
import Typed from 'typed.js';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const typed = new Typed('.typed-text', {
      strings: ["Web Developer", "MERN Stack Developer", "Open Source Enthusiast"],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
    });
  
    return () => typed.destroy();
  }, []);

  return (
    <>
    <div className='container-fluid bg-black text-white py-5 px-5 mt-5' style={{height: "95vh"}}>
      <div className='row align-items-center'>
        <div className="col-md-5">
          <img src={Image2} alt="Profile" className="img-fluid profile-img mt-3" />
        </div>
    
        <div className="col-md-7 txt  text-md-start">
          <h1>Hi,<br />My name is Vivek Singh</h1>
          <span className="typed-text text-warning"></span>
          <span className="typed-cursor"></span>
        </div>
    
      <div className="row mt-3">
        <p className="lead col-10">Full Stack Developer | MERN Stack</p>
      </div>

    </div>
  </div>
  </>
  )
}
