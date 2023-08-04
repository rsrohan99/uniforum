'use client'

import React from 'react';
import Typewriter from 'typewriter-effect';

import './typewriter.css'

interface TRProps {
  lines: string[],
}

const TypewriterEffect: React.FC<TRProps> = ({lines}) => {
  return (
    <Typewriter
      options={{
        strings: lines,
        delay: 40,
        deleteSpeed: 10,
        autoStart: true,
        loop: true,
      }}
    />
  );
}

export default TypewriterEffect;