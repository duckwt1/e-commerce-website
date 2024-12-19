import { ParameterDigital } from "./components/ParameterDigital";
import { Chart } from "./chart/Chart";
import RequireAdmin from "./RequireAdmin";
import { useEffect, useState } from "react";
import { getAllUserRole } from "../api/UserApi";
import { getAllOrders } from "../api/OrderApi";
import OrderModel from "../model/OrderModel";
import { getTotalNumberOfProducts } from "../api/ProductAPI";
import { getTotalNumberOfFeedbacks } from "../api/FeedbackApi";
import { getTotalNumberOfReviews } from "../api/ReviewApi";

const Dashboard = () => {
	const [totalPrice, setTotalPrice] = useState(0);
	const [numberOfAccount, setNumberOfAccount] = useState(0);
	const [numberOfOrder, setNumberOfOrder] = useState(0);
	const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
	const [totalNumberOfFeedbacks, setTotalNumberOfFeedbacks] = useState(0);
	const [totalNumberOfReviews, setTotalNumberOfReviews] = useState(0);
	const [orders, setOrders] = useState<OrderModel[]>([]);

	// Lấy tổng số account
	useEffect(() => {
		getAllUserRole()
			.then((response) => {
				setNumberOfAccount(response.flat().length);
			})
			.catch((error) => console.log(error));
	}, []);

	// Lấy tổng số hoá đơn và tổng tiền kiếm được
	useEffect(() => {
		getAllOrders()
			.then((response) => {
				setOrders(response);
				const numberOfOrders = response.length;
				setNumberOfOrder(numberOfOrders);
				const totalPriceResponse = response.reduce((prevValue, order) => {
					if (order.status === "Success") {
						return prevValue + order.totalPrice;
					}
					return prevValue;
				}, 0);
				setTotalPrice(totalPriceResponse);
			})
			.catch((error) => console.log(error));
	}, []);

	// Lấy tổng số sách
	useEffect(() => {
		getTotalNumberOfProducts()
			.then((response) => {
				setTotalNumberOfProducts(response);
			})
			.catch((error) => console.log(error));
	}, []);

	// Lấy tổng số feedback
	useEffect(() => {
		getTotalNumberOfFeedbacks()
			.then((response) => {
				setTotalNumberOfFeedbacks(response);
			})
			.catch((error) => console.log(error));
	}, []);

	// Lấy tổng số review
	useEffect(() => {
		getTotalNumberOfReviews()
			.then((response) => {
				setTotalNumberOfReviews(response);
			})
			.catch((error) => console.log(error));
	}, []);
	return (
		<div>
			<ParameterDigital
				// totalPrice={totalPrice}
				// numberOfAccount={numberOfAccount}
				// numberOfOrder={numberOfOrder}
				// totalNumberOfBooks={totalNumberOfProducts}
				// totalNumberOfFeedbacks={totalNumberOfFeedbacks}
				// totalNumberOfReviews={totalNumberOfReviews}
				totalPrice={5000000}
				numberOfAccount={200}
				numberOfOrder={150}
				totalNumberOfBooks={300}
				totalNumberOfFeedbacks={50}
				totalNumberOfReviews={75}
			/>
			<Chart orders={orders} />
		</div>
	);
};

const DashboardPage = RequireAdmin(Dashboard);
export default DashboardPage;
