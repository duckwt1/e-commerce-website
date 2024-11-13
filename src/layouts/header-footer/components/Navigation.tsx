import React, { useState, useEffect, useRef } from 'react';
import Button from "@mui/material/Button";
import { IoMdMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";

function Navigation() {
    const categories: { [key: string]: { name: string; subcategories: string[]; image: string } } = {
        electronics: {
            name: 'Electronics',
            subcategories: ['Laptop', 'Phone', 'Tablet', 'Camera'],
            image: '/electronics.png'
        },
        books: {
            name: 'Books',
            subcategories: ['Fiction', 'Non-fiction', 'Comics', 'Children'],
            image: '/books.png'
        },
        clothing: {
            name: 'Clothing',
            subcategories: ['Men', 'Women', 'Kids', 'Accessories'],
            image: '/fashion.png'
        },
        food: {
            name: 'Food',
            subcategories: ['Groceries', 'Snacks', 'Drinks'],
            image: '/foods.png'
        },
        fitnit: {
            name: 'Fitnit',
            subcategories: ['Smartwatch', 'Smartband', 'SmartScale'],
            image: '/fitnit.png'
        },
        children: {
            name: 'Children',
            subcategories: ['Toys', 'Clothes', 'Shoes'],
            image: '/children.png'
        },
        home: {
            name: 'Home',
            subcategories: ['Furniture', 'Kitchenware', 'Decor'],
            image: '/home.png'
        },
    };

    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [openSubCategory, setOpenSubCategory] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null);

    const toggleSubcategories = (categoryKey: string) => {
        setOpenCategory(openCategory === categoryKey ? null : categoryKey);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        console.log('Sidebar state:', !isSidebarOpen); // Debugging log
    };

    const togglesubSidebar = (openSubCategory: string) => {
        setOpenSubCategory(openCategory === openSubCategory ? null : openSubCategory);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setOpenCategory(null);
            setOpenSubCategory(null);

        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
// When the user scrolls, check if the navbar should become sticky


    return (
        <nav className={'navbarslick'} style={{ width: '100%', justifyContent: 'center', padding: '1px', margin: '0' }}>
            <div className={'container pb-1'} style={{ marginLeft:' 2%' }}>
                <div className={'row'} style={{ textAlign: 'start' }}>
                    <div className={'col-lg-2 col-sm-2 navPart1'}>
                        <div className={'catWrapper'} onClick={toggleSidebar}>
                            <Button className={'allCartTab align-items-center'}>
                                <span className={'iconmenu me-3'}><IoMdMenu /></span>
                                <span className={'text mt-1'} style={{ fontSize: '15px', fontWeight: "bold" }}>ALL CATEGORIES</span>
                                <span className={'iconangle ms-3 '}><FaAngleDown /></span>
                            </Button>
                            {isSidebarOpen && (
                                <div className={'sidebarNav'}>
                                    <ul className={'list list-inline'}>
                                        {Object.keys(categories).map((categoryKey, index) => (
                                            <li className={'list-item inline-item'} key={index} style={{ marginRight: '5px' }}
                                                onMouseEnter={() => togglesubSidebar(categoryKey)}>
                                                <Button
                                                    className={'categoryButton '}>
                                                    {categories[categoryKey].name}
                                                </Button>
                                                {openSubCategory === categoryKey && (
                                                    <ul className={'sidebarsub-list d-flex'} style={{ listStyle: 'none', marginTop: '0' }}>
                                                      <div className={'sidebarsub-titlediv d-flex'}>
                                                          <img src={categories[categoryKey].image} alt={categories[categoryKey].name} style={{ width: '32px', height: '32px' }} />
                                                        <p className={'sidebarsub-title'}> {categories[categoryKey].name} </p>
                                                      </div>
                                                        {categories[categoryKey].subcategories.map((subcategory, subIndex) => (

                                                            <li key={subIndex} className={'sidebarsub-item'} style={{ fontSize: '16px', fontWeight: '500' }}>


                                                                <a style={{ width: '100%' }}>{subcategory}</a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={'col-lg-9 col-sm-9 navPart2'}>
                        <ul
                            className={'list list-inline w-100'}
                            style={{ display: 'flex', padding: 0, margin: 0, listStyle: 'none' }}
                            ref={menuRef}
                        >
                            {Object.keys(categories).map((categoryKey, index) => (
                                <li className={'list-item inline-item'} key={index} style={{ marginRight: '5px' }}>
                                    <Button
                                        className={'categoryButton'}
                                        onMouseEnter={() => toggleSubcategories(categoryKey)}
                                    >
                                        <img src={categories[categoryKey].image} alt={categories[categoryKey].name} style={{ width: '32px', height: '32px', marginRight: '7px' }} />
                                        {categories[categoryKey].name}
                                    </Button>
                                    {openCategory === categoryKey && (
                                        <ul className={'subcategory-list d-flex'} style={{ listStyle: 'none', marginTop: '0' }}>
                                            {categories[categoryKey].subcategories.map((subcategory, subIndex) => (
                                                <li key={subIndex} className={'subcategory-item '} style={{ fontSize: '15px', fontWeight: '500' }}>
                                                    <img src={categories[categoryKey].image} alt={categories[categoryKey].name} style={{ width: '32px', height: '32px', marginRight: '7px' }} />
                                                    <a style={{ width: '100%' }}>{subcategory}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
