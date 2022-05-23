export {};
//import cloudinary from "@cloudinary/react";
declare global {
  interface Window {
    cloudinary: any;
    //gtag: (...args: any[]) => void;
  }
}
