import React, { useState } from 'react';
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsFillGearFill,
  BsFillBellFill,
} from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ openSidebarToggle, OpenSidebar }) => {
  const [activeItem, setActiveItem] = useState<string>('');

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> SHOP
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <NavLink to="/dashboard">
          <li className={`sidebar-list-item ${activeItem === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleItemClick('dashboard')}>
            <BsGrid1X2Fill className="icon" /> Dashboard
          </li>
        </NavLink>
        <NavLink to="/dashboard/post">
          <li className={`sidebar-list-item ${activeItem === 'post' ? 'active' : ''}`}
            onClick={() => handleItemClick('post')}>
            <BsFillArchiveFill className="icon" /> Post
          </li>

        </NavLink>
        <NavLink to="/dashboard/pending">
          <li className={`sidebar-list-item ${activeItem === 'pending' ? 'active' : ''}`}
            onClick={() => handleItemClick('pending')}>
            <BsFillBellFill className="icon" /> Pending
          </li>
        </NavLink>
      </ul>
    </aside>
  );
};

export default Sidebar;
