import { useNavigate } from "react-router-dom";

interface SideBarMenuProps {
  url: string;
  imgSrc: string;
  title: string;
  toggleMenu: () => void;
}

const SidebarMenu = (props: SideBarMenuProps) => {
  const { url, imgSrc, title, toggleMenu } = props;
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(url);
        toggleMenu();
      }}
    >
      <img src={imgSrc} title={title} />
      <h3 className="nav_text">{title}</h3>
      <div className="nav_description">{title}</div>
    </li>
  );
};

export default SidebarMenu;
