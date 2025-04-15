import React, { useState } from 'react'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Checkbox,
  Skeleton
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Date from '../components/Date'
import AppButton from './Button'
import { deleteTeam } from '../features/team/TeamSlice'
import { useDispatch } from 'react-redux'
import Icon from './Icon'

export default function AccessibleTable(props) {
  const { rows, module, titles, loading } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [selectedRow, setSelectedRow] = useState(null)
  const [searchKey, setSearch] = useState("")

  const handleSelect = (id) => {
    setSelectedRow(prev => (prev === id ? null : id))
  }

  const isSelected = (id) => selectedRow === id

  const deleteRow = () => {
    if (selectedRow) {
      dispatch(deleteTeam(selectedRow))
      setSelectedRow(null)
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase())
  }

  const filteredRows = rows.filter(row =>
    row.name?.toLowerCase().includes(searchKey) ||
    row.description?.toLowerCase().includes(searchKey)
  )

  return (
    <div className='h-full flex flex-col'>
      <div className='mb-5 h-12 flex items-center'>
        {selectedRow ?
          <AppButton prefixIcon="trash" onClick={deleteRow} disabled={!selectedRow}>
            Delete
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
      {loading ? 
        <div>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </div>
      :
      <TableContainer component={Paper} className='overflow-auto'>
        <Table sx={{ minWidth: 650 }} aria-label="single-selectable table">
          <TableHead className='sticky top-0 bg-gray-50 dark:bg-neutral-800 z-10'>
            <TableRow>
              <TableCell padding="checkbox" />
              {titles.map((title) => (
                <TableCell key={title}>{t(`views.${module}.${title}`)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => {
              const isItemSelected = isSelected(row.id)

              return (
                <TableRow
                  key={row.id}
                  hover
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onChange={() => handleSelect(row.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={`/${module}/${row.id}`}>
                      {row.name}
                    </Link>
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <Date>{row.createdAt}</Date>
                  </TableCell>
                </TableRow>
              )
            })}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={titles.length + 1} className="text-center text-sm text-gray-500 py-5">
                  {t('search_not_found_description')} "<strong>{searchKey}</strong>"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      }
    </div>
  )
}