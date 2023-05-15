import React from "react";
import { ProductBarChart } from 'widgets/productBarChar';
import { ProductFilter } from 'widgets/productFilter';
import { WithProducts } from 'entities/product';
import { Layout } from 'shared';
 
const DashboardPage = () => {
  return (
    <WithProducts>
      <Layout
        titleSlot={<ProductFilter />}
        contentSlot={<ProductBarChart />}
      />
    </WithProducts>
  );
};

export default DashboardPage;