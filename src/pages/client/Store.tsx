import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder, readOneStore } from "../../api/api";
import { Dish } from "../../components/dish";

interface IStoreParams {
  id: string;
}

interface IStoreForm {
  createAt: string;
  updatedAt: string;
  menuImages: string[];
  menus: string[];
  id: number;
  name: string;
  storeImage: string;
  description: string;
}

export const Store = () => {
  const { id } = useParams<keyof IStoreParams>() as { id: string };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IStoreForm>();
  const [destination, setDestination] = useState("");
  const onChangeDestination = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setDestination(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await readOneStore(+id);
        setData(response?.data.store);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setLoading(false);
    console.log(loading);
  }, []);
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<string[]>([]);
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const getItem = (name: string) => {
    return orderItems.find((order) => order === name);
  };
  const isSelected = (name: string) => {
    return Boolean(getItem(name));
  };
  const addItemToOrder = (name: string) => {
    if (isSelected(name)) {
      return;
    }
    setOrderItems((current) => [name, ...current]);
  };
  const removeFromOrder = (name: string) => {
    setOrderItems((current) => current.filter((dish) => dish !== name));
  };
  const triggerCancelOrder = () => {
    setOrderStarted(false);
    setOrderItems([]);
  };
  const navigation = useNavigate();
  const triggerConfirmOrder = async () => {
    if (orderItems.length === 0) {
      alert("Can't place empty order");
      return;
    }
    if (destination.length === 0) {
      alert("Please input your address");
      return;
    }
    const confirm = window.confirm("You are about to place an order");
    if (confirm) {
      const response = await createOrder({
        menus: orderItems,
        storeId: +id,
        location: destination,
      });
      const { ok, error, orderId } = response?.data;
      if (ok) {
        alert("주문이 완료되었습니다.");
        navigation(`/order/${orderId}`);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>{data?.name || ""} | Hermes Delivery</title>
      </Helmet>
      <div
        className=" bg-gray-800 bg-center bg-cover py-48"
        style={{
          backgroundImage: `url(/assets/big.jpg)`,
        }}
      >
        <div className="bg-white xl:w-3/12 py-8 pl-48">
          <h4 className="text-4xl mb-3">{data?.name}</h4>
        </div>
      </div>
      <div className="container pb-32 flex flex-col items-end mt-20">
        {!orderStarted && (
          <button onClick={triggerStartOrder} className="btn px-10 mr-3">
            Start Order
          </button>
        )}
        {orderStarted && (
          <div className="w-full mr-3">
            <div className="flex items-center justify-end">
              <button onClick={triggerConfirmOrder} className="btn px-10 mr-3">
                Confirm Order
              </button>
              <button
                onClick={triggerCancelOrder}
                className="btn px-10 bg-black hover:bg-black"
              >
                Cancel Order
              </button>
            </div>
            <div className="flex items-center justify-end">
              <input
                name="destination"
                type="Search"
                className="input flex rounded-md border-0 w-3/4 md:w-3/12 mt-5"
                placeholder="Input your address..."
                onChange={onChangeDestination}
              />
            </div>
          </div>
        )}

        <div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
          {data?.menus.map((dish, index) => (
            <Dish
              isSelected={isSelected(dish)}
              id={index}
              orderStarted={orderStarted}
              key={index}
              name={dish}
              description={"예시 메뉴입니다."}
              price={30000}
              isCustomer={true}
              addItemToOrder={addItemToOrder}
              removeFromOrder={removeFromOrder}
            ></Dish>
          ))}
        </div>
      </div>
    </div>
  );
};
