import Link from "next/link";

interface SideBarIconProps {
  icon?: JSX.Element;
  text?: string;
  isActive?: boolean;
  showText?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  style?: string;
  extraElement?: JSX.Element;
  link?: string;
}

const SideBarIcon: React.FC<SideBarIconProps> = ({ icon, text, isActive = false, showText = false, onClick, style, extraElement, link }) => (

    <Link href={link ? link : '#'} className={`sidebar-icon group ${isActive ? 'bg-[#667A8A]' : ''} ${style}`} onClick={onClick}>
      
      {icon}
      {showText && (
        <span className="ml-4 text-sm font-normal">
          {text}
        </span>
      )}
      {!showText && (
        <span className="sidebar-tooltip group-hover:scale-100">
          {text}
        </span>
      )}
      {extraElement}
    </Link>
);

export default SideBarIcon;