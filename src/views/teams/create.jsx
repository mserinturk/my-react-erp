import React, { useState, useEffect } from 'react'
import Module from '../../layouts/module/Module'
import ModuleHeader from '../../layouts/module/ModuleHeader'
import ModuleBody from '../../layouts/module/ModuleBody'
import AppButton from '../../components/Button'
import AppFormRow from '../../components/FormRow'
import { useDispatch } from 'react-redux'
import { createTeam, updateTeam } from '../../features/team/TeamSlice'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../../services/API'
import { useTranslation } from 'react-i18next'
import { TextField } from '@mui/material'

function Create() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    name: "",
    description: ""
  })

  useEffect(() => {
    if (id) {
      api.get(`team/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error("Veri alınamadı:", err))
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const save = async () => {
    if (id) {
      await dispatch(updateTeam({ id, data: form }))
      navigate(`/teams/${id}`)
    } else {
      const newTeam = await dispatch(createTeam(form)).unwrap()
      navigate(`/teams/${newTeam.id}`)
    }
  }

  return (
    <Module>
      <ModuleHeader
        title={!id ? t('modules.teams.create') : t('modules.teams.update')}
        icon="users"
      >
        <Link to={'/teams/create'}>
          <AppButton prefixIcon="file-export" onClick={save}>{id ? t('modules.teams.update') : t('modules.teams.save')}</AppButton>
        </Link>
      </ModuleHeader>
      <ModuleBody>
        <div className='flex flex-col'>
          <AppFormRow
            title={t('views.teams.name')}
            description={t('views.teams.name_description')}
            >
              <TextField id="outlined-basic" variant="outlined" name="name" value={form.name} onChange={handleChange} fullWidth/>
          </AppFormRow>
          <AppFormRow
            title={t('views.teams.description')}
            description={t('views.teams.description_description')}
            >
              <TextField id="outlined-basic" variant="outlined" name="description" value={form.description} onChange={handleChange} fullWidth/>
          </AppFormRow>
        </div>
      </ModuleBody>
    </Module>
    
  )
}

export default Create