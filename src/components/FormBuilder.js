import React, { useEffect, useState } from "react";
import availableFields from "./../data/availableFields.json";
import DraggableField from "./DraggableField";
import DroppableForm from "./DroppableForm";

const FormBuilder = () => {
  const ItemType = "FORM_FIELD";
  const [data, setData] = useState(availableFields);
  const [formFields, setFormFields] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [savedForm, setSavedForm] = useState(null);

  const handleDrop = (item) => {
    if (!item || !item.id || !item.text || !item.type) {
      console.error("Dropped item is missing required properties:", item);
      return;
    }

    const existingField = formFields.find((field) => field.id === item.id);

    if (!existingField) {
      setFormFields((prevFields) => {
        const newFields = [
          ...prevFields,
          {
            id: Date.now(), // Assign a unique ID for the new field
            text: item.text, // Copy text from the dropped item
            type: item.type, // Copy type from the dropped item
            index: prevFields.length,
            columns: 12 // Set a default column value, e.g., 12
          }
        ];
        console.log("New fields after drop:", newFields);
        return newFields;
      });
    }
  };

  const updateField = (id, updatedProperties) => {
    setFormFields((prevFields) => {
      const updatedFields = prevFields.map((field) =>
        field.id === id ? { ...field, ...updatedProperties } : field
      );
      localStorage.setItem("formFields", JSON.stringify(updatedFields));
      return updatedFields;
    });
  };

  const togglePreviewMode = () => {
    setPreviewMode((prevMode) => !prevMode);
  };

  const saveForm = () => {
    setSavedForm(formFields);
    console.log("Form saved:", formFields);
    // Serialize the formFields array to a JSON string
    localStorage.setItem("formFields", JSON.stringify(formFields));
  };

  useEffect(() => {
    const loadForm = () => {
      const savedForm = localStorage.getItem("formFields");
      if (savedForm) {
        const parsedForm = JSON.parse(savedForm);
        setFormFields(parsedForm);
      }
    };

    loadForm();
  }, []);

  return (
    <div className="form-builder">
      <div>
        <button onClick={togglePreviewMode} style={{ marginBottom: "20px" }}>
          {previewMode ? "Back to Builder" : "Preview"}
        </button>
        <button onClick={saveForm} style={{ marginBottom: "20px" }}>
          Save Form
        </button>
      </div>

      {previewMode ? (
        <div className="preview-form">
          {formFields.map((field, index) => (
            <div
              key={field.id}
              style={{
                gridColumn: `span ${field.columns}`,
                // border: "1px solid gray",
                padding: "10px",
                boxSizing: "border-box",
                margin: "10px 0",
                height: "min-content",
                position: "relative"
              }}
            >
              {field.type === "button" ? (
                <button>{field.text}</button>
              ) : (
                <>
                  <label>{field.text}</label>
                  <input type={field.type} style={{ width: "100%" }} />
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="builder-view">
          <div className="available-fields">
            {data?.map((field) => (
              <DraggableField
                key={field.id}
                id={field.id}
                text={field.text}
                type={field.type}
              />
            ))}
          </div>
          <DroppableForm
            formFields={formFields}
            setFormFields={setFormFields}
            onDrop={handleDrop}
            updateField={updateField}
          />
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
