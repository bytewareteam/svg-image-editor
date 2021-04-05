import {useCallback, useState} from "react";

/**
 *
 * @param initialValue
 * @return {{handleFieldChange: (function(*): void), values: Record<string, string>}}
 */
export function useForm(initialValue) {
  const [values, setForm] = useState(initialValue);

  const handleFieldChange = useCallback((ev) => {
    const name = ev.target.name;
    setForm(prevState => ({
      ...prevState,
      [name]: ev.target.value
    }))
  }, []);

  return {
    handleFieldChange,
    values,
  }
}