import { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from "./store/homeSlice";

import Header from "./components/header/Header";
import Fotter from "./components/fotter/Fotter";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import searchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const {url} = useSelector((state) =>
  state.home);
  console.log(url);

  useEffect(() => {
  fetchApiConfig();
}, []);
  
  const fetchApiConfig = () => {
   fetchDataFromApi("configuration").then((res) =>{
    console.log(res);
    const url={
      backdrop: res.images.secure_base_url + "original",
      poster: res.images.secure_base_url + "original",
      profile: res.images.secure_base_url + "original",
    };
    dispatch(getApiConfiguration(res));
   })
   .catch((error) => {
    // Handle any errors that occurred during the API call or processing
    console.error("Error fetching API configuration:", error);
  });
  };

  return (
  <BrowserRouter>
  {/* <Header /> */}
  <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/:mediaType/:id" element={<Details />} />
     <Route path="search/:query" element={<searchResult />} />
     <Route path="/explore/:mediaType" element={<Explore/>} />
     <Route path="*" element={<PageNotFound />} />
  </Routes>
  {/* <Fotter /> */}
  </BrowserRouter>
  );
}

export default App;



