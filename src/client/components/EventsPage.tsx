/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-var-requires
//import cloudinary from "cloudinary";
//window.cloudinary = cloudinary;
const EventsPage = () => {
  const [event, setEvent] = useState({
    eventName: "",
    description: "",
    thumbnail: "",
    category: "",
  });

  const handleInputEvent = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEvent((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
    console.log(event);
  };

  const postEvent = () => {
    axios
      .post("/event", {
        event: {
          eventName: event.eventName,
          description: event.description,
          thumbnail: event.thumbnail,
          category: event.category,
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((data) => console.log("saved!", data))
      .catch((err) => console.error(err));
  };
  console.log(process.env.CLOUD_PRESET2);
  const CLOUD_NAME = process.env.CLOUD_NAME;
  const CLOUD_PRESET2 = process.env.CLOUD_PRESET2;
  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: CLOUD_PRESET2,
      },
      (error: unknown, result: { event: string; info: { url: string } }) => {
        if (!error && result && result.event === "success") {
          console.log("LINE 56", result.info.url);
          setEvent((state) => {
            return {
              ...state,
              thumbnail: result.info.url,
            };
          });
          console.log("LINE 63", result.info.url);
        }
      }
    );
    widget.open();
  };

  //{ event: string; info: { url: string } })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [event.thumbnail]);
  console.log(event);
  const { eventName, description, thumbnail, category } = event;
  return (
    <div className="event">
      <h3 className="create-event">Create event</h3>
      <br></br>
      <div>
        <button onClick={showWidget} className="input-btn">
          Upload Image
        </button>
        <br></br>
        {thumbnail && <img src={thumbnail} />}
        <br></br>
        <br></br>
        <form onSubmit={postEvent}>
          <input
            type="text"
            placeholder="eventName"
            value={eventName}
            name="eventName"
            onChange={handleInputEvent}
          ></input>
          <br></br>
          <br></br>
          <textarea
            placeholder="description"
            value={description}
            name="description"
            onChange={handleInputEvent}
          ></textarea>
          <br></br>
          <br></br>
          {/* <textarea
            className="input"
            placeholder="thumbnail"
            value={thumbnail}
            name="thumbnail"
            onChange={handleInputEvent}
          ></textarea> */}

          <input
            className="name"
            type="text"
            placeholder="category"
            value={category}
            name="category"
            onChange={handleInputEvent}
          ></input>
          <button type="submit">Save event</button>
        </form>
      </div>
    </div>
  );
};

export default EventsPage;
