import React, { useState,useEffect } from 'react'
import smile from "../assets/logos/smile.png";

const NavBar = ({logo}) => {
  const [show ,setShow] = useState(false)

  useEffect(()=>{
    window.addEventListener("scroll", ()=>{
      if(window.scrollY > 150){
        setShow(true)
      }else{
        setShow(false)
      }
    })
    // return ()=>{ 
    //   // window.removeEventListener("scroll")
    // }
  })
  return (
    <div className={`flex justify-between duration-1000 fixed top-0 w-full z-40 ${show && "bg-black duration-1000"}`}>
    <img src={logo} alt = "NetFlix Logo" className="h-28 w-32 object-contain rounded-full"/>
    <img src={smile} alt = "smile logo" className="h-20 w-20 object-contain pr-6"/>
    </div>
  )
}

export default NavBar