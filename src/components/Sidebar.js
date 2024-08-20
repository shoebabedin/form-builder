import React from 'react';
import { useDrag } from 'react-dnd';

const SidebarItem = ({ name }) => {
  const [, drag] = useDrag(() => ({
    type: 'field',
    item: { name },
  }));
  
  return (
    <div ref={drag} className="sidebar-item">
      {name}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Form Fields</h3>
      <SidebarItem name="Text Input" />
      <SidebarItem name="Textarea" />
      <SidebarItem name="Select" />
    </div>
  );
};

export default Sidebar;
