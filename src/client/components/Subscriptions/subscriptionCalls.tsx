import axios from 'axios';

// export function to product pages component
export const updateSubscription = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscriptionId: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedSubscription: any
) => {
  try {
    // axios always has data property available on response obj so can destructure here
    const { data } = await axios.patch(
      `/api/subscribed/${subscriptionId}`,
      updatedSubscription
    );
    console.log('LINE 14 || Subscription CALLS', data);
    return data;
  } catch (err) {
    console.error('LINE 10 || Subscription CALLS', err);
    return { error: err };
  }
};
// export function to product pages component
// export const deleteSubscription = async (
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   subscriptionId: any
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   // deletedSubscription: any
// ) => {
//   try {
//     // axios always has data property available on response obj so can destructure here
//     const { data } = await axios.delete(
//       `/api/subscriptions/${subscriptionId}`,
//       {
//         params: { id: subscriptionId },
//       }
//     );
//     console.log('LINE 38 || Subscription CALLS', data);
//     return data;
//   } catch (err) {
//     console.error('LINE 41 || Subscription CALLS', err);
//     return { error: err };
//   }
// };
