import React from "react";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Placeholder from "../components/Placeholder";
import { CNY_SYMBOL, ExtraCategoryName } from "../constants";
import { getExpenditureStatisticsByCategory } from "../helpers";
import { useApiStore } from "../store/api.store";

function CategoryExpenditureStatisticsGraph() {
  const bills = useApiStore((state) => state.bills);
  const statistics = getExpenditureStatisticsByCategory(bills);

  const billCategories = useApiStore((state) => state.billCategories);
  const categoryIdToNameMap = billCategories.reduce(
    (prevMap, category) => prevMap.set(category.id, category.name),
    new Map<string, string>()
  );

  const sortedStatisticItems = statistics
    .sort((a, b) => b[1] - a[1])
    .map(([categoryId, amount]) => {
      return (
        <ListItem key={categoryId} dense>
          <ListItemText
            primary={
              categoryIdToNameMap.get(categoryId) ?? ExtraCategoryName.NONE
            }
          />
          <Typography>{`${CNY_SYMBOL}${amount.toFixed(2)}`}</Typography>
        </ListItem>
      );
    });

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>当月支出分类统计</Typography>
      </CardContent>
      <Divider />
      {sortedStatisticItems.length ? (
        <List>{sortedStatisticItems}</List>
      ) : (
        <Placeholder>暂无数据</Placeholder>
      )}
    </Card>
  );
}

export default CategoryExpenditureStatisticsGraph;
