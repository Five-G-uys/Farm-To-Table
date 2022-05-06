import axios from "axios";

// export function to product pages component
export const updatedEvent = async (eventId: number, updatedEvent: any) => {
  try {
    // axios always has data property available on response obj so can destructure here
    const { data } = await axios.patch(
      `/api/events/${eventId}`,
      updatedEvent
    );
    console.log("LINE 7 || EVENT CALLS", data);
    return data;
  } catch (err) {
    console.error("LINE 10 || EVENT CALLS", err);
    return { error: err };
  }
};


