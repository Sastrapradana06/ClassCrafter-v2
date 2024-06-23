import Cookies from "js-cookie";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportToPDF = async (
  columnsTable,
  columnsData,
  data,
  fileName
) => {
  const element = document.createElement("div");
  element.style.width = "100%";
  element.style.overflowX = "auto";
  element.classList.add("pb-[50px]");

  element.innerHTML = `
  <div class="w-full h-max flex flex-col justify-center items-center gap-8  m-auto">
    <h2 class="text-center text-black font-bold text-[1.3rem] uppercase">${fileName}</h2>
    <table border="1" style="border-collapse: collapse;" class="m-auto max-w-[90%] min-w-[90%]" >
      <thead>
        <tr>
          <th class="bg-lime-500 text-white p-[5px] text-center border border-black">No</th>
          ${columnsTable
            .map(
              (column) =>
                `<th class="bg-lime-500 text-white text-center border border-black p-1 text-[.9rem]">${column}</th>`
            )
            .join("")}
        </tr>
      </thead>
      <tbody>
        ${data
          .map(
            (item, index) => `
            <tr class="border-b border-gray-700">
              <td  class="border border-black text-black p-1">
                      <p class=" flex justify-center items-center">${
                        index + 1
                      }</p>
                    </td>
              ${columnsData
                .map(
                  (column) =>
                    `<td  class="border border-black text-black p-1">
                      <p class=" flex justify-center items-center w-max text-[.8rem]">${
                        item[column.toLowerCase()]
                      }</p>
                    </td>`
                )
                .join("")}
            </tr>`
          )
          .join("")}
      </tbody>
    </table>
  </div>
  `;

  document.body.appendChild(element);

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    document.body.removeChild(element);
  }
};
export const exportToExcel = (data, fileName) => {
  console.log({ data, fileName });
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${fileName}.xlsx`);
};

export function formatIndonesianDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("id-ID", options);
}

export const handleFileChange = (e) => {
  const file = e.target.files[0];
  const imageUrl = URL.createObjectURL(file);
  return imageUrl;
};

export const formatDate = (data) => {
  const date = new Date(data);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("id-ID", options);

  return formattedDate;
};

export const convertDateString = (data) => {
  const dateObject = new Date(data);
  const year = dateObject.getFullYear();
  const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObject.getDate()).slice(-2);
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const setCookies = (name, data) => {
  let now = new Date();
  now.setTime(now.getTime() + 2 * 60 * 60 * 1000);

  Cookies.set(name, data, { expires: now });
};

export const deleteCookies = () => {
  Cookies.remove("token");
  Cookies.remove("idUser");
};

export const getToken = (name) => {
  const cookies = Cookies.get(name);
  return cookies;
};

export const getDate = () => {
  const currentDate = new Date();
  const day = currentDate.toLocaleDateString("id-ID", { weekday: "long" });
  const date = currentDate.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return { day, date };
};

export const formatDateID = (tanggal) => {
  return format(new Date(tanggal), "dd MMMM yyyy", { locale: id });
};

export const getToday = () => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const date = new Date();
  const dayIndex = date.getDay();
  const dayName = days[dayIndex];

  return dayName;
};

export const convertCsvFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onabort = () => {
      console.log("File reading was aborted");
      reject("File reading was aborted");
    };

    reader.onerror = () => {
      console.log("File reading has failed");
      reject("File reading has failed");
    };

    reader.onload = () => {
      const csvString = reader.result;

      Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          resolve({ status: true, data: result.data });
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          reject({ status: false, message: error.message });
        },
      });
    };

    reader.readAsText(file);
  });
};

export const dayColors = {
  senin: "bg-red-500",
  selasa: "bg-green-500",
  rabu: "bg-[#3357FF]",
  kamis: "bg-[#F33FF5]",
  jumat: "bg-[#F5A623]",
  sabtu: "bg-[#9B59B6]",
};
