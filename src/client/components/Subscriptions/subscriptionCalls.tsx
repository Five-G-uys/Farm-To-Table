// Import Dependencies
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// export function to product pages component
export const updateSubscription = async (
  subscriptionId: any,
  updatedSubscription: any,
) => {
  try {
    // axios always has data property available on response obj so can destructure here
    const { data } = await axios.patch(
      `/api/subscriptions/${subscriptionId}`,
      updatedSubscription,
    );
    toast.success('Subscription Updated', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    console.error('LINE 10 || Subscription CALLS', err);
    return { error: err };
  }
};
