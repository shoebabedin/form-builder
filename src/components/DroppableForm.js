import update from "immutability-helper";
import React, { useCallback } from "react";
import { useDrop } from "react-dnd";
import SortableField from "./SortableField";

const ItemType = "FORM_FIELD";

const DroppableForm = ({ formFields, setFormFields, onDrop, updateField }) => {

  const moveField = useCallback(
    (dragIndex, hoverIndex) => {
      const draggedField = formFields[dragIndex];
      if (!draggedField) {
        console.error("Dragged field is undefined:", dragIndex);
        return;
      }
      setFormFields(
        update(formFields, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, draggedField]
          ]
        })
      );
    },
    [formFields, setFormFields]
  );

  // const [, drop] = useDrop({
  //   accept: ItemType,
  //   drop: (item, monitor) => {
  //     if (!monitor.didDrop()) {
  //       onDrop(item);
  //     }
  //   },
  // });

  const [, drop] = useDrop({
    accept: "FORM_FIELD",
    drop: (item) => {
      if (!item || !item.id || !item.text || !item.type) {
        console.error("Dropped item is missing required properties:", item);
        return;
      }
      onDrop(item);
    },
  });


  return (
    <div
      ref={drop}
      className="droppable-form"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: "10px"
      }}
    >
      {formFields.map((field, index) => {
        if (!field || typeof field.id === "undefined") {
          console.error("Invalid field:", field);
          return null; // Skip rendering this field if it's invalid
        }
        return (
          <SortableField
            key={field.id}
            index={index}
            id={field.id}
            text={field.text}
            type={field.type}
            columns={field.columns} // Pass columns from the formFields state
            moveField={moveField}
            updateField={updateField} // Pass updateField to allow updates
          />
        );
      })}
    </div>
  );
};

export default DroppableForm;
