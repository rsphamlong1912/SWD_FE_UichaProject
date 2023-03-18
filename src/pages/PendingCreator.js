import Home from './customer/components/MainPage/Home';
import '../assets/styles/home-creator.css';
import { useEffect, useState } from 'react';
import { api } from '~/services/axios';

const PendingCreator = () => {
  return (
    <>
      <h1>Yêu cầu của bạn đã được gửi đi, phản hồi sẽ sớm gửi đến bạn thông qua email</h1>
      <p>Check thường xuyên nhé</p>
    </>
  );
};

export default PendingCreator;
