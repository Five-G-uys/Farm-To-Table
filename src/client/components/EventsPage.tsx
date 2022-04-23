import React, { useState, useEffect } from "react";
import axios from "axios";
//import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import cloudinary from "cloudinary";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createUploadWidget from "cloudinary";
// eslint-disable-next-line @typescript-eslint/no-var-requires
//import dotenv from "config();

const EventsPage = () => {
  const [farm, setFarm] = useState({
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
    setFarm((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
    console.log(farm);
  };

  const postEvent = () => {
    axios
      .post("/event", {
        event: {
          eventName: farm.eventName,
          description: farm.description,
          thumbnail: farm.thumbnail,
          category: farm.category,
          // thumbnail: farm.thumbnail,
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((data) => console.log("saved!", data))
      .catch((err) => console.error(err));
  };

  //CLOUDINARY USER PHOTO UPLOAD SETUP
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: `${process.env.CLOUD_NAME}`,
        uploadPreset: `${process.env.CLOUD_PRESET}`,
      },
      (error: unknown, result: { event: string; info: { url: string } }) => {
        if (!error && result && result.event === "success") {
          console.log("LINE 59", result.info.url);
          setFarm((state) => {
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

  //////////////////////////////////////////
  // const myWidget = window.cloudinary.createUploadWidget(
  //   {
  //     cloudName: "my_cloud_name",
  //     uploadPreset: "my_preset",
  //   },
  //   (error: unknown, result: { event: string; info: unknown }) => {
  //     if (!error && result && result.event === "success") {
  //       console.log("Done! Here is the image info: ", result.info);
  //     }
  //   }
  // );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [farm.thumbnail]);
  console.log(farm);
  const { eventName, description, thumbnail, category } = farm;
  return (
    <div className="farm-div">
      <h3 className="header-drink">Create event</h3>
      <br></br>
      <div>
        {/* <button onClick={showWidget} className="input-btn">
          Upload Image
        </button>
        <br></br>
        {thumbnail && <img src={thumbnail} />}
        <br></br> */}

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
          <textarea
            className="input"
            placeholder="thumbnail"
            value={thumbnail}
            name="thumbnail"
            onChange={handleInputEvent}
          ></textarea>
          <br></br>
          <br></br>
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
