import SvgTagProps from "../../types/SvgTagProps";

interface HamburgerProps extends SvgTagProps {
  stroke: string;
}

const Hamburger = ({
  stroke,
  width = 34,
  height = 24,
  ...rest
}: HamburgerProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill=""
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M2 22H32M2 12H32M2 2H32"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Hamburger;
