import React from "react";
import { useDrag } from "react-dnd";

const ItemType = "FORM_FIELD";

const DraggableField = ({ id, text, type  }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, text, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });



  return (
    <>

    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "8px",
        border: "1px solid gray",
        backgroundColor: "white",
        cursor: "move"
      }}
      
      className="draggable-field" 
    >
      {text}
    </div>
    </>
  );
};

export default DraggableField;
