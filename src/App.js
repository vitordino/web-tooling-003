import React, { useState } from "react";
import useSWR from "swr";

const LIST_ALL_BREEDS_ENDPOINT = "https://dog.ceo/api/breeds/list/all";

const fetchJSON = async (endpoint) =>
  await fetch(endpoint).then((x) => x.json());

const getRandomItemFromArray = (array) =>
  array[Math.floor(Math.random() * array.length)];

const DogImage = ({ breed }) => {
  const { data } = useSWR(
    `https://dog.ceo/api/breed/${breed}/images/random`,
    fetchJSON
  );

  if (!data?.message) return null;
  return <img src={data.message} alt={breed} />;
};

const App = () => {
  const { data } = useSWR(LIST_ALL_BREEDS_ENDPOINT, fetchJSON);
  const [selectedBreed, setSelectedBreed] = useState(null);

  if (!data?.message) return null;

  const listOfBreeds = Object.keys(data.message);

  const selectRandomBreed = () =>
    setSelectedBreed(getRandomItemFromArray(listOfBreeds));

  return (
    <div>
      <div>
        <select
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
        >
          <option value={null}>---</option>
          {listOfBreeds.map((breed) => (
            <option value={breed}>{breed}</option>
          ))}
        </select>
        <button onClick={selectRandomBreed}>random</button>
      </div>
      {selectedBreed && <DogImage breed={selectedBreed} />}
    </div>
  );
};

export default App;
