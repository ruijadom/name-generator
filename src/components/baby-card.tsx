import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BabyData } from "@/api/types";
import { formatName, generateRandomIndex } from "@/utils";
import { cn } from "@/lib/utils";

interface BabyCardProps {
  title: string;
  description: string;
  genders: string[];
  data: string[][];
}

export const BabyCard = ({
  title,
  description,
  genders,
  data: babies,
}: BabyCardProps) => {
  const [name, setName] = useState("");

  /**
   * Handle button click event to generate a random name based on the selected gender.
   * @param gender - The gender to filter by (e.g., 'female' or 'male').
   */
  const handleButtonClick = (currentGender: BabyData["gender"]) => {
    const genderFilter = currentGender.toUpperCase();
    
    const filteredBabies = babies.filter((baby) => {
      return baby[1] === genderFilter;
    });
    
    if (filteredBabies.length === 0) return;

    /**
     * Generate a random index within the range of filteredBabies array length.
     * Use this random index to get a baby's name and format it.
     */
    const rawName =
      filteredBabies[generateRandomIndex(filteredBabies.length)][3];
    const formattedName = formatName(rawName);
    setName(formattedName);
  };

  return (
    <Card className="min-h-[260px]">
      <CardHeader className="bg-slate-50 rounded-t-xl">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-12">
        <div className="space-y-8 text-center">
          <div className="w-full flex space-x-4">
            {genders.map((gender) => {
              return (
                <button
                  key={gender}
                  onClick={() => handleButtonClick(gender)}
                  className={cn(
                    " text-white font-semibold py-2 px-4 w-full rounded",
                    gender === "FEMALE"
                      ? "bg-pink-500 hover:bg-pink-700"
                      : "bg-blue-500 hover:bg-blue-700"
                  )}
                >
                  {formatName(gender)}
                </button>
              );
            })}
          </div>
          {name ? (
            <div>
            <p className="text-2xl font-medium">{name}</p>
            </div>
          ) : (
            <p className="text-2xl">🧬</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
