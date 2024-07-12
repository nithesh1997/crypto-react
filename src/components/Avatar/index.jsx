import React from 'react';
import { Image } from 'react-bootstrap';

function Avatar({ src, alt, size }) {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    objectFit: 'cover',
  };

  return <Image src={src} alt={alt} style={avatarStyle} />;
}

export default Avatar;
