import React from 'react';
import axios from 'axios';
interface aProps {
  season: string;
  year: number;
  flat_price: number;
  weekly_price: number;
  description: string;
  start_date: string;
  end_date: string;
  subscription_id: number;
}

const SubscriptionCard = ({
  season,
  year,
  flat_price,
  weekly_price,
  description,
  start_date,
  end_date,
  subscription_id,
}: aProps) => {
  // SUBSCRIPTION DELETE
  // make a DELETE request to handle delete
  const handleDeleteSubscription = () => {
    axios
      .delete(`/api/subscriptions/delete`, {
        params: { subscription_id: subscription_id },
      })
      .then((data: any) => {
        console.log('Subscription DELETE Success!', data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='card'>
      <div className='form-event'>
        <h1>
          {season} {year}
        </h1>
        <h2>
          Flat Price: $ {flat_price}.00 / Weekly Price: $ {weekly_price}
        </h2>
        <h3>{description}</h3>
        <h4>
          Seasonal Dates: {start_date} - {end_date}
        </h4>
        <button>Edit</button>
        <button onClick={handleDeleteSubscription}>Delete</button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
