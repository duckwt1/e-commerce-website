import { DeleteOutlineOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { DataTable } from "../../../layouts/utils/DataTable";
import ProductModel from "../../../model/ProductModel";
import { getAllProduct } from "../../../api/ProductAPI";
import { getAllImageByProduct } from "../../../api/ImageAPI";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";
import { endpointBE } from "../../../layouts/utils/Constant";

interface ProductTableProps {
	setOption: any;
	handleOpenModal: any;
	setKeyCountReload?: any;
	keyCountReload?: any;
	setId: any;
}

export const ProductTable: React.FC<ProductTableProps> = (props) => {
	const [loading, setLoading] = useState(true);

	// Tạo các biến của confirm dialog
	const confirm = useConfirm();
	// Tạo biến để lấy tất cả data
	const [data, setData] = useState<ProductModel[]>([]);

	// Hàm để lấy tất cả các sách render ra table
	useEffect(() => {
		const fetchData = async () => {
			try {
				const productResponse = await getAllProduct(1000, 0);

				const promises = productResponse.productList.map(async (product) => {
					const imagesList = await getAllImageByProduct(product.productId);

					const thumbnail = imagesList.find((image) => image.isThumbnail)?.urlImage || '';

					return {
						...product,
						id: product.productId,
						thumbnail: thumbnail,
					};
				});

				const products = await Promise.all(promises);
				setData(products);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [props.keyCountReload]);
	// Xử lý xoá sách
	const handleDeleteProduct = (id: any) => {
		const token = localStorage.getItem("token");
		confirm({
			title: "Delete product",
			description: `Do you want to delete this product?`,
			confirmationText: ["Delete"],
			cancellationText: ["Cancel"],
		})
			.then(() => {
				fetch(endpointBE + `/books/${id}`, {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
					.then((response) => {
						if (response.ok) {
							toast.success("Xoá sách thành công");
							props.setKeyCountReload(Math.random());
						} else {
							toast.error("Lỗi khi xoá sách");
						}
					})
					.catch((error) => {
						toast.error("Lỗi khi xoá sách");
						console.log(error);
					});
			})
			.catch(() => {});
	};

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 80 },
		{
			field: "thumbnail",
			headerName: "ẢNH",
			width: 100,
			renderCell: (params) => {
				return <img src={params.value} alt='' width={70} />;
			},
		},
		{ field: "nameProduct", headerName: "NAME PRODUCT", width: 350 },
		{ field: "quantity", headerName: "QUANTITY", width: 100 },
		{
			field: "sellPrice",
			headerName: "SELL PRICE",
			width: 120,
			renderCell: (params) => {
				return (
					<span>
						{Number.parseInt(params.value).toLocaleString("vi-vn")}đ
					</span>
				);
			},
		},
		{ field: "seller", headerName: "SELLER", width: 150 },

		{
			field: "action",
			headerName: "ACTIONS",
			width: 200,
			type: "actions",
			renderCell: (item) => {
				return (
					<div>
						<Tooltip title={"EDIT"}>
							<IconButton
								color='primary'
								onClick={() => {
									props.setOption("update");
									props.setId(item.id);
									props.handleOpenModal();
								}}
							>
								<EditOutlinedIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title={"CANCEL"}>
							<IconButton
								color='error'
								onClick={() => handleDeleteProduct(item.id)}
							>
								<DeleteOutlineOutlined />
							</IconButton>
						</Tooltip>
					</div>
				);
			},
		},
	];

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	return <DataTable columns={columns} rows={data} />;
};
