import DataTable, { createTheme } from 'react-data-table-component';


export default function TabelGuru() {

  const columns = [
    // + no
    {
      name: 'N0',
      minWidth: '50px',
      selector: (row, index) => {
        return <div className='text-center font-semibold m-auto w-[20px]'>{index + 1}</div>;
      },
    },

    // + ID 
    {
      name: 'ID GURU',
      selector: row => <div className='text-center font-medium m-auto  w-[50px]'>{row.id}</div>,
    },

    // + NAMA
    {
      name: 'NAMA LENGKAP',
      selector: row => <p className='capitalize font-medium'>{row.nama}</p>,
      minWidth: '200px',
      style: {
        textAlign: 'left',
      },
    },

    // + FOTO
    {
      name: 'FOTO',
      selector: row => (
        <img
          src={row.image}
          alt="Image Guru"
          className='w-[40px] h-[40px] border border-black rounded-full object-cover mx-auto'
        />
      ),
      style: {
        textAlign: 'center',
        margin: 'auto'
      },
    },

    // + JEKEL
    {
      name: 'JENIS KELAMIN',
      selector: row => <p className='capitalize'>{row.jekel}</p>,
      minWidth: '150px',
      style: {
        textAlign: 'left',
      },
    },

    // + Mapel
    {
      name: 'MAPEL',
      minWidth: '170px',
      selector: row => <p className={`capitalize`}>{row.mapel}</p>,
    },

    // + JADWAL
    {
      name: 'JADWAL',
      selector: row => <p className='bg-[#307fb8] p-2 text-white rounded-md'>{row.jadwal}</p>,
      minWidth: '150px',
      style: {
        textAlign: 'left',
      },
    },

    // // + ALAMAT
    // {
    //   name: 'ALAMAT',
    //   selector: row => row.alamat,
    //   minWidth: '200px',
    //   style: {
    //     textAlign: 'left',
    //   },
    // },

    // + AKSI
    {
      name: 'AKSI',
      minWidth: '220px',
      selector: row => <button>Edit</button>
      // selector: row => {
      //   return user ? (
      //     user.jabatan === 'ketua kelas' || user.jabatan === 'sekretaris' ? (
      //       <div className="flex gap-2 text-white">
      //         <button className='bg-sky-400 py-1 px-4 rounded-md hover:bg-sky-500' onClick={() => navigate(`/tambah-siswa/${row.id}`)} title='edit'>
      //           <LuPencilLine size={20} />
      //         </button>
      //         <button className='bg-[crimson] py-1 px-4 rounded-md hover:bg-[#af364e]' onClick={() => showModal(row.id, row.username)} disabled={user.jabatan === 'member'} title='delete'>
      //           <MdDeleteSweep size={20} />
      //         </button>
      //         <button className='bg-[#dca714] py-1 px-4 rounded-md hover:bg-[#af8936] cursor-pointer' title='detail' onClick={() => navigate(`/detail-siswa/${row.id}`)}>
      //           <FaRegEye size={20} />
      //         </button>
      //       </div>
      //     ) : (
      //       <div className="flex gap-2 text-white">
      //         <button className="bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50" disabled title='edit'>
      //           <LuPencilLine size={20} />
      //         </button>
      //         <button className="bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50" disabled title='delete'>
      //           <MdDeleteSweep size={20} />
      //         </button>
      //         <button className='bg-[#dca714] py-1 px-4 rounded-md hover:bg-[#af8936] cursor-pointer' title='detail' onClick={() => navigate(`/detail-siswa/${row.id}`)}>
      //           <FaRegEye size={20} />
      //         </button>
      //       </div>
      //     )
      //   ) : null;
      // }
    },
  ];

  const dataGuru = [
    {
      id: 1,
      nama: 'abdi',
      image: '/men-teacher.jfif',
      jekel: 'Laki-Laki',
      mapel: 'Bahasa Indonesia',
      jadwal: 'senin, jumat'
    },
    {
      id: 2,
      nama: 'Rahmawati',
      image: '/women-teacher.jfif',
      jekel: 'Perempuan',
      mapel: 'IPS',
      jadwal: 'selasa'
    }
  ]

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '18px', // override the cell padding for head cells
      },
    },
    cells: {
      style: {
        paddingLeft: '20px', // override the cell padding for data cells
      },
    },
  };

  // createTheme('solarized', {
  //   text: {
  //     primary: '#ffff',
  //     secondary: '#2aa198',
  //   },
  //   background: {
  //     default: '#002b36',
  //   },
  //   context: {
  //     background: '#cb4b16',
  //     text: '#FFFFFF',
  //   },
  //   divider: {
  //     default: '#073642',
  //   },
  //   // action: {
  //   //   button: 'rgba(0,0,0,.54)',
  //   //   hover: 'rgba(0,0,0,.08)',
  //   //   disabled: 'rgba(0,0,0,.12)',
  //   // },
  // }, 'dark');

  return (
    <div className='pb-[21%] lg:pb-[10%]'>
      <DataTable
        title={<span className='text-indigo-800 font-medium'>Data Guru</span>}
        columns={columns}
        customStyles={customStyles}
        data={dataGuru}
        pagination
        className="rounded-lg w-[100%]"
      // theme="solarized"
      />
    </div>
  )
}