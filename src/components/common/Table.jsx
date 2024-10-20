import { Paper } from '@mui/material'
import { DataGrid, useGridApiRef } from '@mui/x-data-grid'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export function CustomTable({
  rows,
  columns,
  paginationModel,
  checkboxSelection = false,
  setSelectedRowIndex
}) {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 100]}
        checkboxSelection={checkboxSelection}
        sx={{ border: 0 }}
        autosizeOptions={{ includeOutliers: true, expand: true }}
        onRowClick={(newSelection) => {
          setSelectedRowIndex(newSelection.row)
        }}
      />
    </Paper>
  )
}
