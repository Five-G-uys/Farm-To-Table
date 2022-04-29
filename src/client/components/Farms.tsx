import React from "react";

interface AppProps{
  name: string,
  description: string
}

const Farms = ({ name, description }: AppProps) => {

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>

  )
}

export default Farms