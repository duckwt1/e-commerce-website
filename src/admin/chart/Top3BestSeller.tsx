import { useEffect, useState } from "react";
import ProductModel from "../../model/ProductModel";
import { get3BestSellerProducts } from "../../api/ProductAPI";
import TextEllipsis from "../../layouts/products/components/TextEllipsis";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

const Top3BestSeller = () => {
	// Lấy dữ liệu top 4 sách được mua nhiều nhất
	const [top3BestSeller, setTop3BestSeller] = useState<ProductModel[]>([]);
	useEffect(() => {
		get3BestSellerProducts()
			.then((response) => {
				setTop3BestSeller(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<table className='table table-striped table-hover'>
			<thead>
				<tr>
					<th scope='col'>ID</th>
					<th scope='col'>ẢNH</th>
					<th scope='col'>TÊN SÁCH</th>
					<th scope='col'>ĐÃ BÁN</th>
				</tr>
			</thead>
			<tbody>
				{top3BestSeller.map((product) => {
					return (
						<tr key={product.productId}>
							<th scope='row'>{product.productId}</th>
							<td>
								<Link
									to={`/book/${product.productId}`}
									className='d-inline text-black'
								>
									<img src={product.thumbnail} alt='' width={30} />
								</Link>
							</td>
							<Tooltip title={product.name} arrow>
								<td>
									<Link
										to={`/product/${product.productId}`}
										className='d-inline text-black'
									>
										<TextEllipsis
											text={product.name + ""}
											limit={25}
										/>
									</Link>
								</td>
							</Tooltip>
							<td>{product.soldQuantity}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Top3BestSeller;
