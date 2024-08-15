import React, { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "FORM_FIELD";

const SortableField = ({ id, text, type, index, moveField, updateField }) => {
  const ref = useRef(null);
  const [columns, setColumns] = useState(12);
  const [isEditing, setIsEditing] = useState(false);
  const [fieldText, setFieldText] = useState(text);
  const [fieldType, setFieldType] = useState(type);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });



  drag(drop(ref)); // Combine drag and drop refs

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const newWidth = Math.max(
        50,
        e.clientX - ref.current.getBoundingClientRect().left
      );
      const newColumns = Math.round(
        (newWidth / ref.current.parentElement.offsetWidth) * 12
      );
      setColumns(Math.min(newColumns, 12)); // Ensure column count stays within 1-12
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      // Update the column count in the formFields state
      updateField(id, { columns });
    };

    const handleMouseDown = (e) => {
      e.preventDefault();
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const resizeHandle = ref.current?.querySelector(".resize-handle");
    if (resizeHandle) {
      resizeHandle.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      if (resizeHandle) {
        resizeHandle.removeEventListener("mousedown", handleMouseDown);
      }
    };
  }, [columns, id, updateField]);

  

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Save changes when exiting edit mode
      updateField(id, { text: fieldText, type: fieldType, columns  });
    }
  };


  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        gridColumn: `span ${columns}`,
        border: "1px solid gray",
        backgroundColor: "#ddd",
        padding: "10px",
        boxSizing: "border-box",
        margin: "10px 0",
        height: "min-content",
        position: "relative" // Ensure resize handle is positioned correctly
      }}
    >
      {isEditing ? (
        <div>
          <label>
            Field Text:
            <input
              type="text"
              value={fieldText}
              onChange={(e) => setFieldText(e.target.value)}
              style={{ marginBottom: "5px" }}
            />
          </label>
          <label>
            Field Type:
            <select
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
              style={{ marginBottom: "5px" }}
            >
              {/* Populate with all possible input types */}
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
              <option value="number">Number</option>
              <option value="tel">Telephone</option>
              <option value="date">Date</option>
              <option value="time">Time</option>
              <option value="file">File</option>
              {/* Add more options as needed */}
            </select>
          </label>
        </div>
      ) : (
        <>
          <label>{text}</label>
          <input
            type={type}
            defaultValue=""
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </>
      )}
      <button onClick={handleEditToggle} style={{ marginTop: "10px" }}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <div
        className="resize-handle"
        style={{
          position: "absolute",
          width: "5px",
          height: "100%",
          right: "-5px",
          top: "0",
          cursor: "ew-resize",
          zIndex: 10, // Ensure handle is on top but does not block drag events
          backgroundColor: "#000"
        }}
      ></div>
    </div>
  );
};

export default SortableField;
