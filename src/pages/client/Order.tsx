import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { readOneOrder } from "../../api/api";
import { UserRole } from "../auth/create-account";

interface IParams {
  id: string;
}

interface IOrderParams {
  createAt: string;
  updatedAt: string;
  id: string;
  menus: string[];
  destination: string;
  store: {
    name: string;
    storeImage: string;
    description: string;
    location: string;
    menus: string[];
    menuImages: string[];
  };
  user: {
    email: string;
    role: UserRole;
    phoneNumber: string;
  };
}

export const Order = () => {
  const { id } = useParams<keyof IParams>() as { id: string };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IOrderParams>();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await readOneOrder(+id);
        setData(response?.data.order);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setLoading(false);
    console.log(data);
  }, []);
  return (
    <div className="mt-32 container flex justify-center">
      <Helmet>
        <title>Order #{id} | Hermes Delivery</title>
      </Helmet>
      <div className="border border-gray-800 w-full max-w-screen-sm flex flex-col justify-center">
        <h4 className="bg-gray-800 w-full py-5 text-white text-center text-xl">
          Order #{id}
        </h4>
        <h5 className="p-5 pt-10 text-3xl text-center ">$90000</h5>
        <div className="p-5 text-xl grid gap-6">
          <div className="border-t pt-5 border-gray-700">
            Prepared By: <span className="font-medium">{"맥도날드"}</span>
          </div>
          <div className="border-t pt-5 border-gray-700 ">
            Deliver To: <span className="font-medium">{data?.destination}</span>
          </div>

          <span className=" text-center mt-5 mb-3  text-2xl text-lime-600">
            Status: 배달중
          </span>

          <span className=" text-center mt-5 mb-3  text-2xl text-lime-600">
            Thank you for using Hermes Delivery
          </span>
        </div>
      </div>
    </div>
  );
};
