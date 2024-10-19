import React from 'react';
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";

function homepage() {
    return (
        <>
            <div className='d-md-none d-sm-none d-lg-block'>
                <Banner/>
                <div className='d-flex justify-content-center align-items-center pb-4'>
                    <hr className='w-100 mx-5'/>
                </div>
            </div>
            <div className='container'>
                <Carousel/>
            </div>
        </>
    );
}

export default homepage;
