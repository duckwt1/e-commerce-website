import React, { useRef, useState } from "react";
import TextEllipsis from "../components/TextEllipsis";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";
import ProductModel from "../../../model/ProductModel";
import { MdOutlineZoomOutMap } from "react-icons/md";
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

    const getBadgeColor = (discountPercent: number) => {
        if (discountPercent >= 40) {
            return "bg-danger";
        }
        else if (discountPercent >= 30) {
            return "bg-warning";
        }
        else if (discountPercent >= 20) {
            return "bg-primary";
        } else if (discountPercent >= 10) {
            return "bg-primary";
        } else {
            return "bg-primary";
        }
    };

    return (
        <div
            className="col-md-10 col-lg-12 mt-3 me-2"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="card position-relative">
                {hover && (
                    <div className={`position-absolute xemtrc d-flex flex-column start-0 ${hover ? "show-icons" : "hide-icons"}`}>
                        <Tooltip title="view">
                            <IconButton className={"mb-2"} size="small" onClick={handleOpen}>
                                <MdOutlineZoomOutMap />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="wishlist">
                            <IconButton size="small">
                                <FavoriteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                )}
                <ProductDialog product={product} open={open} onClose={handleClose} />
                {product.discountPercent > 0 && (
                    <h4 className="my-0 d-inline-block position-absolute end-0" style={{ top: "15px" }}>
                        {product.quantity === 0 ? (
                            <span className="badge bg-danger">Sold out</span>
                        ) : (
                            <span className={`badge ${getBadgeColor(product.discountPercent)}`}>{product.discountPercent}%</span>
                        )}
                    </h4>
                )}
                <Link to={`/products/${product.productId}`}>
                    <img src={product.thumbnail} className="card-img-top mt-3" alt={product.name} style={{ height: "250px" }} />
                </Link>
                <div className="card-body">
                    <Link to={`/products/${product.productId}`} style={{ textDecoration: "none" }}>
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
                            <span className="discounted-price text-danger mt-2">
                                <strong style={{ fontSize: "22px" }}>{product.sellPrice?.toLocaleString()} $</strong>
                            </span>
                            {product.listPrice && product.sellPrice && (
                                <span className="original-price ms-3 small fw-bolder">
                                    <del>{product.listPrice?.toLocaleString()} $</del>
                                </span>
                            )}
                        </div>
                        <span className="ms-2" style={{ fontSize: "12px", color: "#aaa" }}>
                            Sold {product.soldQuantity}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookProps;
