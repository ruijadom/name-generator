import React, { useEffect, useMemo, useState } from "react";

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

/**
 * Props for the BabyCard component.
 */
export interface BabyCardProps {
  title: string;
  description: string;
  genders: GenderType[];
  data: string[][];
}

/**
 * BabyCard component that displays baby information and allows filtering.
 */
export const BabyCard: React.FC<BabyCardProps> = ({
  title,
  description,
  genders,
  data: babies,
}: BabyCardProps) => {
  const [currentBabies, setCurrentBabies] = useState<ParsedBabyData[]>([]);
  const [generatedBaby, setGeneratedBaby] = useState<ParsedBabyData | undefined>();
  const [currentGender, setCurrentGender] = useState<GenderType | undefined>();
  const [currentEthnicity, setCurrentEthnicity] = useState<string | undefined>();

  const memoizedParsedData = useMemo(() => {
    return babies.map((baby) => ({
      year: baby[8],
      gender: baby[9],
      ethnicity: baby[10],
      name: baby[11],
      numBabies: parseInt(baby[12], 10),
      popularity: parseInt(baby[13], 10),
    }));
  }, [babies]);

  useEffect(() => {
    const maxNumBabies = Math.max(
      ...memoizedParsedData
        .filter((baby) => baby.popularity === 1)
        .map((baby) => baby.numBabies)
    );

    const filteredBabies = currentBabies.filter(
      (baby) => baby.popularity === 1 && baby.numBabies !== maxNumBabies
    );

    if (filteredBabies.length === 0) {
      setCurrentBabies([]);
    } else {
      setCurrentBabies(filteredBabies);
    }

    setCurrentBabies(memoizedParsedData);
  }, [memoizedParsedData]);

  useEffect(() => {
    console.log(memoizedParsedData);
  }, [memoizedParsedData]);

  const memoizedEthnicity = useMemo(() => {
    return [...new Set(babies.map((baby) => baby[10]))];
  }, [babies]);

  const handleGenderButtonClick = (gender: GenderType) => {
    setCurrentGender(gender);
  };

  const handleEthGeneration = (eth: string) => {
    setCurrentEthnicity(eth);
  };

  const handleNameGeneration = () => {
    if (!currentEthnicity || !currentGender) {
      setGeneratedBaby(undefined);
      return;
    }

    const selectedBaby = getRandomObjectFromArray(currentBabies);

    if (selectedBaby) {
      console.log(selectedBaby);
      setGeneratedBaby(selectedBaby);
    }
  };

  useEffect(() => {
    if (!currentGender && !currentEthnicity) {
      setCurrentBabies(memoizedParsedData);
      return;
    }

    const filteredBabies = memoizedParsedData.filter(
      (baby) =>
        baby.ethnicity === currentEthnicity && baby.gender === currentGender
    );

    setCurrentBabies(filteredBabies);
  }, [currentEthnicity, currentGender, memoizedParsedData]);

  return (
    <Card className="min-h-[300px]">
      <CardHeader className="bg-slate-50 rounded-t-xl">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-12">
        <div className="space-y-8 text-center">
          <div className="w-full flex space-x-4">
            {genders.map((gender) => (
              <button
                key={gender}
                onClick={() => handleGenderButtonClick(gender)}
                className={cn(
                  "text-white font-semibold py-2 px-4 w-full rounded focus:ring",
                  gender === "FEMALE"
                    ? "bg-pink-500 hover-bg-pink-700 ring-pink-300"
                    : "bg-blue-500 hover-bg-blue-700 ring-blue-300"
                )}
              >
                {formatName(gender)}
              </button>
            ))}
          </div>
          <div className="inline-flex flex-nowrap space-x-2">
            {memoizedEthnicity &&
              memoizedEthnicity.map((eth) => (
                <button
                  key={eth}
                  disabled={!memoizedEthnicity}
                  className={cn(
                    "text-white font-normal text-xs py-2 px-4 rounded focus:ring active:ring-4",
                    "bg-slate-500 hover-bg-slate-700 ring-slate-300",
                    { "bg-slate-900": currentEthnicity === eth }
                  )}
                  onClick={() => handleEthGeneration(eth)}
                >
                  {eth}
                </button>
              ))}
          </div>
          <button
            disabled={!currentGender && !currentEthnicity}
            className={cn(
              "text-white font-semibold py-2 px-4 w-full rounded focus:ring",
              "bg-purple-500 hover-bg-purple-700 ring-purple-300",
              { "disabled:opacity-50": !currentGender && !currentEthnicity }
            )}
            onClick={handleNameGeneration}
          >
            Name Gen
          </button>
          {generatedBaby ? (
            <pre className="text-2xl font-medium">
              {JSON.stringify(generatedBaby, null, 2)}
            </pre>
          ) : (
            <p className="text-2xl">🧬</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
