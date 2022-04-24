// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UrlWithStringQuery } from "node:url";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AppProps {
  eventName: string;
  description: string;
  thumbnail: UrlWithStringQuery;
  category: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Event = ({ eventName, description, thumbnail, category }: AppProps) => {
  console.log("LINE 37", eventName, description, thumbnail);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const { eventName, description, category, thumbnail } = event;
  return (
    <div>
      <h1>{eventName}</h1>
      <h3>{description}</h3>
      <h3>{category}</h3>
      <img src={thumbnail} />
    </div>
  );
};

export default Event;
