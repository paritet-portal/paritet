
const ArrowDown: React.FC<React.SVGProps<SVGElement>> = (props) => (
	<svg
		className={`h-5 w-5 text-gray-400 ${props.className || ''}`}
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		viewBox="0 0 20 20"
	>
		<path d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414"></path>
	</svg>
);

export default ArrowDown;
