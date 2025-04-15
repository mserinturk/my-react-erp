import React, { useEffect, useState } from 'react'
import Module from '../../layouts/module/Module'
import ModuleHeader from '../../layouts/module/ModuleHeader'
import ModuleBody from '../../layouts/module/ModuleBody'
import { Link, useParams } from 'react-router-dom'
import AppButton from '../../components/Button'
import AppLabel from '../../components/Label'
import api from '../../services/API'
import { useTranslation } from 'react-i18next'
import Date from '../../components/Date'
import AppCard from '../../components/Card'
import Icon from '../../components/Icon'
import Loading from '../../components/Loading'

function show() {

  const {t} = useTranslation()
  const { id } = useParams()
  const [team, setTeam] = useState(null)

  useEffect(() => {
    api.get(`team/${id}`)
      .then(res => setTeam(res.data))
      .catch(err => console.error(err))
  }, [id])

  if (!team) return <Loading></Loading>

  return (
    <Module>
      <ModuleHeader
        title={t('modules.teams.show')}
        icon="users"
      >
        <div className='flex space-x-3'>
          <Link to={'/teams/'+id+'/edit'}>
            <AppButton prefixIcon="pen-to-square">{t('modules.teams.edit')}</AppButton>
          </Link>
          <Link to={'/teams/create'}>
            <AppButton prefixIcon="circle-plus">{t('modules.teams.create')}</AppButton>
          </Link>
        </div>
      </ModuleHeader>
      <ModuleBody>
        <AppCard header={team}>
          <div className='flex flex-col space-y-6'>
            <AppLabel icon="hashtag" title={t('views.teams.id')}>
              {team.id}
            </AppLabel>
            <AppLabel icon="users" title={t('views.teams.name')}>
              {team.name}
            </AppLabel>
            <AppLabel icon="align-left" title={t('views.teams.description')}>
              {team.description}
            </AppLabel>
            <AppLabel icon="calendar-days" title={t('views.teams.created_at')}>
              <Date>{team.createdAt}</Date>
            </AppLabel>
          </div>
        </AppCard>
      </ModuleBody>
    </Module>
  )
}

export default show