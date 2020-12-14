import React from 'react'

interface IRestaurantProps {
  id: string;
  coverImage: string;
  name: string;
  categoryName?: string
}

const Restaurant: React.FC<IRestaurantProps> = ({ coverImage, name, categoryName }) => {
  return (
    
      <div className="flex flex-col">
        <div
          style={{ backgroundImage: `url(${coverImage})` }}
          className="py-28 bg-center bg-cover mb-3"
        ></div>
        <h3 className="text-xl font-medium">{name}</h3>
        <span className="border-t mt-3 py-2 text-xs opacity-50 border-gray-400">
          {categoryName}
        </span>
      </div>
  )
}

export default Restaurant
