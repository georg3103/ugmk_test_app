import React from 'react';
import { useDispatch } from 'react-redux';
import { getSetProducts } from 'entities/product';

type Props = {
  children: React.ReactNode;
};
// TODO: add refetch prop
export function WithProducts (props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const loadProducts = () => dispatch(getSetProducts());

  React.useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      {props.children}
    </>
  );
}
