import React, { useEffect, useState } from "react";
import { Skeleton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import TextEllipsis from "./text-ellipsis/TextEllipsis";
import SelectQuantity from "./select-quantity/SelectQuantity";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useConfirm } from "material-ui-confirm";
import { isToken } from "../../utils/JwtService";
import { endpointBE } from "../../utils/Constant";
import { useCartItem } from "../../utils/CartItemContext";
import { toast } from "react-toastify";
import { getAllImageByProduct } from "../../../api/ImageAPI";
import ImageModel from "../../../model/ImageModel";
import CartItemModel from "../../../model/CartItemModel";

interface ProductCartProps {
	cartItem: CartItemModel;
	handleRemoveBook: any;
}

const ProductCartProps: React.FC<ProductCartProps> = (props) => {
	const { setCartList } = useCartItem();
	const confirm = useConfirm();

	const [quantity, setQuantity] = useState(
		props.cartItem.product.quantity !== undefined
			? props.cartItem.quantity > props.cartItem.product.quantity
				? props.cartItem.product.quantity
				: props.cartItem.quantity
			: props.cartItem.quantity
	);
	const [imageList, setImageList] = useState<ImageModel[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [erroring, setErroring] = useState(null);

	function handleConfirm() {
		confirm({
			title: "Delete product",
			description: "Do you want to delete this product from your cart?",
			confirmationText: "Delete",
			cancellationText: "Cancel",
		})
			.then(() => {
				props.handleRemoveBook(props.cartItem.product.productId);
				if (isToken()) {
					const token = localStorage.getItem("token");
					fetch(endpointBE + `/cart-items/${props.cartItem.idCart}`, {
						method: "DELETE",
						headers: {
							Authorization: `Bearer ${token}`,
							"content-type": "application/json",
						},
					}).catch((err) => console.log(err));
				}
			})
			.catch(() => {});
	}

	useEffect(() => {
		getAllImageByProduct(props.cartItem.product.productId)
			.then((response) => {
				setImageList(response);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				setErroring(error.message);
			});
	}, [props.cartItem.product.productId]);

	let dataImage;
	if (imageList[0]) {
		const thumbnail = imageList.filter((i) => i.isThumbnail === true);
		dataImage = thumbnail[0].urlImage || thumbnail[0].urlImage;
	}

	const add = () => {
		if (quantity) {
			if (
				quantity <
				(props.cartItem.product.quantity ? props.cartItem.product.quantity : 1)
			) {
				setQuantity(quantity + 1);

			} else {
				toast.warning("Số lượng tồn kho không đủ");
			}
		}
	};

	const reduce = () => {
		if (quantity) {
			if (quantity - 1 === 0) {
				handleConfirm();
			} else if (quantity > 1) {
				setQuantity(quantity - 1);

			}
		}
	};

	function handleModifiedQuantity(idProduct: number, quantityChange: number) {
		const cartData: string | null = localStorage.getItem("cart");
		const cart: CartItemModel[] = cartData ? JSON.parse(cartData) : [];
		let isExistProduct = cart.find(
			(cartItem) => cartItem.product.productId === idProduct
		);
		if (isExistProduct) {
			isExistProduct.quantity += quantityChange;
			if (isToken()) {
				const token = localStorage.getItem("token");
				fetch(endpointBE + `/cart-item/update-item`, {
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
						"content-type": "application/json",
					},
					body: JSON.stringify({
						idCart: props.cartItem.idCart,
						quantity: isExistProduct.quantity,
					}),
				}).catch((err) => console.log(err));
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		setCartList([...cart]);
	}

	if (loading) {
		return (
			<>
				<Skeleton className='my-3' variant='rectangular' />
			</>
		);
	}

	if (erroring) {
		return (
			<>
				<h4>Lỗi ...</h4>
			</>
		);
	}

	return (
		<>
			<div className='col'>
				<div className='d-flex'>
					<Link to={`/book/${props.cartItem.product.productId}`}>
						<img
							src={dataImage}
							className='card-img-top'
							alt={props.cartItem.product.name}
							style={{ width: "100px" }}
						/>
					</Link>
					<div className='d-flex flex-column pb-2'>
						<Link to={`/book/${props.cartItem.product.productId}`}>
							<Tooltip title={props.cartItem.product.name} arrow>
                <span className='d-inline'>
                  <TextEllipsis
					  text={props.cartItem.product.name + " "}
					  limit={38}
				  />
                </span>
							</Tooltip>
						</Link>
						<div className='mt-auto'>
              <span className='discounted-price text-danger'>
                <strong style={{ fontSize: "22px" }}>
                  {(props.cartItem.product.sellPrice || 0)} $
                </strong>
              </span>
							<span
								className='original-price ms-3 small'
								style={{ color: "#000" }}
							>
                <del>
                  {(props.cartItem.product.listPrice || 0)} $
                </del>
              </span>
						</div>
					</div>
				</div>
			</div>
			<div className='col-3 text-center my-auto d-flex align-items-center justify-content-center'>
				<SelectQuantity
					max={props.cartItem.product.quantity}
					setQuantity={setQuantity}
					quantity={quantity}
					add={add}
					reduce={reduce}
					product={props.cartItem.product}
				/>
			</div>
			<div className='col-2 text-center my-auto'>
        <span className='text-danger'>
          <strong>
            {(quantity * (props.cartItem.product.sellPrice || 0))}$
          </strong>
        </span>
			</div>
			<div className='col-2 text-center my-auto'>
				<Tooltip title={"Xoá sản phẩm"} arrow>
					<button
						style={{
							outline: 0,
							backgroundColor: "transparent",
							border: 0,
						}}
						onClick={() => handleConfirm()}
					>
						<DeleteOutlineOutlinedIcon sx={{ cursor: "pointer" }} />
					</button>
				</Tooltip>
			</div>
			<hr className='my-3' />
		</>
	);
};

export default ProductCartProps;
