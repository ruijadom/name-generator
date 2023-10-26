import { useState, useEffect } from "react";

import { BabyCard } from "@/components/baby-card";

import { babies } from "@/api";

import { GenderType } from "@/api/types";

import { api } from "@/api";

const allGenders: GenderType[] = ["FEMALE", "MALE"];

export const HomePage = () => {
  const [babiesRes, setBabiesRes] = useState([]);

  async function getData() {
    try {
      const response = await api.get("/views/25th-nujf/rows.json");
      setBabiesRes(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <BabyCard
      title="Baby Name Generator"
      description="Choose a gender to generate a random baby name"
      genders={allGenders}
      data={babiesRes}
    />
  );
};
