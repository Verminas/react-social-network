import { useEffect } from "react";
import { GetNewsRequestType, NewsCategory, NewsCountries, NewsSortType } from "../api/newsAPI";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/store";
import { newsActions, selectNews, selectNewsIsNone, selectNewsStatus } from "../model/newsSlice";

export const useNews = () => {
  const [searchParams, setSearchParams] = useSearchParams({});

  const dataNews = useSelector(selectNews);
  const isNone = useSelector(selectNewsIsNone);
  const status = useSelector(selectNewsStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const categories = searchParams.get("categories");
    const countries = searchParams.get("countries");
    const sort = searchParams.get("sort");

    const arg = { categories, countries, sort } as GetNewsRequestType;

    dispatch(newsActions.fetchNews(arg));
  }, [searchParams]);


  const handleSearchParamsChange = (paramsToUpdate: Partial<{
    categories: NewsCategory | "Category";
    countries: NewsCountries | "Country";
    sort: NewsSortType | "Sort"
  }>) => {
    setSearchParams((prevParams) => {
      return {
        categories: paramsToUpdate.categories ?? (prevParams.get("categories") || ""),
        countries: paramsToUpdate.countries ?? (prevParams.get("countries") || ""),
        sort: paramsToUpdate.sort ?? (prevParams.get("sort") || "")
      };
    });
  };

  const handleChangeCategory = (value: unknown | "Category") => {
    handleSearchParamsChange({ categories: value as NewsCategory });
  };

  const handleChangeCountry = (value: unknown | "Country") => {
    handleSearchParamsChange({ countries: value as NewsCountries });
  };

  const handleChangeSort = (value: unknown | "Sort") => {
    handleSearchParamsChange({ sort: value as NewsSortType });
  };

  return { dataNews, isNone, status, handleChangeCategory, handleChangeCountry, handleChangeSort };
};