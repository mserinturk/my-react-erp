import React, { useState } from 'react'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Checkbox, Skeleton
} from '@mui/material'
import { useDispatch } from 'react-redux'
import AppButton from './Button'
import Icon from './Icon'
import { useTranslation } from 'react-i18next'

export default function AppTable({ rows, loading, headerCells, rowCells, columnWidths, deleteAction }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [selectedRow, setSelectedRow] = useState(null)
  const [searchKey, setSearch] = useState("")

  const handleSelect = (id) => {
    setSelectedRow(prev => (prev === id ? null : id))
  }

  const isSelected = (id) => selectedRow === id

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase())
  }

  const deleteRow = () => {
    if (selectedRow) {
      dispatch(deleteAction(selectedRow))
        setSelectedRow(null)
      }
  }

  const filteredRows = rows.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchKey)
    )
  )

  return (
    <div className='h-full flex flex-col'>
      <div className='mb-5 h-12 flex items-center'>
        {selectedRow ?
          <AppButton prefixIcon="trash" onClick={() => deleteRow(selectedRow)}>
            {t('delete')}
          </AppButton>
          :
          <div className='w-full relative'>
            <input
              type="text"
              onChange={handleSearch}
              value={searchKey}
              className='w-full border border-gray-200 dark:border-neutral-800 rounded-lg h-10 px-3 text-xs'
              placeholder={t('search')}
            />
            <Icon name="magnifying-glass" className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" />
          </div>
        }
      </div>

      {loading ? (
        <div>
          <Skeleton height={40} />
          <Skeleton height={40} animation="wave" />
          <Skeleton height={40} animation={false} />
        </div>
      ) : (
        <TableContainer component={Paper} className='overflow-auto'>
          <Table sx={{ minWidth: 640 }} aria-label="dynamic table">
            <TableHead className='sticky top-0 bg-gray-50 dark:bg-neutral-800 z-10'>
              <TableRow>
                <TableCell padding="checkbox" />
                {headerCells.map((cell, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      width: columnWidths?.[index] || 'auto',
                      maxWidth: columnWidths?.[index],
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => {
                const isItemSelected = isSelected(row.id)

                return (
                  <TableRow key={row.id} hover selected={isItemSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={() => handleSelect(row.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    {rowCells(row).map((cell, i) => (
                      <TableCell
                        key={i}
                        sx={{
                          width: columnWidths?.[i] || 'auto',
                          maxWidth: columnWidths?.[i],
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
              {filteredRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={headerCells.length + 1} className="text-center text-sm text-gray-500 py-5">
                    {t('search_not_found_description')} <span className="font-semibold ml-1\">{searchKey}</span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}