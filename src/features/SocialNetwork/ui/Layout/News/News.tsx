import Spinner from "common/components/Spinner/Spinner";
import { NewsItem } from "features/SocialNetwork/ui/Layout/News/NewsItem/NewsItem";
import { Empty } from "antd";
import { S } from "./News.styles";
import { useNews } from "../../../lib/useNews";

const categoryOptions = [
  { value: "general", label: "General" },
  { value: "business", label: "Business" },
  { value: "entertainment", label: "Entertainment" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" }
];
const countryOptions = [
  { value: "us", label: "USA" },
  { value: "de", label: "Germany" },
  { value: "pl", label: "Poland" },
  { value: "it", label: "Italy" },
  { value: "fr", label: "France" }
];
const sortOptions = [
  { value: "published_desc", label: "New" },
  { value: "published_asc", label: "Old" },
  { value: "popularity", label: "Popular" }
];


export const News = () => {
  const { dataNews, status, isNone, handleChangeCategory, handleChangeCountry, handleChangeSort } = useNews();

  const emptyDescription = status === "failed" ? "Some error occurred.." : "Try something else, there are no any news with those filters :(";

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <S.Section>
      <h2>News</h2>
      <S.SelectWrapper>
        <S.StyledSelect
          defaultValue="Category"
          onChange={handleChangeCategory}
          options={categoryOptions}
        />
        <S.StyledSelect
          defaultValue="Country"
          onChange={handleChangeCountry}
          options={countryOptions}
        />
        <S.StyledSelect
          defaultValue="Sort"
          onChange={handleChangeSort}
          options={sortOptions}
        />
      </S.SelectWrapper>
      {isNone || status === "failed" ? <Empty
          description={emptyDescription} />
        : <S.NewsWrapper>{
          dataNews.map((item, index) => (
            <NewsItem item={item} key={item.title + index} />
          ))
        }</S.NewsWrapper>
      }
    </S.Section>
  );
};
