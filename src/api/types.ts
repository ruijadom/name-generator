export interface BabyData {
  year: string;
  gender: string;
  ethnicity: string;
  name: string;
  count: string;
  rank: string;
}

export type GenderType = "FEMALE" | "MALE";

export interface ParsedBabyData {
  year: string;
  gender: string;
  ethnicity: string;
  name: string;
  numBabies: number;
  popularity: number;
}
