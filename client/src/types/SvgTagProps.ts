import { ComponentPropsWithoutRef } from "react";

type SvgTypes = ComponentPropsWithoutRef<"svg">;

interface SvgTagProps extends SvgTypes {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default SvgTagProps;
