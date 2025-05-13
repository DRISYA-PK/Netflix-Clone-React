import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom' 
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { useRef } from "react";

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  const options = {
    method: "GET", // HTTP method: GET means retrieving data
    headers: {
      accept: "application/json", // Tells the server to respond with JSON
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTA2NjdiNDRjZjRjNjU2Y2YyMGJiYWRmN2I2OGEwNiIsIm5iZiI6MS43NDY3MDcyMTY0ODk5OTk4ZSs5LCJzdWIiOiI2ODFjYTMxMDllYmEyMjQ3MTI5M2FlN2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3mMgbD9eEOIJ9zJRLX_1lmZ02Fw7YI9-hvoYSEQheb8",
      //  Authorization is the API token used to authenticate with the TMDB API.
    },
  };

  useEffect(() => {
    //fetching data every page reload
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2> {title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link  to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
