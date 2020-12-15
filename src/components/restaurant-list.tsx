import React from 'react';
import { category_category_restaurants } from '../__generated__/category';
import { restaurantsPageQuery_restaurants_results } from '../__generated__/restaurantsPageQuery';
import { Restaurant } from './restaurant';

interface IProps {
  restaurants: restaurantsPageQuery_restaurants_results[] | category_category_restaurants[] | null | undefined;
  page: number;
  totalPages: number | null | undefined;
  onPrevPageClick: () => void;
  onNextPageClick: () => void;
}

export const RestaurantList: React.FC<IProps> = ({
  restaurants,
  page,
  totalPages,
  onNextPageClick,
  onPrevPageClick,
}) => {
  return (
    <>
      <div className="grid md:grid-cols-3 mt-12 gap-x-5 gap-y-10">
        {restaurants?.map((restaurant) => (
          <Restaurant
            key={restaurant.id}
            id={restaurant.id + ''}
            coverImage={restaurant.coverImage}
            name={restaurant.name}
            categoryName={restaurant.category?.name}
          />
        ))}
      </div>
      <div className="mt-10 grid grid-cols-3 text-center max-w-md items-center mx-auto">
        {page > 1 ? (
          <button
            onClick={onPrevPageClick}
            className="focus:outline-none font-medium text-2xl"
          >
            &larr;
          </button>
        ) : (
          <div></div>
        )}
        <span>
          Page {page} of {totalPages}
        </span>
        {page !== totalPages ? (
          <button
            onClick={onNextPageClick}
            className="focus:outline-none font-medium text-2xl"
          >
            &rarr;
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};
