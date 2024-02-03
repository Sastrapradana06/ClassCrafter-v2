
import DataTable from 'react-data-table-component';

export default function TabelAcara() {

  const columns = [
    {
      name: 'Id',
      selector: row => row.id,
      sortable: true,
      minWidth: '50px'
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'Tanggal',
      selector: row => row.tanggal,
    },
    {
      name: 'Status',
      selector: row => row.status,
      minWidth: '150px'

    },
  ];

  const data = [
  {
		id: 1,
		title: 'Beetlejuice hhhh',
		tanggal: '1988',
    status: 'Segera'
	},
	{
		id: 2,
		title: 'Ghostbusters',
		tanggal: '1984',
    status: 'Dilaksanal'

	},
	{
		id: 3,
		title: 'Ghostbusters',
		tanggal: '1984',
    status: 'Sudah Lewat'

	},
	{
		id: 4,
		title: 'Ghostbusters',
		tanggal: '1984',
    status: 'Sudah Lewat'

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

const paginationRowsPerPageOptions = [5, 10, 15, 20]; 


  return (
    <div>
      <DataTable
      
        title="Acara"
        columns={columns}
        customStyles={customStyles}
        data={data}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        paginationPerPage={5}
        pagination
        className="rounded-lg w-[100%]"
      />
    </div>
  );
}