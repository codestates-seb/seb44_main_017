import { Fade } from "@mui/material";

interface FadeInProps {
  children: any;
  index: number;
}

const FadeIn: React.FC<FadeInProps> = ({ children, index }) => {
  return (
    <Fade in timeout={500} style={{ transitionDelay: `${500 * index}ms` }}>
      {children}
    </Fade>
  );
};
export default FadeIn;
