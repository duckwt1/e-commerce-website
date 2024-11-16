import React, { useState, useRef } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Rating, Button, Tooltip, Snackbar } from "@mui/material";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Slider from "react-slick";
import { FaHeart } from "react-icons/fa";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import ProductModel from "../../../model/ProductModel";

interface ProductDialogProps {
    product: ProductModel;
    open: boolean;
    onClose: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductDialog: React.FC<ProductDialogProps> = ({ product, open, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [errorOpen, setErrorOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(product.thumbnail);
    const zoomSliderSmall = useRef<any>(null);

    const handleErrorClose = (event: React.SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };

    const handleIncrease = () => {
        if (quantity < (product.quantity ?? 0)) {
            setQuantity(quantity + 1);
        } else {
            setErrorOpen(true);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    let settings2 = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay: true,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
            <DialogTitle id="form-dialog-title"> <h4 className={"mb-0 font-weight-bold"}>{product.name}</h4></DialogTitle>
            <DialogContent>
                <div className="d-flex flex-column align-items-lg-start">
                    <div className="d-flex align-items-center">
                        <span>Seller : sellername</span>
                        <span className={"me-3 ms-3"}>|</span>
                        <Rating name="read-only" value={product.avgRating} size={"small"} readOnly precision={0.5} />
                    </div>
                </div>
                <hr />
                <div className={" productDetailModal"} style={{display: "flex", justifyContent: "space-between"}}>
                    <div className={"col-md-5"}>
                        <div className="productZoom">
                            <div className="item" style={{marginBottom:"35px", height:"50%"}}>
                                <InnerImageZoom src={selectedImage} zoomSrc={selectedImage} style={{ height: "1000px" }} />
                            </div>
                            <Slider {...settings2} className={"miniImage"} ref={zoomSliderSmall}>
                                {product.relatedImg?.map((img, index) => (
                                    <div key={index} className={"zoomSliderSmall"}>
                                        <img
                                            src={img}
                                            alt={product.name}
                                            style={{width: "50%", height: "50%"}}
                                            onClick={() => setSelectedImage(img)}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <div className="col-md-7" style={{width: "50%", height: "100%"}}>
                        <p>
                            <span style={{
                                color: "red",
                                fontSize: "25px",
                                fontWeight: "bold"
                            }}> {product.sellPrice?.toLocaleString() ?? "0"} VND</span>
                            <span className={"ms-3"} style={{
                                textDecoration: "line-through",
                                color: "#999"
                            }}>{product.listPrice?.toLocaleString()??"0"}VND</span>
                            <span className={"ms-3"} style={{color: "green"}}>Save {product.sellPrice && product.listPrice ? ((product.listPrice - product.sellPrice) / product.listPrice * 100).toFixed(0) : 0}%</span>
                        </p>
                        <p>
                            <span>
                                <Rating name="read-only" value={product.avgRating} size={"small"} readOnly precision={0.5} />
                            </span>
                        </p>
                        <p style={{color: "green", fontWeight: "bold",}}>Quantity: {product.quantity ?? 0}</p>
                        <p style={{fontSize: "14px"}}>{truncateText(product.description || "", 200)}</p>
                        <div className="quantity">
                            <button className="increase btn btn-outline-secondary" onClick={handleDecrease}>-</button>
                            <input type="text" value={quantity} readOnly className="text-center" style={{width: "60px", outline: "none", border: "none", background:"none"}}/>
                            <button className="decrease btn btn-outline-secondary" onClick={handleIncrease}>+</button>
                        </div>
                        <button className="btn btn-danger mt-2 me-3">
                            <FaHeart className={"me-2"}/>
                            Add to Wishlist
                        </button>
                        <button className="btn  mt-2" style={{width: "200px", background: "#2A3663", color: "#fff"}}>
                            view detail
                        </button>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
            <Snackbar open={errorOpen} autoHideDuration={6000} >
                <Alert onClose={handleErrorClose} severity="error">
                    Quantity exceeds available stock!
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default ProductDialog;
