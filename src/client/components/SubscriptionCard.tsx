import React from 'react';
// import axios from 'axios';
interface aProps {
  season: string;
  year: number;
  flatPrice: number;
  description: string;
}
const SubscriptionCard = ({ season, year, flatPrice, description }: aProps) => {
  return (
    <div>
      <h1>{season}</h1>
      <h2>{year}</h2>
      <h3>{flatPrice}</h3>
      <h4>{description}</h4>
    </div>
  );
};

export default SubscriptionCard;
