    import React, { useRef, useState } from "react";
    import TextEllipsis from "../components/TextEllipsis";
    import { Link, useNavigate } from "react-router-dom";
    import Tooltip from "@mui/material/Tooltip";
    import FavoriteIcon from "@mui/icons-material/Favorite";
    import { IconButton } from "@mui/material";
    import { VisibilityOutlined } from "@mui/icons-material";
    import ProductModel from "../../../model/ProductModel";
    import {MdOutlineZoomOutMap} from "react-icons/md";
    import ProductDialog from "./ProductDialog";

    interface BookProps {
        product: ProductModel;
    }

    const BookProps: React.FC<BookProps> = ({ product }) => {
        const navigate = useNavigate();
        const [hover, setHover] = useState(false);
        const [open, setOpen] = useState(false);

        const handleOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        return (
            <div
                className="col-md-10 col-lg-12 mt-3 me-2"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className="card position-relative">
                    {hover && (
                        <div className={`position-absolute xemtrc d-flex flex-column  start-0 ${hover ? "show-icons" : "hide-icons"}`}>
                            <Tooltip title="view ">
                                <IconButton className={"mb-2 "} size="small" onClick={handleOpen}>
                                    <MdOutlineZoomOutMap/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="wishlist">
                                <IconButton size="small">
                                    <FavoriteIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    )}
                    <ProductDialog product={product} open={open} onClose={handleClose} />
                    {product.listPrice?  - product.sellPrice > 0 && (
                        <h4 className="my-0 d-inline-block position-absolute end-0" style={{top: "15px"}}>
                            {product.quantity === 0 ? (
                                <span className="badge bg-danger">Hết hàng</span>
                            ) : (
                                <span className="badge bg-primary">{product.listPrice - product.sellPrice}%</span>
                            )}
                        </h4>
                    ) : null}
                    <Link to={`api/product/${product.productId}`}>
                        <img src={product.thumbnail} className="card-img-top mt-3" alt={product.name} style={{ height: "250px" }}
                        />
                    </Link>
                    <div className="card-body">
                        <Link to={`api/product/${product.productId}`} style={{ textDecoration: "none" }}>
                            <h5 className="card-title product-name fixed-height">
                                <Tooltip title={product.name ?? ''} arrow>
                                        <span>

                                                <TextEllipsis text={product.name + ""} limit={50} />

                                        </span>
                                </Tooltip>
                            </h5>
                        </Link>
                        <div className="price mb-3 d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <span className="discounted-price text-danger">
                                    <strong style={{fontSize: "22px"}}>{product.sellPrice?.toLocaleString()}đ</strong>
                                </span>
                                {product.listPrice?-product.sellPrice > 0 && (
                                    <span className="original-price ms-3 small fw-bolder">
                                        <del>{product.listPrice?.toLocaleString()}đ</del>
                                    </span>
                                ) : null}
                            </div>
                            <span className="ms-2" style={{ fontSize: "12px", color: "#aaa" }}>
                                Đã bán {product.soldQuantity}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default BookProps;
