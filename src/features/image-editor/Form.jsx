import React, {useCallback, useEffect} from 'react';
import {useForm} from "../../hooks/useForm";

function Form({values = {primaryText: '', secondaryText: '', buttonText: ''}, onChange}) {
  const {values: formValues, handleFieldChange} = useForm(values);
  const handleChange = useCallback(ev => {
    handleFieldChange(ev);
  }, [handleFieldChange]);
  useEffect(() => {
    onChange(formValues);
  }, [formValues, onChange])
  const fields = Object.entries(formValues).map(([key, value]) => {
    return <input key={key} type="text" maxLength={20} name={key} value={value} placeholder={key} onChange={handleChange}/>
  })
  return <form>{fields}</form>;
}

export default Form;