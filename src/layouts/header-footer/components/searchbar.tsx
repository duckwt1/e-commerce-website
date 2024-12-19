import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { getAllcategorys } from "../../../api/CategoryAPI";
import CategoryModel from "../../../model/CategoryModel";

export default function Searchbar() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [categories, setCategories] = useState<CategoryModel[]>([]);

    useEffect(() => {
        getAllcategorys().then((response) => {
            setCategories(response.categoryList); // Extract categoryList from response
        }).catch((error) => {
            console.error("Error fetching categories:", error);
        });
    }, []);

    return (
        <form className="d-flex" style={{ width: '100%', marginLeft: '1%' }}>
            <select
                className="form-select w-25"
                style={{ borderRadius: '0' }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="all">All</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
            </select>
            <input
                className="form-control"
                type="search"
                placeholder="Search DEALHUB"
                style={{ borderRadius: '0' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button
                className="btn searchButton btn-primary"
                type="submit"
                style={{ borderRadius: '0', backgroundColor: '#b20b0b', color: 'white' }}
            >
                <i className="fas fa-search"></i>
            </Button>
        </form>
    );
}
