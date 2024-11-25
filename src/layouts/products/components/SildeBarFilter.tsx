import React, { useState } from "react";
import "../../../css/ProductList.css";

interface FilterSidebarProps {
    onCategoryChange: (category: string) => void;
    onPriceChange: (min: number | undefined, max: number | undefined) => void;
    onRatingChange: (rating: number) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
                                                         onCategoryChange,
                                                         onPriceChange,
                                                         onRatingChange,
                                                     }) => {
    const categories: { [key: string]: { name: string; image: string } } = {
        electronics: {
            name: 'Electronics',
            image: '/electronics.png'
        },
        books: {
            name: 'Books',
            image: '/books.png'
        },
        clothing: {
            name: 'Clothing',
            image: '/fashion.png'
        },
        food: {
            name: 'Food',
            image: '/foods.png'
        },
        fitnit: {
            name: 'Fitnit',
            image: '/fitnit.png'
        },
        children: {
            name: 'Children',
            image: '/children.png'
        },
        home: {
            name: 'Home',
            image: '/home.png'
        },
    };

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000); // Set default max price as per your range

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMinPrice(value);
        onPriceChange(value, maxPrice);
    }


    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMaxPrice(value);
        onPriceChange(minPrice, value);
    };

    return (
        <div className="filter-sidebar  pt-4 "  style={{background:"white"}}>
            <h5 className="mt-2" style={{textAlign: "start"}}>Product Categories</h5>
            <ul className="list-unstyled">
                {Object.keys(categories).map((key) => (
                    <li key={key} className={"d-flex"}>
                        <input
                            type="radio"
                            name="category"
                            value={categories[key].name}
                            id={`category-${key}`}
                            onChange={(e) => onCategoryChange(e.target.value)}
                        />
                        <label className="ms-2" htmlFor={`category-${key}`}>
                            {categories[key].name}
                        </label>
                    </li>
                ))}
            </ul>

            <hr className="my-4"/>

            <h5 className="mb-4" style={{textAlign: "start"}}>Filter by Price</h5>
            <div className="d-flex mb-3" style={{marginLeft:"-20px"}}>
                <div>
                    <label style={{marginLeft:"-20px"}}>Min Price: {minPrice}</label>
                    <input
                        type="range"
                        className="form-control"
                        min={0}
                        max={maxPrice} // Max price should be the upper limit
                        value={minPrice}
                        onChange={handleMinPriceChange}
                    />
                </div>

                <div>
                    <label>Max Price: {maxPrice}</label>
                    <input
                        type="range"
                        className="form-control"
                        min={minPrice} // Min price should be the lower limit
                        max={1000} // Set the maximum price range
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                    />
                </div>
            </div>

            <hr className="my-4"/>

            <h5 className="mb-4 title-filter" style={{textAlign: "start"}}>Filter by Rating</h5>
            <ul className="list-unstyled">
                <li className={"d-flex"}>
                    <input
                        type="radio"
                        name="rating"
                        id="rating-5"
                        onChange={() => onRatingChange(5)}
                    />
                    <label className="ms-2" htmlFor="rating-5">
                        ★★★★★
                    </label>
                </li>
                <li className={"d-flex"}>
                    <input
                        type="radio"
                        name="rating"
                        id="rating-4"
                        onChange={() => onRatingChange(4)}
                    />
                    <label className="ms-2" htmlFor="rating-4">
                        ★★★★☆
                    </label>
                </li>
                <li className={"d-flex"}>
                    <input
                        type="radio"
                        name="rating"
                        id="rating-3"
                        onChange={() => onRatingChange(3)}
                    />
                    <label className="ms-2" htmlFor="rating-3">
                        ★★★☆☆
                    </label>
                </li>
                <li className={"d-flex"}>
                    <input
                        type="radio"
                        name="rating"
                        id="rating-2"
                        onChange={() => onRatingChange(2)}
                    />
                    <label className="ms-2" htmlFor="rating-2">
                        ★★☆☆☆
                    </label>
                </li>
                <li className={"d-flex"}>
                    <input
                        type="radio"
                        name="rating"
                        id="rating-1"
                        onChange={() => onRatingChange(1)}
                    />
                    <label className="ms-2" htmlFor="rating-1">
                        ★☆☆☆☆
                    </label>
                </li>
            </ul>
        </div>
    );
};

export default FilterSidebar;
