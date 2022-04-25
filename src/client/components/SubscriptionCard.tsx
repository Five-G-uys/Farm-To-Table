import React from 'react';
// import axios from 'axios';
interface aProps {
  season: string;
  year: number;
  flat_price: number;
  description: string;
}
const SubscriptionCard = ({
  season,
  year,
  flat_price,
  description,
}: aProps) => {
  return (
    <div>
      <h1>
        {season} {year}
      </h1>
      <h2>Flat Price: ${flat_price}.00</h2>
      <h3>{description}</h3>
    </div>
  );
};

export default SubscriptionCard;
