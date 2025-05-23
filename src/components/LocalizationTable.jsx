import * as React from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function LocalizationTable({ data }) {

  useEffect(() => {
  }, [data]);

  if (!data) return null;

  function createData(name, frequencia) {
    return { name, frequencia};
  }
  
  const rows = data.map((item) => createData(item.nome, item.frequencia));


  return (
    <TableContainer component={Paper} className='mt-10'>
      <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Nomes</StyledTableCell>
            <StyledTableCell>Frequencia</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.nome}>
              <StyledTableCell>
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row.frequencia}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
