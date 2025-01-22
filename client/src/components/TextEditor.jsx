import React, { useState } from "react";

const TextEditor = ({ content, onChange, title, onChangeTitle }) => {
  const [selectedColor, setSelectedColor] = useState("#000000"); // Default color: black

  const applyStyle = (command, value = null) => {
    // Use execCommand to apply styles directly
    document.execCommand(command, false, value);

    // Update the content and title after applying the style
    const editorContent = document.querySelector(".editable-content").innerHTML;
    const editorTitle = document.querySelector(".editable-title").innerHTML;
    onChangeTitle(editorTitle);
    onChange(editorContent);
  };

  const handleColorChange = (e) => {
    const color = e.target.value; // Get the selected color
    setSelectedColor(color); // Update the selected color state
    applyStyle("foreColor", color); // Apply the color
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b p-2 flex gap-2 items-center">
        {/* Styling buttons */}
        <button
          onClick={() => applyStyle("bold")}
          className="p-1 hover:bg-gray-200 rounded"
        >
          B
        </button>
        <button
          onClick={() => applyStyle("italic")}
          className="p-1 hover:bg-gray-200 rounded"
        >
          I
        </button>
        <button
          onClick={() => applyStyle("underline")}
          className="p-1 hover:bg-gray-200 rounded"
        >
          U
        </button>
        <button
          onClick={() => applyStyle("strikeThrough")}
          className="p-1 hover:bg-gray-200 rounded"
        >
          StrikeThrough
        </button>

        {/* Color picker */}
        <input
          type="color"
          value={selectedColor}
          onChange={handleColorChange}
          className="w-8 h-8 p-0 border rounded"
        />
      </div>

      {/* Editable title */}
      <h1
        contentEditable
        className="editable-title p-1 min-w-[100%]"
        onInput={(e) => onChangeTitle(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {/* Editable content */}
      <div
        contentEditable
        className="editable-content p-4 min-h-[200px]"
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default TextEditor;
