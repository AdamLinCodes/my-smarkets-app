export type Sport = "american_football_match" | "basketball_match" | "football_match" | "ice_hockey_match" | "volleyball_match" | "golf_match";

export const sports: Sport[] = [
  "american_football_match",
  "basketball_match",
  "football_match",
  "ice_hockey_match",
  "volleyball_match",
  "golf_match"
];

export const sportDomains: Record<Sport, string> = {
  american_football_match: "american_football",
  basketball_match: "basketball",
  football_match: "football",
  ice_hockey_match: "ice_hockey",
  volleyball_match: "volleyball",
  golf_match: "golf"
};

export const sportDisplayNames: Record<Sport, string> = {
  american_football_match: "Football",
  basketball_match: "Basketball",
  football_match: "Soccer",
  ice_hockey_match: "Hockey",
  volleyball_match: "Volleyball",
  golf_match: "Golf"
};
