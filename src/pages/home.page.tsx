import { BabyCard } from "@/components/baby-card";

import { babies } from "@/api";

const allGenders = ["FEMALE", "MALE"];

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
