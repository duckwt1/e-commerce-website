import React from 'react';
import HomeBanner from "./components/homepage/Homebanner";

import ListProductHome from "./components/homepage/ListProductHome";
import Carousel from "./components/homepage/subBannerHome";


function homepage() {
    const items = [
        { icon: "📄", label: "Voucher Up to 1 Million" },
        { icon: "🚚", label: "DEALHUB Free Shipping" },
        { icon: "⚡", label: "Sale Hour Hunting" },
        { icon: "💰", label: "Discount Code only on DEALHUB" },
        { icon: "💸", label: "Super Cheap DEALHUB" },
        { icon: "🔥", label: " Style Voucher 30%" },
        { icon: "🌎", label: "International Goods" },
        { icon: "🎬", label: "Services & Movie Tickets" }
    ];
    return (
        <div className={'homepage'}>

            <HomeBanner/>

            <div className="menu-container">
                <h3 className={'menu-title'}>HOT OFFERS ONLY ON DEALHUB</h3>
                <div className={'menu-items'}>
                    {items.map((item, index) => (
                        <div className="menu-item" key={index}>
                            <div className="menu-icon">{item.icon}</div>
                            <div className="menu-label">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>

        <ListProductHome/>

        </div>
    );
}

export default homepage;
