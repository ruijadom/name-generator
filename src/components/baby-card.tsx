import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { GenderType, ParsedBabyData } from "@/api/types";

import { formatName, getRandomObjectFromArray } from "@/utils";
import { cn } from "@/lib/utils";

export interface BabyCardProps {
  title: string;
  description: string;
  genders: GenderType[];
  data: string[][];
}


export const BabyCard = ({
  title,
  description,
  genders,
  data: babies,
}: BabyCardProps) => {
  const [selectedGender, setSelectedGender] = useState<
    GenderType | undefined
  >();
  const [generatedName, setGeneratedName] = useState<string | undefined>("");

  /**
   * Memoized & Parses the baby data and converts popularity to integers.
   * @param babies - The baby data to parse.
   * @returns An array of parsed baby data.
   */
  const memoizedParsedData = useMemo((): ParsedBabyData[] => {
    // Parse the popularity to integers
    return babies.map((baby) => ({
      year: baby[0],
      gender: baby[1],
      ethnicity: baby[2],
      name: baby[3],
      numBabies: parseInt(baby[4], 10),
      popularity: parseInt(baby[5], 10),
    }));
  }, [babies]);

  /**
   * Generates a name based on gender and baby popularity data.
   */
  const handleGenerateName = (gender: GenderType) => {
    /**
     * Calculate the maximum number of babies with popularity 1 for the given gender.
     */
    const maxNumBabies = Math.max(
      ...memoizedParsedData
        .filter((baby) => baby.gender === gender && baby.popularity === 1)
        .map((baby) => baby.numBabies)
    );

    /**
     * Filter baby names based on gender, popularity, and not having the maximum number of babies.
     */
    const filteredBabies = memoizedParsedData.filter(
      (baby) =>
        baby.gender === gender &&
        baby.popularity === 1 &&
        baby.numBabies !== maxNumBabies
    );

    if (filteredBabies.length === 0) {
      setGeneratedName(undefined);
      return;
    }

    /**
     * Get a random object from the given array.
     */
    const selectedBaby = getRandomObjectFromArray(filteredBabies);

    if (selectedBaby) {
      setGeneratedName(formatName(selectedBaby?.name));
    }
  };

  /**
   * Handles the click of a gender button.
   * @param gender - The selected gender.
   */
  const handleGenderButtonClick = (gender: GenderType) => {
    setSelectedGender(gender);
    handleGenerateName(gender);
  };

  return (
    <Card className="min-h-[300px]">
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
                  onClick={() => handleGenderButtonClick(gender)}
                  className={cn(
                    " text-white font-semibold py-2 px-4 w-full rounded focus:ring",
                    gender === "FEMALE"
                      ? "bg-pink-500 hover-bg-pink-700 ring-pink-300"
                      : "bg-blue-500 hover-bg-blue-700 ring-blue-300"
                  )}
                >
                  {formatName(gender)}
                </button>
              );
            })}
          </div>
          {generatedName ? (
            <div>
              {selectedGender && (
                <p className="text-2xl font-medium">
                  {selectedGender === "FEMALE" ? "👧" : "👦"}
                </p>
              )}
              <p className="text-2xl font-medium">{generatedName}</p>
            </div>
          ) : (
            <p className="text-2xl">🧬</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
