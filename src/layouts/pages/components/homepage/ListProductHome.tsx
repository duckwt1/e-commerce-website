import React from 'react';

import ListHotProduct from "./../../../products/ListHotProduct";
import Carousel from "./../../components/homepage/subBannerHome";
import ListBestSeller from "../../../products/ListBestSeller";
import ListTopDeal from "../../../products/ListTopDeal";

export default  function ListProductHome() {
    return (
        <section className={'homeProducts'}>
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className={'col-md-2'}>
                        <div className={'banner'}>
                            <img src={"banner_height2.png"}
                                 alt={"Nature"}
                                 className={'cursor '}/>

                            <img src={"banner8.png"}
                                 alt={"Nature"}
                                 className={'cursor mt-4'}/>


                            <img src={"banner_height3.png"}
                                 alt={"Nature"}
                                 className={'cursor mt-4'}/>

                            <img src={"banner7.png"}
                                 alt={"Nature"}
                                 className={'cursor mt-4'}/>

                            <img src={"banner6.jpg"}
                                 alt={"Nature"}
                                 className={'cursor mt-4'}/>

                            <img src={"banner_height5.png"}
                                 alt={"Nature"}
                                 className={'cursor  mt-4'}/>

                        </div>
                    </div>

                    <div className={"col-md-10"}>
                        <div className={" bestsellercontainer "} style={{height:"600px"}}>

                            <ListBestSeller/>


                        </div>
                        <div className={'banner'}>
                        <img src={"/bannerlarge.png"} alt={"Nature"} style={{paddingBottom: '20px', marginTop: '-20px', width: '100%'}}></img>
                        </div>
                        <div className={'hotcontainer'}> <ListHotProduct/></div>



                    </div>

                    <Carousel/>
                    <ListTopDeal/>
                </div>

            </div>


        </section>
    )
}
