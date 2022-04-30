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
  const [subscription, setSubscription] = useState({
    id: 0,
    season: '',
    year: 0,
    flat_price: 0,
    weekly_price: 0,
    description: '',
    start_date: '',
    end_date: '',
    subArray: [],
  });

  const getAllSubscriptions = () => {
    axios
      .get(`/api/subscriptions/`)
      .then((response) => {
        setSubscription((state) => {
          return { ...state, subArray: response.data };
        });
        // console.log('LINE 46 SubscriptionPage.tsx', response);
      })
      .catch((err) => {
        console.error('Line 49 subPage.tsx', err);
      });
  };

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

  // const handleSeasonEdits = () => {
  //   if (subArray) {
  //     console.log('LINE 75', subArray);
  //     axios
  //       .put(`/api/subscriptions/${id}`, {
  //         farm_id: 1,
  //         season: subArray.season,
  //         year: subArray.year,
  //         flat_price: subArray.flat_price,
  //         weekly_price: subArray.weekly_price,
  //         description: subArray.description,
  //         start_date: subArray.start_date,
  //         end_date: subArray.end_date,
  //       })
  //       .then((data) => {
  //         console.log('SUCCESS EDIT', data);
  //       })
  //       .catch((err) => {
  //         console.error('SUBSCRIPTION EDIT ERROR', err);
  //       });
  //   }
  // };

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
