export default function Footer() {
  return (
    <div className="w-full fixed bottom-0 h-[80px] bg-[#E6EBEE] rounded-md flex flex-col justify-center items-center text-[.8rem] gap-2 text-center lg:pl-[20%] border-t">
      <p>Hak Cipta @ Dirancang & Dikembangkan oleh </p>
      <p>
        <a
          href="https://klima-tech.vercel.app/"
          className="text-[#4D44B5] font-medium"
          target="_blank"
          rel="noreferrer"
        >
          KlimaTech
        </a>{" "}
        2024
      </p>
    </div>
  );
}
