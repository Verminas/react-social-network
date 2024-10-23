import { instanceNews } from "common/instances/instanceNews";

export const newsAPI = {
  getNews(arg: GetNewsRequestType) {
    const countries = arg.countries || "us";
    const categories = arg.categories || "";
    const sort = arg.sort || "published_desc";
    const limit = arg.limit || 5;

    return instanceNews
      .get<GetNewsResponseType>(
        `news?access_key=${process.env.REACT_APP_API_KEY_NEWS}&countries=${countries}&categories=${categories}&sort=${sort}&limit=${limit}`,
      )
      .then((data) => data.data);
  },
};

//types
export type NewsItemType = {
  author: string;
  category: string;
  country: string;
  description: string;
  image: string | null;
  language: string;
  published_at: string;
  source: string;
  title: string;
  url: string;
};

type GetNewsResponseType = {
  data: NewsItemType[];
  pagination: {
    count: number;
    limit: number;
    offset: number;
    total: number;
  };
};

export type GetNewsRequestType = {
  countries: NewsCountries;
  categories: NewsCategory;
  sort: NewsSortType;
  limit?: number;
};

export type NewsCategory =
  | "general"
  | "business"
  | "entertainment"
  | "health"
  | "science"
  | "sports"
  | "technology";

export type NewsCountries = "us" | "de" | "pl" | "it" | "fr";

export type NewsSortType = "published_desc" | "published_asc" | "popularity";
