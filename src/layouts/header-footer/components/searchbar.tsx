import React from "react";
import Button from '@mui/material/Button';

//function
export default function Searchbar() {
    return (
        <form className="d-flex" style={{width: '100%', marginLeft: '1%'}}>
            <select className="form-select w-25" style={{borderRadius: '0'}}>
                <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="books">Books</option>
                {/* Add more categories as needed */}
            </select>
            <input className="form-control" type="search" placeholder="Search DEALHUB" style={{borderRadius: '0'}}/>
            <Button className="btn searchButton btn-primary" type="submit" style={{borderRadius: '0', backgroundColor: '#b20b0b', color: 'white'}}>
                <i className="fas fa-search"></i>
            </Button>
        </form>
    )
}
