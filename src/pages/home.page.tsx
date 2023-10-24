import { useState } from "react";
import { babies } from "@/api";

import { BabyData } from "../api/types";

const allGenders = ["FEMALE" , "MALE"];

export const HomePage = () => {
  const [name, setName] = useState("");

  /**
   * Handle button click event to generate a random name based on the selected gender.
   * @param gender - The gender to filter by (e.g., 'female' or 'male').
   */
  const handleButtonClick = (gender: BabyData["gender"]) => {
    const genderFilter = gender.toUpperCase();
    
    const filteredBabies = babies.filter((baby) => {
      return baby[1] === genderFilter
    });

    console.log(filteredBabies.length)

    if (filteredBabies.length === 0) {
      setName("No names found for this gender.");
      return;
    }

    /**
     * Generate a random index within the range of filteredBabies array length.
     */
    const randomIndex = Math.floor(Math.random() * filteredBabies.length);
    /**
     * Set the generated name in the state based on the random index.
     * Note: The name is obtained from the third element ([3]) of the selected baby's data.
     */
    setName(filteredBabies[randomIndex][3]);
  };

  return (
    <div>
      {allGenders && allGenders.map((gender) => {
        return (
          <button onClick={() => handleButtonClick(gender)}>{gender}</button>
        )
      })}
      {name && (
        <div>
          <h2>Generated Name:</h2>
          <p>{name}</p>
        </div>
      )}
    </div>
  );
};
