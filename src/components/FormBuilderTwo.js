// src/components/FormBuilder.js
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import MyGridLayout from './MyGridLayout';

const ResponsiveGridLayout = WidthProvider(Responsive);

const FormBuilderTwo = () => {
  const [layout, setLayout] = useState([]);
  const [fields, setFields] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'field',
    drop: (item, monitor) => {
      const id = new Date().getTime().toString();
      setFields([...fields, { id, type: item.name }]);
      setLayout([...layout, { i: id, x: 0, y: Infinity, w: 12, h: 1 }]);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 12, md: 10, sm: 8, xs: 6, xxs: 4 };


  return (
    <>
    <div className="form-builder" ref={drop}>
      <h3>Form Builder</h3>
      <ResponsiveGridLayout
        autoSize={true}
        className="layout"
        layouts={{ lg: layout }}
        // cols={{ lg: 12 }}
        rowHeight={30}
        width={1200}
        verticalCompact={true}
      >
        {fields.map(field => (
          <div key={field.id} data-grid={layout.find(l => l.i === field.id)}>
            <FieldComponent type={field.type} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
      <h3>Form Builder</h3>
    <div className="form-builder" ref={drop} style={{border:"1px solid red"}}>
      <MyGridLayout/>
    </div>
    </>
  );
};

const FieldComponent = ({ type }) => {
  switch (type) {
    case 'Text Input':
      return <input type="text" placeholder="Text Input" />;
    case 'Textarea':
      return <textarea placeholder="Textarea"></textarea>;
    case 'Select':
      return (
        <select>
          <option value="">Select</option>
        </select>
      );
    default:
      return null;
  }
};

export default FormBuilderTwo;
