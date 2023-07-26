import SvgTagProps from "./../../types/SvgTagProps";

interface PointIconProps extends SvgTagProps {
  color: string;
}

const PointIcon = ({
  width = 20,
  height = 20,
  color = "#ffffff",
}: PointIconProps) => {
  return (
    <svg
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={width}
      height={height}
      fill={color}
      stroke={color}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <style type="text/css"> </style>{" "}
        <g>
          {" "}
          <path d="M256,64c105.875,0,192,86.125,192,192s-86.125,192-192,192c-105.859,0-192-86.125-192-192S150.141,64,256,64 M256,0C114.625,0,0,114.625,0,256c0,141.391,114.625,256,256,256s256-114.609,256-256C512,114.625,397.375,0,256,0z"></path>{" "}
          <path d="M264.375,170.594h-54.5c-8.703,0-15.75,7.031-15.75,15.719V347c0,8.688,7.047,15.719,15.75,15.719h7.906 c8.688,0,15.734-7.031,15.734-15.719v-45.25h30.859c41.266,0,74.844-29.406,74.844-65.594 C339.219,200,305.641,170.594,264.375,170.594z M264.375,267.219h-30.859v-62.125h30.859c19.547,0,35.438,13.938,35.438,31.063 S283.922,267.219,264.375,267.219z"></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};

export default PointIcon;
