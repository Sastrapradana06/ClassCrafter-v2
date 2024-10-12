import CardNotif from "../../components/card-notif/CardNotif";
import Container from "../../components/container/Container";

export default function Notifikasi() {
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[80px] flex  justify-center lg:pl-[20%]">
        <div className="w-full h-[500px] overflow-y-scroll flex flex-col gap-3 items-center p-3">
          <CardNotif
            tema={"Peringatan 17 agustus"}
            judul={"17 agustus"}
            tgl={"17 agustus 2025"}
            deskripsi={"tes"}
          />
          <CardNotif
            tema={"Peringatan 17 agustus"}
            judul={"17 agustus"}
            tgl={"17 agustus 2025"}
            deskripsi={"tes"}
          />
          <CardNotif
            tema={"Peringatan 17 agustus"}
            judul={"17 agustus"}
            tgl={"17 agustus 2025"}
            deskripsi={"tes"}
          />
        </div>
      </div>
    </Container>
  );
}
