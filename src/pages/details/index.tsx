import React from "react";
import { RouteComponentProps } from "react-router";
import { ProductDetails } from 'widgets/productDetails';
import { WithProducts } from 'entities/product';
import { Layout } from 'shared';
import { translateMonthToRussian, capitalizeString } from 'shared';
import styles from "./Details.module.scss";

// TODO: move to shared + do the same in Dashboard
const dateFormatter = (monthIndex: number): string => {
  return capitalizeString(translateMonthToRussian(monthIndex)).slice(0, 3);
}

type Props = RouteComponentProps<{
  factory: string;
  month: string;
}>;

const Title = ({ factory , month }: { factory: string; month: string; }) => {
  const title = `Статистика по продукции фабрики ${factory} за ${dateFormatter(Number(month))}`
  return (
    <h3 className={styles.title}>{title}</h3>
  )
};
 
const DetailsPage = (props: Props) => {
  const { factory, month } = props.match.params;
  return (
    <WithProducts>
      <Layout
        titleSlot={<Title factory={factory} month={month} />}
        contentSlot={<ProductDetails factoryId={Number(factory)} date={Number(month)} />}
      />
    </WithProducts>
  );
};

export default DetailsPage;