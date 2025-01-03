import React from "react";
import "./../../../css/Banner.css";

function Banner() {
	return (
		<div className='container-fluid pt-5 pb-4 text-dark d-flex justify-content-center align-items-center'>
			<div>
				<h3
					data-text='A room without books is like a body without a soul.'
					className='banner-text display-5 fw-bold'
				>
					A room without books is like a body without a soul.
				</h3>
				<p className=''>-- Marcus Tullius Cicero --</p>

					<button className='btn btn-primary btn-lg text-white float-end'>
						Khám phá ngay
					</button>

			</div>
		</div>
	);
}

export default Banner;
