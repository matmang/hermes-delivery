import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { allStores } from "../../api/api";
import { Store } from "../../components/store";

interface IFormProps {
  searchTerm: string;
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

export const Stores = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState<IStoreForm[]>([]);
  const [page, setPage] = useState(1);
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await allStores({ page });
        setStores(response?.data.stores);
        setTotalPages(response?.data.totalpages);
        setTotalItems(response?.data.totalItems);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setLoading(false);
    console.log(loading);
  }, [page]);
  return (
    <div>
      <Helmet>Home | Hermes Delivery</Helmet>
      <form className=" bg-teal-500 w-full py-40 flex items-center justify-center">
        <input
          name="searchTerm"
          type="Search"
          className="input rounded-md border-0 w-3/4 md:w-3/12"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
          <div className="grid mt-10 md:grid-cols-3 gap-x-5 gap-y-10">
            {stores.map((store) => (
              <Store
                key={store.id}
                id={store.id + ""}
                storeImage={store.storeImage}
                name={store.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span className="mx-5">
              {page} of {totalPages}
            </span>
            {page !== totalPages ? (
              <button
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
