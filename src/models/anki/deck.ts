export type AnkiDeck = string;
export type AnkiResponse<T> = {
  result: T;
  error: string | null;
};

export type AnkiDeckStats = {
  name: string;
  new_count: number;
  learn_count: number;
  review_count: number;
  total_in_deck: number;
  deck_id: number;
};

export type DeckStatsMap = Record<string, AnkiDeckStats>;
