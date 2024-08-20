import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FormBuilderTwo from '../components/FormBuilderTwo';
import Sidebar from '../components/Sidebar';

const BuilderTwo = () => {
    return (
        <div className="BuilderTwo">
         <DndProvider backend={HTML5Backend}>
            <Sidebar />
            <FormBuilderTwo />
         </DndProvider>
        </div>
    );
};

export default BuilderTwo;