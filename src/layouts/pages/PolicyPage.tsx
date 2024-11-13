import React from "react";
import useScrollToTop from "../../hooks/ScrollToTop";

const PolicyPage: React.FC = () => {
	useScrollToTop(); // Scroll to top when this component is loaded

	return (
		<div className='container-fluid policyPage my-5 bg-super-light p-4 rounded'>
			<h1>RETURN / EXCHANGE / REFUND POLICY</h1><br/><br/>
			<p>
				We always appreciate the trust and support of our customers when shopping at{" "}
				<a href='#!'>
					<strong>DEALHUB</strong>
				</a>
				. Therefore, we always strive to provide the best service to meet all your shopping needs.
			</p>
			<p>
				<a href='#!'>
					<strong>DEALHUB</strong>
				</a>{" "}
				always commits that all products sold at{" "}
				<a href='#!'>
					<strong>DEALHUB</strong>
				</a>{" "}
				are 100% quality products with clear, legal, and safe origins for consumers. To ensure a friendly shopping experience at{" "}
				<a href='#!'>
					<strong>DEALHUB</strong>
				</a>
				, we hope you will carefully check the following contents before receiving the goods:
			</p>
			<ul>
				<li>
					<p>Product information: product name and product quality.</p>
				</li>
				<li>
					<p>Product quantity.</p>
				</li>
			</ul>
			<p>
				In the rare case that the product you receive is defective, damaged, or not as described, DEALHUB is committed to protecting customers with a return/exchange/refund policy to protect consumer rights and ensure the quality of our products and services.
			</p>
			<p>
				If you have purchased goods at{" "}
				<a href='#!'>
					<strong>DEALHUB </strong>
				</a>
				and need to return/exchange/warranty/refund, please contact us via hotline <strong>1900636467</strong> or visit{" "}
				<a href='#!chinh-sach-doi-tra-hang'>
					<strong>DEALHUB.com/chinh-sach-doi-tra-hang</strong>
				</a>{" "}
				to learn more about the return/exchange policy:
			</p>

			<br/><h4><strong>1. Return/Exchange Time</strong></h4><br/>
			<div className="table-responsive col-12">
				<table cellSpacing='1' cellPadding='1' className='table table-bordered'>
					<tbody>
					<tr>
						<td>
							<p>&nbsp;</p>
						</td>
						<td>
							<p>
								<strong>FROM THE TIME</strong>
								<strong>DEALHUB </strong>
								<strong>SUCCESSFULLY DELIVERS</strong>
							</p>
						</td>
						<td>
							<p>
								<strong>DEFECTIVE PRODUCT
									<br/> (by supplier)
								</strong>
							</p>
						</td>
						<td>
							<p>
								<strong>NON-DEFECTIVE PRODUCT&nbsp;(*)</strong>
							</p>
						</td>
						<td>
							<p>
								<strong>PRODUCT DEFECTIVE DUE TO USER</strong>
							</p>
						</td>
					</tr>
					<tr>
						<td rowSpan={4}>
							<p>
								Electronic products, electronic toys, household appliances,... (with warranty stamps from the supplier)
							</p>
						</td>
						<td rowSpan={2}>
							<p>First 7 days</p>
						</td>
						<td>
							<p>Exchange for a new one</p>
						</td>
						<td rowSpan={3}>
							<p>Return without fee</p>
						</td>
						<td rowSpan={4}>
							<p>
								Warranty or repair with a fee according to the supplier's regulations.
							</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>Return without fee</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>8 - 30 days</p>
						</td>
						<td>
							<p>Warranty</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>After 30 days</p>
						</td>
						<td>
							<p>Warranty</p>
						</td>
						<td>
							<p>No support for return/exchange</p>
						</td>
					</tr>
					<tr>
						<td rowSpan={3}>
							<p>Voucher/ E-voucher</p>
						</td>
						<td rowSpan={2}>
							<p>First 30 days</p>
						</td>
						<td>
							<p>Exchange for a new one</p>
						</td>
						<td rowSpan={2}>
							<p>No support for return/exchange</p>
						</td>
						<td rowSpan={2}>
							<p>No support for return/exchange</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>Return without fee</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>After 30 days</p>
						</td>
						<td colSpan={3}>
							<p>No support for return/exchange</p>
						</td>
					</tr>
					<tr>
						<td rowSpan={3}>
							<p>For other product categories</p>
						</td>
						<td rowSpan={2}>
							<p>First 30 days</p>
						</td>
						<td>
							<p>Exchange for a new one</p>
						</td>
						<td rowSpan={2}>
							<p>Return without fee</p>
						</td>
						<td rowSpan={3}>
							<p>No support for return/exchange</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>Return without fee</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>After 30 days</p>
						</td>
						<td colSpan={2}>
							<p>No support for return/exchange</p>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
			<p>&nbsp;</p>
			<ul>
				<li>
					<p>Please notify DEALHUBimmediately when:</p>
					<p>
						{" "}
						+ The delivered package has signs of damage, the product inside is scratched, broken, torn, dented, wet, broken... within 2 days from the successful delivery.
					</p>
					<p>
						{" "}
						+ The delivered product is incorrect or missing within 2 days from the successful delivery.
					</p>
				</li>
				<li>
					<p>
						After DEALHUB confirms the receipt of the request, DEALHUB will contact you to confirm the information or request additional information (if any). If we cannot contact you, DEALHUBregrets to refuse to process the request. DEALHUBwill contact you during business hours up to 3 times within 7 days after receiving the request.
					</p>
				</li>
				<li>
					<p>
						We will check the above cases and resolve them for you within 30 working days from the date you receive the goods. After this period, we regret that we cannot resolve complaints.
					</p>
				</li>
			</ul>
			<p style={{display: "inline!important"}}>
				<br/><h4><strong>2. Cases for Return/Exchange</strong></h4>
			</p>
			<ul>
				<li>
					<p>
						Technical defects of the product - by the supplier (missing pages, loose binding, duplicate content, electronic products, electronic toys not working..)
					</p>
				</li>
				<li>
					<p>
						Incorrect/missing delivery (missing ordered products, missing accessories, missing gifts)
					</p>
				</li>
				<li>
					<p>Poor quality goods, damaged during transportation.</p>
				</li>
				<li>
					<p>The product appearance does not match the initial description.</p>
				</li>
				<li>
					<p>You ordered the wrong product/no longer need it (*)</p>
				</li>
			</ul>
			<p>
				(*) For non-defective products, only applicable when the product meets the following conditions:
			</p>
			<p>
				You can return the product purchased at{" "}
				<strong>DEALHUB</strong> within 30 days from the date of receipt for most products when the following conditions are met:
			</p>
			<ul>
				<li>
					<p>
						The product shows no signs of use, still has the original seal, label, or manufacturer's seal.
					</p>
				</li>
				<li>
					<p>
						The product still has all accessories or warranty cards and accompanying gifts (if any).
					</p>
				</li>
				<li>
					<p>
						If it is an electronic product, it has not been activated, and no data has been recorded on the device.
					</p>
				</li>
			</ul>

			<br/><h4><strong>3. Return/Exchange Conditions</strong></h4>
			<br/>
			<p>
				<strong>DEALHUB</strong> supports return/exchange of products for you if:
			</p>
			<ul>
				<li>
					<p>The product is still in its original packaging as it was initially.</p>
				</li>
				<li>
					<p>
						The product still has all accessories, promotional gifts included.
					</p>
				</li>
				<li>
					<p>VAT invoice (if any).</p>
				</li>
				<li>
					<p>Provide full information for verification as required (item 4).</p>
				</li>
			</ul>

			<br/><h4><strong>4. Return/Exchange Process</strong></h4>
			<ul>
				<li>
					<p>
						Please inform the order that needs support for return/exchange via Hotline 1900636467 or email to:{" "}
						<strong>cskh@DEALHUB.com.vn</strong> with the subject{" "}
						<strong>“Return/Exchange Order " Order Code".</strong>
					</p>
				</li>
				<li>
					<p>
						You need to provide additional evidence for verification/complaint as follows:
					</p>
				</li>
			</ul>
			<p style={{paddingLeft: "60px"}}>
				+ Video clip clearly showing all sides of the package before unboxing to show the condition of the package.
			</p>
			<p style={{paddingLeft: "60px"}}>
				+ Video clip opening the package from the beginning to check the product inside the box.
			</p>
			<p style={{paddingLeft: "60px"}}>
				+ Clear, non-blurry video showing the order code and close-up of the product defect.
			</p>
			<p style={{paddingLeft: "60px"}}>
				+ Photo of the package seal showing the order code.
			</p>
			<p style={{paddingLeft: "60px"}}>
				+ Photo of the external condition (tape, seal, box shape, packaging), especially the positions suspected of affecting the product (dented, wet, torn...)
			</p>
			<p style={{paddingLeft: "60px"}}>
				+ Photo of the product condition inside, clearly stating the technical defect if any.
			</p>
			<ul>
				<li>
					To ensure customer rights and for <strong>DEALHUB</strong> to have a basis to work with related departments, all return/exchange/warranty requests need to provide images/videos of the defective product. After the return/exchange period, if we do not receive enough images/videos from you, <strong>DEALHUB</strong> reserves the right to refuse support.
				</li>
			</ul>
			<table cellSpacing='0' cellPadding='7' className='table table-bordered'
			>
				<tbody>
				<tr>
					<td>
						<p>
							<strong>No.</strong>
						</p>
					</td>
					<td>
						<p>
							<strong>Content</strong>
						</p>
					</td>
					<td>
						<p>
							<strong>Resolution Method</strong>
						</p>
					</td>
				</tr>
				<tr>
					<td>
						<p>1</p>
					</td>
					<td>
						<p>
							Technical defects of the product - by the supplier (missing pages, loose binding, duplicate content, electronic products not working..)
						</p>
					</td>
					<td>
						<p>DEALHUB has the product→ exchange for a new one</p>
						<p>
							DEALHUB is out of stock→ Refund or you can choose another product on the website{" "}
							<span style={{textDecoration: "underline"}}>
                                <a href='#!'>www.DEALHUB</a>
                            </span>
							.
						</p>
						<p>Return/exchange without fee</p>
					</td>
				</tr>
				<tr>
					<td>
						<p>2</p>
					</td>
					<td>
						<p>Product damaged by the customer</p>
					</td>
					<td>
						<p>No support for return/exchange</p>
					</td>
				</tr>
				<tr>
					<td>
						<p>3</p>
					</td>
					<td>
						<p>
							Reasons for return/exchange such as: customer ordered the wrong product or no longer needs it.
						</p>
					</td>
					<td>
						<p>&nbsp;</p>
						<p>
							Support for collection and refund 100% of the product value for customers.
						</p>
						<p>
							**Note: DEALHUB regrets that we will not support refunding the shipping cost in this case.
						</p>
						<p>Return/exchange without fee</p>
					</td>
				</tr>
				<tr>
					<td>
						<p>4</p>
					</td>
					<td>
						<p>
							Incorrect/missing delivery (missing ordered products, missing accessories, missing gifts)
						</p>
					</td>
					<td>
						<p>Incorrect delivery → Exchange for the correct product ordered.</p>
						<p>
							Missing delivery → Deliver the missing quantity according to the order.
						</p>
						<p>Return/exchange without fee</p>
					</td>
				</tr>
				<tr>
					<td>
						<p>5</p>
					</td>
					<td>
						<p>Poor quality goods due to transportation</p>
					</td>
					<td>
						<p>
							When customers receive a dented, wet package, we recommend that customers check the actual goods inside at the time of receipt, please reflect the condition of the goods on the delivery bill from the delivery staff and contact us via hotline 1900-636467 within 48 hours for specific support.
						</p>
						<p>Return/exchange without fee</p>
					</td>
				</tr>
				<tr>
					<td>
						<p>6</p>
					</td>
					<td>
						<p>The product appearance does not match the initial description</p>
					</td>
					<td>
						<p>
							Please contact us via hotline 1900636467, we are ready to listen and resolve for you (specifically according to each case).
						</p>
						<p>Return/exchange without fee</p>
					</td>
				</tr>
				</tbody>
			</table>
			<p>&nbsp;</p>
		</div>
	);
};

export default PolicyPage;
