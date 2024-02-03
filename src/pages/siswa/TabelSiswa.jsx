import DataTable from 'react-data-table-component';

export default function TabelSiswa() {

  const columns = [
    {
      name: 'Id',
      selector: row => row.id,
      sortable: true,
      minWidth: '50px'
    },
    {
      name: 'Nama',
      selector: row => row.nama,
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'Tanggal Lahir',
      selector: row => row.tanggal_lahir,
      minWidth: '150px'
    },
    {
      name: 'Nama Ortu',
      selector: row => row.nama_ortu,
      minWidth: '150px'
    },
    {
      name: 'Notel',
      selector: row => row.notel,
      minWidth: '150px'
    },
    {
      name: 'Email',
      selector: row => row.email,
      minWidth: '150px'
    },
    {
      name: 'Alamat',
      selector: row => row.alamat,
      minWidth: '150px'
    },
    {
      name: 'Aksi',
      selector: row => row.aksi,
      minWidth: '150px',
    },
  ];

  const data = [
  {
		id: 1,
		nama: 'Zoe Sean',
		tanggal_lahir: '20 Nov 2000',
    nama_ortu: 'Amidun Akbar',
    notel: '089835462345',
    email: 'zoe@gmail.com',
    alamat: 'Medan Petisah',
    aksi: <div className='flex gap-3'><button>Edit</button><button>hapus</button></div>
	},
]

const customStyles = {
  title: {
    textAlign: 'left',
    width: '100%',
  },
  rows: {
    style: {
      minHeight: '52px',
    },
  },
};


  return (
    <div>
      <DataTable
        title="Data Siswa"
        columns={columns}
        customStyles={customStyles}
        data={data}
        pagination
        className="rounded-lg w-[100%]"
      />
    </div>
  );
}