/* eslint-disable react/prop-types */
import { useShallow } from "zustand/react/shallow";
import useAppStore from "../../store/store";

const InputCheckbox = ({ id }) => {
  const [selectedId, setSelectedId, isDelete] = useAppStore(
    useShallow((state) => [
      state.selectedId,
      state.setSelectedId,
      state.isDelete,
    ])
  );
  const handleCheck = () => {
    const isSelected = selectedId.includes(id);
    if (isSelected) {
      setSelectedId(selectedId.filter((item) => item !== id));
    } else {
      setSelectedId([...selectedId, id]);
    }
  };

  const isChecked = selectedId.includes(id);

  return (
    isDelete && (
      <button className="mr-2 cursor-pointer ">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheck}
          className="form-checkbox"
        />
      </button>
    )
  );
};

export default InputCheckbox;
