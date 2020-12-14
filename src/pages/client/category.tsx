import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantList from '../../components/restaurant-list';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { category, categoryVariables } from '../../__generated__/category';

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

const Category = () => {
  const [page, setPage] = useState(1);
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const params = useParams<ICategoryParams>();

  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: page,
          slug: params.slug,
        },
      },
    }
  );

  console.log(data);

  return (
    <RestaurantList
      restaurants={data?.category.restaurants}
      page={page}
      totalPages={data?.category.totalPages}
      onNextPageClick={onNextPageClick}
      onPrevPageClick={onPrevPageClick}
    ></RestaurantList>
  );
};

export default Category;
