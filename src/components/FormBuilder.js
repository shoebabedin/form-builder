import React, { useState } from "react";
import DraggableField from "./DraggableField";
import DroppableForm from "./DroppableForm";

const availableFields = [
  { id: 1, text: "Button", type: "button" },
  { id: 2, text: "Checkbox", type: "checkbox" },
  { id: 3, text: "Color Picker", type: "color" },
  { id: 4, text: "Date", type: "date" },
  { id: 5, text: "Date and Time", type: "datetime-local" },
  { id: 6, text: "Email", type: "email" },
  { id: 7, text: "File Upload", type: "file" },
  { id: 8, text: "Hidden", type: "hidden" },
  { id: 9, text: "Image", type: "image" },
  { id: 10, text: "Month", type: "month" },
  { id: 11, text: "Number", type: "number" },
  { id: 12, text: "Password", type: "password" },
  { id: 13, text: "Radio", type: "radio" },
  { id: 14, text: "Range", type: "range" },
  { id: 15, text: "Reset", type: "reset" },
  { id: 16, text: "Search", type: "search" },
  { id: 17, text: "Submit", type: "submit" },
  { id: 18, text: "Telephone", type: "tel" },
  { id: 19, text: "Text", type: "text" },
  { id: 20, text: "Time", type: "time" },
  { id: 21, text: "URL", type: "url" },
  { id: 22, text: "Week", type: "week" }
];

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [savedForm, setSavedForm] = useState(null);

  const handleDrop = (item) => {
    console.log("Dropped item:", item);

    if (!item || !item.id || !item.text || !item.type) {
      console.error("Dropped item is missing required properties:", item);
      return;
    }

    const existingField = formFields.find((field) => field.id === item.id);
    if (!existingField) {
      setFormFields((prevFields) => [
        ...prevFields,
        {
          id: Date.now(), // Assign a unique ID for the new field
          text: item.text, // Copy text from the dropped item
          type: item.type, // Copy type from the dropped item
          index: prevFields.length
        }
      ]);
    }
  };

  const updateField = (e, id, updatedProperties) => {
    console.log(e);
    
    setFormFields((prevFields) => {
      return prevFields.map((field) =>
        field.id === id ? { ...field, ...updatedProperties } : field
      );
    });
  };

  const togglePreviewMode = () => {
    setPreviewMode((prevMode) => !prevMode);
  };

  const saveForm = () => {
    // Save the current form structure
    setSavedForm(formFields);
    console.log('Form saved:', formFields); // For debugging
  };

  console.log("formFields", formFields);

  return (
    <div className="form-builder">
      <button onClick={togglePreviewMode} style={{ marginBottom: "20px" }}>
        {previewMode ? "Back to Builder" : "Preview"}
      </button>
      <button onClick={saveForm} style={{ marginBottom: '20px' }}>
        Save Form
      </button>
      
        {previewMode ? (
          <div
            className="preview-form"
            style={{ border: "1px solid #ddd", padding: "10px" }}
          >
            {formFields.map((field, index) => (
              <div key={field.id} style={{ marginBottom: "10px" }}>
                <label>{field.text}</label>
                <input type={field.type} style={{ width: "100%" }} />
              </div>
            ))}
          </div>
        ) : (
          <div className="builder-view">
            <div className="available-fields">
              {availableFields.map((field) => (
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
              onDrop={handleDrop}
              setFormFields={setFormFields}
              updateField={updateField}
            />
          </div>
        )}
    </div>
  );
};

export default FormBuilder;
