import React from "react";
import { Link } from "react-router-dom";

interface IStoreForm {
  id: string;
  name: string;
  storeImage: string;
}

export const Store: React.FC<IStoreForm> = ({ id, storeImage, name }) => (
  <Link to={`/store/${id}`}>
    <div className="flex flex-col">
      <div
        style={{ backgroundImage: `url("/assets/main.jpg")` }}
        className="mt-5 py-96 bg-cover"
      ></div>
      <h3 className="text-lg font-medium">{name}</h3>
    </div>
  </Link>
);
