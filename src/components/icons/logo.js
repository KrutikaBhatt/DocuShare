import React from 'react';
import logo_icon from 'assets/images/ICON_2.png';


const Logo = ({ isWhite, ...props }) => {
  return (
    <img src={logo_icon} className="responsive_logo"></img>
  );
};

export default Logo;
