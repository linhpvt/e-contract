/*
  this hook is used to collect data of a form.
*/

import { useState } from 'react';
export const FieldType = {
  NUMBER: 'number',
  STRING: 'string',
  BOOLEAN: 'boolean',
};
export default function useForm(initial: any) {
  const [formData, setFieldValue] = useState(initial);
  return {
    formData,
    onChange: (e: any) => {
      const name = e.target.name || '';
      let fieldVal = e.target.value || '';
      const fieldType = e.target.getAttribute('field-type') || '';
      switch (fieldType) {
        case FieldType.BOOLEAN:
          fieldVal = e.target.checked;
          break;
        case FieldType.NUMBER:
          fieldVal = toFloat(fieldVal, '');
          break;
        default:
          break;
      }
      setFieldValue((current: any) => ({ ...current, [name]: fieldVal }));
    },
  };
}

// support functions
function toFloat(value: string, defaultValue: any) {
  try {
    const val = parseFloat(value);
    return isNaN(val) ? defaultValue : val;
  } catch (e) {
    return defaultValue;
  }
}
