/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./App";
// eslint-disable-next-line @typescript-eslint/no-var-requires

const EventsPage = () => {
  const user: any = useContext(UserContext);
  console.log('THIS IS WORKING', user);
  const [event, setEvent] = useState({
    eventName: "",
    description: "",
    thumbnail: "",
    category: "",
    eventDate: "",
    eventType: "",
    location: "",
  });

  const handleInputEvent = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = event.target;
    setEvent((state) => {
      return {
        ...state,
        [name]: type === "checkbox" ? checked : value,
      };
    });
    // console.log(event);
  };

  const postEvent = () => {
    axios
      .post("/events/api/event", {
        event: {
          eventName: event.eventName,
          description: event.description,
          thumbnail: event.thumbnail,
          eventDate: event.eventDate,
          eventType: event.eventType,
          location: event.location,
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((data) => console.log("saved!", data))
      .catch((err) => console.error(err));
  };
  // console.log(process.env.CLOUD_PRESET2);
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
          // console.log("LINE 56", result.info.url);
          setEvent((state) => {
            return {
              ...state,
              thumbnail: result.info.url,
            };
          });
          // console.log("LINE 63", result.info.url);
        }
      }
    );
    widget.open();
  };
  // useEffect(() => {}, [event.thumbnail]);
  // console.log(event);
  const { eventName, description, thumbnail, eventDate, eventType, location } =
    event;
  return (
    <div className="event">
      {/* <h1>{`${user}`}</h1> */}
      <h3 className="create-event">Create event</h3>
      <br></br>
      <div>
        <button onClick={showWidget} className="input-btn">
          Add event image
        </button>
        <br></br>
        {thumbnail && <img src={thumbnail} />}
        <br></br>
        <br></br>
        <form onSubmit={postEvent} className="form-event">
          Name of Event
          <input
            type="text"
            placeholder="Name of event"
            value={eventName}
            name="eventName"
            onChange={handleInputEvent}
            className="input"
          />
          <br></br>
          <br></br>
          Description
          <textarea
            className="text-form"
            placeholder="Description"
            value={description}
            name="description"
            onChange={handleInputEvent}
          ></textarea>
          <br></br>
          <br></br>
          Date of Event
          <input
            type="text"
            placeholder=" 05 / 30 / 2022"
            value={eventDate}
            name="eventDate"
            onChange={handleInputEvent}
            className="form-input"
          />
          Location
          <input
            type="text"
            placeholder="Location"
            value={location}
            name="location"
            onChange={handleInputEvent}
            className="form-input"
          />
          <fieldset>
            <legend className="radio-title">Type of event</legend>
            <input
              type="radio"
              id="Farmers Market"
              name="eventType"
              value="Farmers Market"
              checked={eventType === "Farmers Market"}
              onChange={handleInputEvent}
            />
            <label htmlFor="Farmers Market">Farmers Market</label>
            <br />
            <input
              type="radio"
              id="Customer Day"
              name="eventType"
              value="Customer Day"
              checked={eventType === "Customer Day"}
              onChange={handleInputEvent}
            />
            <label htmlFor="customerDay">Customer Day</label>
            <br />

            <input
              type="radio"
              id="Community Volunteering"
              name="eventType"
              value="Community Volunteering"
              checked={eventType === "Community Volunteering"}
              onChange={handleInputEvent}
            />
            <label htmlFor="Farmers-Market">Community volunteering</label>
            <br />
          </fieldset>
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
