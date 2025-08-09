import * as React from 'react';
const CrossSVG = (props: any) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		stroke='currentColor'
		strokeWidth={1.5}
		className='size-6'
		width={24}
		viewBox='0 0 24 24'
		{...props}>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M6 18 18 6M6 6l12 12'
		/>
	</svg>
);
export default CrossSVG;
