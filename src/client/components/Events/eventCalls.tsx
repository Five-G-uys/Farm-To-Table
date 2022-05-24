import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// export function to product pages component
export const updatedEvent = async (eventId: number, updatedEvent: any) => {
  try {
    // axios always has data property available on response obj so can destructure here
    const { data } = await axios.patch(
      `/api/events/${eventId}`,
      updatedEvent
    );
    toast.success('Event Updated', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // console.log("LINE 7 || EVENT CALLS", data);
    return data;
  } catch (err) {
    console.error("LINE 10 || EVENT CALLS", err);
    return { error: err };
  }
};


