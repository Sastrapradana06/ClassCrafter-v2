import { useState } from "react";

export default function () {
  const [status, setStatus] = useState(false);
  const [data, setData] = useState({
    type: "",
    message: "",
  });

  const handleAlert = (type, message) => {
    setStatus(true);
    setData({ type, message });

    setTimeout(() => {
      setStatus(false);
    }, 2000);
  };

  return { status, data, handleAlert };
}
