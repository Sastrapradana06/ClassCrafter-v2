import { useState } from "react";

export default function useHandleInput(initialState) {
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let valueInput = value;
    if (name != "email") {
      valueInput = value.toLocaleLowerCase();
    }
    setData({ ...data, [name]: valueInput });
  };

  const clearInput = () => {
    setData(initialState);
  };

  const editData = (state) => {
    setData(state);
  };

  return { data, handleChange, clearInput, editData };
}
