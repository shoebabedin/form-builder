import React, { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "FORM_FIELD";

const SortableField = ({ id, text, type, index, moveField, updateField, columns }) => {
  const ref = useRef(null);
  const [currentColumns, setCurrentColumns] = useState(columns);
  const [isEditing, setIsEditing] = useState(false);
  const [fieldText, setFieldText] = useState(text);
  const [fieldType, setFieldType] = useState(type);

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: ItemType,
    item: { id, index, updateField },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  drag(drop(ref));


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
      setCurrentColumns(Math.min(newColumns, 12));
      updateField(id, { columns: newColumns });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
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
  }, [id, updateField]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Save changes when exiting edit mode
      updateField(id, { text: fieldText, type: fieldType, columns: currentColumns });
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        gridColumn: `span ${currentColumns}`,
        border: "1px solid gray",
        backgroundColor: isOver ? 'red' : 'white',
        padding: "10px",
        boxSizing: "border-box",
        margin: "10px 0",
        height: "min-content",
        position: "relative",
        cursor: isOver ? 'no-drop' : 'auto',
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
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
              <option value="number">Number</option>
              <option value="tel">Telephone</option>
              <option value="date">Date</option>
              <option value="time">Time</option>
              <option value="file">File</option>
            </select>
          </label>
        </div>
      ) : (
        <>
          <label>{text} - column: {currentColumns}</label>
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
          zIndex: 10,
          backgroundColor: "#000"
        }}
      ></div>
    </div>
  );
};

export default SortableField;
