'use client';

import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid';
import { DeleteUser, fetchData, UpdateUser } from '@/api/functions';

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const loadData = async () => {
    try {
      const data = await fetchData();
      setRows(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    

    loadData();
  }, []);

  const updateRow = async (id: GridRowId, data: GridRowModel) => {
    try {
      // Remove o campo 'id' do objeto de dados
      const { id: removedId, createdAt, ...dataToUpdate } = data;
      
      await UpdateUser(id, dataToUpdate);
      
      loadData();
    } catch (error) {
      alert('Erro ao atualizar o usuário');
      console.error(error);
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    const rowToSave = rows.find((row) => row.id === id);
  
    if (rowToSave) {
      updateRow(id, rowToSave);
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    }
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      
      await DeleteUser(id)
      
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      alert('Erro ao excluir o usuário');
      console.error(error);
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });    
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow};
    
    // Atualize o banco de dados com a nova linha
    updateRow(newRow.id, updatedRow);
    
    // Atualize o estado local
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    
    return updatedRow;
  };


  const columns: GridColDef[] = [
    { 
      field: 'name',
      headerName: 'Nome',
      width: 300,
      editable: true
    },
    { 
      field: 'email',
      headerName: 'Email',
      width: 300,
      editable: true
    },
    { 
      field: 'gender',
      headerName: 'Sexo',
      width: 150,
      type: 'singleSelect',
      valueOptions: ['masc', 'fem', 'outros'],
      editable: true,
    },
    {
      field: 'birthDate',
      headerName: 'Data de Nascimento',
      width: 250,
      type: 'date',
      editable: true,
      valueFormatter: (params: Date) => {
        if (params == null) {
          return 'Data não informada';
        }

        const value = new Date(params);

        let formattedDate: string;

        formattedDate = value.toLocaleDateString("pt-BR", {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          timeZone: 'UTC'
        });

        return formattedDate;
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`save-${id}`}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={`cancel`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={`edit-${id}`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`delete-${id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div className='h-screen w-full' >
      <h3 className='text-white text-xl my-3 '>Tabela de dados</h3>
      <DataGrid
        className='bg-white'
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        editMode="row"
        rowModesModel={rowModesModel}
        processRowUpdate={processRowUpdate}
      />
    </div>
  );
}
