import React from 'react';
import { start } from 'repl';
import {
  handleSeasonEdits,
  handleDeleteSubscription,
} from './SubscriptionsPage';
interface aProps {
  season: string;
  year: number;
  flat_price: number;
  weekly_price: number;
  description: string;
  start_date: string;
  end_date: string;
}
const SubscriptionCard = ({
  season,
  year,
  flat_price,
  weekly_price,
  description,
  start_date,
  end_date,
}: aProps) => {
  return (
    <div className='card'>
      <div className='form-event'>
        <h1>
          {season} {year}
        </h1>
        <h2>
          Flat Price: $ {flat_price}.00 / Weekly Price: {weekly_price}
        </h2>
        <h3>{description}</h3>
        <h4>
          Seasonal Dates: {start_date} - {end_date}
        </h4>
        <button className='form--submit' onClick={() => handleSeasonEdits}>
          Edit
        </button>
        <button
          className='form--submit'
          onClick={() => handleDeleteSubscription}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
