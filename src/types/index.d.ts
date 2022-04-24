export {};
//import cloudinary from "@cloudinary/react";
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cloudinary: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //gtag: (...args: any[]) => void;
  }
}
