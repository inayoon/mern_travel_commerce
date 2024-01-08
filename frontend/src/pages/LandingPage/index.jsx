import React, { useState, useEffect } from "react";
import Checkbox from "./Sections/Checkbox";
import RadioBox from "./Sections/RadioBox";
import SearchInput from "./Sections/SearchInput";
import CardItem from "./Sections/CardItem";
import axiosInstance from "../../utils/axios";
import { continents } from "../../utils/filterData";

export default function LandingPage() {
  const limit = 4;
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  useEffect(() => {
    fetchProducts({ skip, limit });
  }, []);

  const fetchProducts = async ({
    skip,
    limit,
    loadMore = false,
    filters = {},
    searchTerm = "",
  }) => {
    const params = {
      skip,
      limit,
      filters,
      searchTerm,
    };
    try {
      const response = await axiosInstance.get("/products", { params });
      if (loadMore) {
        setProducts([...products, ...response.data.products]);
      } else {
        setProducts(response.data.products);
      }
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters,
    };
    fetchProducts(body);
    setSkip(skip + limit);
  };

  const handleFilters = (newFilteredData, category) => {
    const newFilters = { ...filters };
    newFilters[category] = newFilteredData;
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const showFilteredResults = (filters) => {
    const body = {
      skip: 0,
      limit,
      filters,
    };
    fetchProducts(body);
    setSkip(0);
  };

  return (
    <section>
      <div className="text-center m-7">
        <h2 className="text-2xl">Choose Your Travel Package</h2>
      </div>
      {/* filter */}
      <div className="flex gap-3">
        <div className="w-1/2">
          <Checkbox
            continents={continents}
            checkedContinents={filters.continents}
            onFilters={(filters) => handleFilters(filters, "continents")}
          />
        </div>
        <div className="w-1/2">
          <RadioBox />
        </div>
      </div>
      {/* Search */}
      <div className="flex justify-end">
        <SearchInput />
      </div>

      {/* Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((product) => (
          <CardItem product={product} key={product._id} />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
            onClick={handleLoadMore}
          >
            More
          </button>
        </div>
      )}
    </section>
  );
}
