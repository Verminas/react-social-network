// @flow
import * as React from "react";
import { formatDate } from "common/utils/formatDate";
import { NewsItemType } from "features/SocialNetwork/api/newsAPI";
import { Card } from "antd";
import { useContext } from "react";
import { WindowWidthContext } from "app/App";

const noImage =
  "https://png.pngtree.com/png-clipart/20190925/original/pngtree-no-avatar-vector-isolated-on-white-background-png-image_4979074.jpg";

type Props = {
  item: NewsItemType;
};
export const NewsItem = ({ item }: Props) => {
  const { isTabletWidth } = useContext(WindowWidthContext);
  return (
    <Card
      title={item.source.toUpperCase()}
      extra={<a href={item.url}>{"More"}</a>}
      style={{ minWidth: 200, maxWidth: 700, margin: "0 auto 20px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "15px",
        }}
      >
        <div>
          <h3>{item.title}</h3>
          <p style={{ marginBottom: 10 }}>{`#${item.category}`}</p>
          <p>{item.description}</p>
          <p>{item.author}</p>
          <p>{formatDate(item.published_at)}</p>
        </div>
        {!isTabletWidth ? (
          <img
            src={item.image || noImage}
            alt="news url"
            style={{
              width: "30%",
              minWidth: "150px",
              aspectRatio: 1,
              borderRadius: 5,
              objectFit: "cover",
            }}
          />
        ) : (
          ""
        )}
      </div>
    </Card>
  );
};
