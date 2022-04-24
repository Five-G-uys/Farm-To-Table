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
      .post("/api/event", {
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
      (error: any, result: { event: string; info: { url: string } }) => {
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
          Upload event image
        </button>
        <br></br>
        {thumbnail && <img src={thumbnail} />}
        <br></br>
        <br></br>
        <form onSubmit={postEvent} className="form-event">
          <input
            type="text"
            placeholder="eventName"
            value={eventName}
            name="eventName"
            onChange={handleInputEvent}
            className="input"
          />
          <br></br>
          <br></br>
          <textarea
            className="text-form"
            placeholder="description"
            value={description}
            name="description"
            onChange={handleInputEvent}
          ></textarea>
          <br></br>
          <br></br>
          <input
            type="text"
            placeholder="category"
            value={category}
            name="category"
            onChange={handleInputEvent}
            className="form-input"
          />
          <br></br>
          <br></br>
          <button type="submit" className="form--submit">
            Save event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventsPage;
