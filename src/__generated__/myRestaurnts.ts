/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myRestaurnts
// ====================================================

export interface myRestaurnts_myRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface myRestaurnts_myRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: myRestaurnts_myRestaurants_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface myRestaurnts_myRestaurants {
  __typename: "MyRestaurantsOutput";
  ok: boolean;
  error: string | null;
  restaurants: myRestaurnts_myRestaurants_restaurants[];
}

export interface myRestaurnts {
  myRestaurants: myRestaurnts_myRestaurants;
}
