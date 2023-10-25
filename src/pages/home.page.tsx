import { useState } from "react";

import { babies } from "@/api";
import { BabyData } from "@/api/types";

const allGenders = ["FEMALE", "MALE"];

export const HomePage = () => {
  const [name, setName] = useState("");

  /**
   * Handle button click event to generate a random name based on the selected gender.
   * @param gender - The gender to filter by (e.g., 'female' or 'male').
   */
  const handleButtonClick = (gender: BabyData["gender"]) => {
    const genderFilter = gender.toUpperCase();

    const filteredBabies = babies.filter((baby) => {
      return baby[1] === genderFilter;
    });

    console.log(filteredBabies.length);

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
    const rawName = filteredBabies[randomIndex][3];
    const formattedName =
      rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();
    setName(formattedName);
  };

  return (
    <div className="m-4 md:m-0 pt-12 px-6  bg-white text-center max-w-2xl item rounded-xl min-h-[320px]">
      <div className="text-center space-y-2">
        <p>🧬</p>
        <h1 className="text-3xl font-semibold">Baby Name Generator</h1>
        <p className="text-sm">
          Choose a gender to generate a random baby name
        </p>
      </div>
      <div className="mt-12 space-y-6">
        <div className="space-x-2">
          {allGenders &&
            allGenders.map((gender) => {
              return (
                <button
                  key={gender}
                  onClick={() => handleButtonClick(gender)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                  {gender}
                </button>
              );
            })}
        </div>
        {name && (
          <div className="text-center">
            <p className="text-2xl font-semibold">{name}</p>
          </div>
        )}
      </div>
    </div>
  );
};
