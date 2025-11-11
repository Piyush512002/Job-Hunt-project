import React, { useState } from "react";
import { TextField, Chip, Paper } from "@material-ui/core";

const TagsInput = ({ value = [], onChange, onAdd, onDelete, label, className, fullWidth }) => {
  const [text, setText] = useState("");

  const addTag = () => {
    const t = text.trim();
    if (!t) return;
    if (onChange) {
      const next = Array.from(new Set([...value, t]));
      onChange(next);
    } else if (onAdd) {
      onAdd(t);
    }
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tag, index) => {
    if (onChange) {
      onChange(value.filter((_, i) => i !== index));
    } else if (onDelete) {
      onDelete(tag, index);
    }
  };

  return (
    <div className={className} style={{ width: fullWidth ? "100%" : undefined }}>
      <TextField
        label={label}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        variant="outlined"
        size="small"
        fullWidth={false}
      />
      <Paper style={{ display: "flex", gap: 8, padding: 8, marginTop: 8, flexWrap: "wrap" }}>
        {value && value.map((t, idx) => (
          <Chip key={`${t}-${idx}`} label={t} onDelete={() => removeTag(t, idx)} />
        ))}
      </Paper>
    </div>
  );
};

export default TagsInput;
