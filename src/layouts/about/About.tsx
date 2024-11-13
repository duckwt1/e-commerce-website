import React from "react";
import useScrollToTop from "../../hooks/ScrollToTop";

function About() {
	useScrollToTop(); // Mỗi lần vào component này thì sẽ ở trên cùng
	return (
		<div className='w-100 h-100 d-flex align-items-center justify-content-center flex-column m-5'>
			<div className='w-50 h-50 p-3 rounded-5 shadow-4-strong bg-light'>
				<h3 className='text-center text-black'>Giới thiệu về Book Store GIT</h3>
				<hr />
				<div className='row'>
					<div className='col-lg-8'>
						<p>
							<strong>Tên website: </strong>Book Store GIT
						</p>
						<p>
							<strong>Địa chỉ: </strong>78 Đầm Rong 2, P. Thanh Bình, Q. Hải Châu, Đà Nẵng
						</p>
						<p>
							<strong>Số điện thoại: </strong>0888390733
						</p>
						<p>
							<strong>Email: </strong>vothanhlong1704@gmail.com
						</p>
					</div>
					<div className='col-lg-4'>
						<div
							className='d-flex align-items-center justify-content-center rounded-5'
							style={{ border: "1px solid #ccc" }}
						>
							<img
								src={"./../../../images/public/logo.png"}
								width='150'
								alt='MDB Logo'
								loading='lazy'
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='w-50 h-50 p-3 rounded-5 shadow-4-strong bg-light mt-3'>
				<h3 className='text-center text-black'>Google maps</h3>
				<hr />
				<div className='d-flex align-items-center justify-content-center'>
					<iframe
						title='Map'
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122682.17181442416!2d108.22588999999999!3d16.0749383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421838ee64f333%3A0xf614dd557b5f00e7!2zNzggxJAuIMSQ4bqnbSBSb25nIDIsIFRoYW5oIELDrG5oLCBI4bqjaSBDaMOidSwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1728153251761!5m2!1svi!2s"
						width='600'
						height='450'
						style={{border: 0}}
						allowFullScreen={true}
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
					></iframe>



				</div>
			</div>
		</div>
	);
}

export default About;
