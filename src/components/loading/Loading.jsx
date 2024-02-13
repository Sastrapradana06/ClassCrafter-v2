import ShowModal from "../../components/modal/ShowModal";
import { FaSpinner } from "react-icons/fa";


export default function Loading() {
  return (
    <ShowModal>
      <button type="button" className="bg-indigo-500 flex items-center gap-2 p-3 rounded-lg" disabled>
        <FaSpinner className="animate-spin" />
        Loading...
      </button>
    </ShowModal>
  )
}