import { BabyCard } from "@/components/baby-card";

import { babies } from "@/api";

import { GenderType } from "@/api/types";

const allGenders: GenderType[] = ["FEMALE", "MALE"];

export const HomePage = () => {
  return (
    <BabyCard
      title="Baby Name Generator"
      description="Choose a gender to generate a random baby name"
      genders={allGenders}
      data={babies}
    />
  );
};
