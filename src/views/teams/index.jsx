import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Module from '../../layouts/module/Module'
import ModuleHeader from '../../layouts/module/ModuleHeader'
import ModuleBody from '../../layouts/module/ModuleBody'
import { getTeam } from '../../features/team/TeamSlice'
import AppButton from '../../components/Button'
import { Link } from 'react-router-dom'
import AppTable from '../../components/Table'
import { useTranslation } from 'react-i18next'

function team() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {teams, loading, error} = useSelector((state) => state.team)

  useEffect(() => {
    dispatch(getTeam())
  }, [dispatch])

  return (
    <Module>
      <ModuleHeader
        title={t('modules.teams.index')}
        icon="users"
       >
        <Link to={'/teams/create'}>
          <AppButton prefixIcon="users">{t('modules.teams.create')}</AppButton>
        </Link>
       </ModuleHeader>
       <ModuleBody>
          <AppTable loading={loading} rows={teams} module="teams" titles={["name", "description", "created_at"]}>
          </AppTable>
       </ModuleBody>
    </Module>
  )
}

export default team