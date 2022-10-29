import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Test } from './Loader.style';

export const Loader = () => {
  return (
    <Test>
      <ThreeDots type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </Test>
  );
};
