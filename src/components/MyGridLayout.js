import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const layout = [
  { i: 'a', x: 0, y: 0, w: 2, h: 2 },
  { i: 'b', x: 2, y: 0, w: 2, h: 2 },
  { i: 'c', x: 4, y: 0, w: 2, h: 2 },
];

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 12, md: 10, sm: 8, xs: 6, xxs: 4 };

const MyGridLayout = () => {
  return (
    <ResponsiveReactGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={breakpoints}
      cols={cols}
      rowHeight={300}
      width={1200}
    >
      <div key="a">A</div>
      <div key="b">B</div>
      <div key="c">C</div>
    </ResponsiveReactGridLayout>
  );
};

export default MyGridLayout;
