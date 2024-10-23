import React, { useEffect, useState } from "react";
import Spinner from "common/components/Spinner/Spinner";
import {
  GetNewsRequestType,
  newsAPI,
  NewsCategory,
  NewsCountries,
  NewsItemType,
  NewsSortType,
} from "features/SocialNetwork/api/newsAPI";
import { NewsItem } from "features/SocialNetwork/ui/Layout/News/NewsItem/NewsItem";
import { Select } from "antd";
import { useSearchParams } from "react-router-dom";

export const News = () => {
  const [dataNews, setDataNews] = useState<NewsItemType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [isNone, setIsNone] = useState<boolean>(false);

  useEffect(() => {
    const categories = searchParams.get("categories");
    const countries = searchParams.get("countries");
    const sort = searchParams.get("sort");

    const arg = { categories, countries, sort } as GetNewsRequestType;
    console.log(arg);

    newsAPI.getNews(arg).then((res) => {
      if (res.pagination.total) {
        setDataNews(res.data);
        setIsNone(false);
      } else {
        setIsNone(true);
      }
    });
  }, [searchParams]);

  if (!dataNews.length) {
    return <Spinner />;
  }

  const handleChangeCategory = (value: NewsCategory | "Category") => {
    console.log(`${value}`);
    setSearchParams({
      categories: value,
      countries: searchParams.get("countries") || "",
      sort: searchParams.get("sort") || "",
    });
  };
  const handleChangeCountry = (value: NewsCountries | "Country") => {
    console.log(`${value}`);
    setSearchParams({
      categories: searchParams.get("categories") || "",
      countries: value,
      sort: searchParams.get("sort") || "",
    });
  };
  const handleChangeSort = (value: NewsSortType | "Sort") => {
    console.log(`${value}`);
    setSearchParams({
      categories: searchParams.get("categories") || "",
      countries: searchParams.get("countries") || "",
      sort: value,
    });
  };

  return (
    <section>
      <h2>News</h2>
      <div>
        <Select
          defaultValue="Category"
          style={{ width: 120 }}
          onChange={handleChangeCategory}
          options={[
            { value: "general", label: "General" },
            { value: "business", label: "Business" },
            { value: "entertainment", label: "Entertainment" },
            { value: "health", label: "Health" },
            { value: "science", label: "Science" },
            { value: "sports", label: "Sports" },
            { value: "technology", label: "Technology" },
          ]}
        />
        <Select
          defaultValue="Country"
          style={{ width: 120 }}
          onChange={handleChangeCountry}
          options={[
            { value: "us", label: "USA" },
            { value: "de", label: "Germany" },
            { value: "pl", label: "Poland" },
            { value: "it", label: "Italy" },
            { value: "fr", label: "France" },
          ]}
        />
        <Select
          defaultValue="Sort"
          style={{ width: 120 }}
          onChange={handleChangeSort}
          options={[
            { value: "published_desc", label: "New" },
            { value: "published_asc", label: "Old" },
            { value: "popularity", label: "Popular" },
          ]}
        />
      </div>
      {!isNone ? (
        dataNews.map((item, index) => (
          <NewsItem item={item} key={item.title + index} />
        ))
      ) : (
        <p>Try something other, there are no any news with that filteres</p>
      )}
    </section>
  );
};
