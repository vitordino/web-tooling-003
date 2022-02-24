import React, { useEffect, useState } from "react";

const LIST_ALL_BREEDS_ENDPOINT = "https://dog.ceo/api/breeds/list/all";

const fetchJSON = async (endpoint) =>
  await fetch(endpoint).then((x) => x.json());

const getRandomItemFromArray = (array) =>
  array[Math.floor(Math.random() * array.length)];

const DogImage = ({ breed }) => {
  const [dogImageSrc, setDogImageSrc] = useState(null);

  useEffect(() => {
    const updateDogImageSrc = async () => {
      const response = await fetchJSON(
        `https://dog.ceo/api/breed/${breed}/images/random`
      );
      setDogImageSrc(response?.message || null);
    };

    updateDogImageSrc();
  }, [breed]);

  if (!dogImageSrc) return null;
  return <img src={dogImageSrc} alt={breed} />;
};

const App = () => {
  const [allBreeds, setAllBreeds] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState(null);

  useEffect(() => {
    const getBreedsFromAPI = async () => {
      const response = await fetchJSON(LIST_ALL_BREEDS_ENDPOINT);
      if (!response?.message) return;
      const listOfBreeds = Object.keys(response?.message);
      setAllBreeds(listOfBreeds);
    };

    getBreedsFromAPI();
  }, [setAllBreeds]);

  useEffect(() => {
    document.title = selectedBreed;
  }, [selectedBreed]);

  if (!allBreeds) return <div>loading</div>;

  const selectRandomBreed = () =>
    setSelectedBreed(getRandomItemFromArray(allBreeds));

  return (
    <div>
      <div>
        <select
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
        >
          <option value={null}>---</option>
          {allBreeds.map((breed) => (
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
