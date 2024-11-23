import React from "react";
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

    return (
        <div className="filter-sidebar bg-light p-4">
            <h5 className="mb-4">Product Categories</h5>
            <ul className="list-unstyled">
                {Object.keys(categories).map((key) => (
                    <li key={key}>
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

            <hr className="my-4" />

            <h5 className="mb-4">Filter by Price</h5>
            <div className="d-flex justify-content-between mb-3">
                <input
                    type="number"
                    className="form-control me-2"
                    placeholder="Min Price"
                    onChange={(e) => onPriceChange(Number(e.target.value), undefined)}
                />
                <input
                    type="number"
                    className="form-control ms-2"
                    placeholder="Max Price"
                    onChange={(e) => onPriceChange(undefined, Number(e.target.value))}
                />
            </div>

            <hr className="my-4" />

            <h5 className="mb-4">Filter by Rating</h5>
            <ul className="list-unstyled">
                <li>
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
                <li>
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
                <li>
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
                <li>
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
                <li>
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
