// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UrlWithStringQuery } from "node:url";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AppProps {
  eventName: string;
  description: string;
  thumbnail: React.ImgHTMLAttributes<string>;
  category: string;
  eventDate: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Event = ({
  eventName,
  description,
  thumbnail,
  category,
  eventDate,
}: AppProps) => {
  console.log("LINE 37", eventName, description, thumbnail);

  return (
    <div>
      <section className="sect-event">
        <img src={thumbnail} className="event-img" />
        <h1 className="event-name">{eventName}</h1>
        <h3 className="event-desc">{description}</h3>
        <h3 className="event-category">{category}</h3>
        <h4 className="event-date">{eventDate}</h4>
      </section>
    </div>
  );
};

export default Event;
