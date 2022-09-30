import axios from "axios";
import { useEffect, useState } from "react";
import s from "./Adress.module.scss";

type street = { id: string; place_name: string };

const Adress = () => {
  const [street, setStreet] = useState("");
  const [streetInput, setStreetInput] = useState("");
  const [searchResults, setSearchResults] = useState<street[] | null>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(streetInput);
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${streetInput}.json?bbox=30.238723,50.324251,30.753184,50.537933&access_token=pk.eyJ1IjoidmFsZW50aW5vczIxNSIsImEiOiJjbDhuYzN5N3gwZXJiM29vYW5vdzJndzNtIn0.sXTtaj_m9upSxo6msqBwRA&limit=7&country=UA&language=uk&fuzzyMatch=true`,
          {
            headers: {
              types: "address",
            },
          }
        )
        .then((resp) => {
          setSearchResults(resp.data.features);
          console.log(resp.data.features);
        });
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [streetInput]);

  //   axios
  //     .get(
  //       "https://api.mapbox.com/geocoding/v5/mapbox.places/володимира.json?bbox=30.238723,50.324251,30.753184,50.537933&access_token=pk.eyJ1IjoidmFsZW50aW5vczIxNSIsImEiOiJjbDhuYzN5N3gwZXJiM29vYW5vdzJndzNtIn0.sXTtaj_m9upSxo6msqBwRA&limit=7&country=UA&language=uk&fuzzyMatch=true",
  //       {
  //         headers: {
  //           types: "address",
  //         },
  //       }
  //     )
  //     .then((resp) => setSearchResults(resp.data.features));

  return (
    <div className={s.adress}>
      <h3>Adress</h3>
      <form className={s.form}>
        <div className={s.form__row}>
          <input className={s.expand} placeholder="Choose city"></input>
          <input
            className={s.expand}
            placeholder="start typing..."
            value={streetInput}
            onChange={(e) => setStreetInput(e.target.value)}
          ></input>
        </div>
        <div className={`${s.form__row} ${s.two}`}>
          <input name="house" placeholder="House"></input>
          <input name="apartment" placeholder="Apartment"></input>
          <input name="entrance" placeholder="Entrance"></input>
        </div>
      </form>
    </div>
  );
};

export default Adress;
