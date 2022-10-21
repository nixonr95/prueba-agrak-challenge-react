import { FormEvent, useEffect,useState } from 'react';
import { Routes, Route, useParams, Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { User } from '../../models/user';
import { createUser, getUserById, updateUser } from '../../store/slices/user/ThunksUser';
import { store, useAppDispatch, useAppSelector } from "../../store/Store";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export const CreateEditUser = () => {
  
  let navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.users.userSelected);
  const [userSelected, setUserSelected] = useState(user);
  const [isLoading, setIsLoading] = useState(false);
  const { 
    formData, onChange, resetForm, isValidEmail, setForm, setFormData,
    first_name, second_name, avatar, email, 
  } = useForm({
    first_name:    userSelected?.first_name || '',
    second_name:   userSelected?.second_name || '',
    email:         userSelected?.email || '',
    avatar:        userSelected?.avatar || ''
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      let createdAt = userSelected?.createdAt || '';

      if (id === 'newPaciente') createdAt = new Date().toISOString();

      const usuario: User = {
        avatar,
        email,
        first_name,
        second_name,
        id: (id !== 'newPaciente') ? id : undefined,
        createdAt
      }

      if (id !== 'newPaciente') {
        dispatch(updateUser(usuario)).then(resp => {
          navigate('/home')
        }).catch(err => {
          Swal.fire( 'Error', 'No se pudo actualizar el usuario', 'error');
          setIsLoading(false);
        })
      } else {
        dispatch(createUser(usuario)).then(resp => {
          navigate('/home')
        }).catch(err => {
          Swal.fire( 'Error', 'No se pudo crear el usuario', 'error');
          setIsLoading(false);
        })      
      }
  }
  
  useEffect(() => {
      if(id !== 'newPaciente') {
        dispatch( getUserById(id) ).then(resp => {
          const prueba = store.getState();
          setUserSelected(prueba.users.userSelected);
          if(userSelected){
            setFormData({
              first_name:    userSelected!.first_name || '',
              second_name:   userSelected!.second_name || '',
              email:         userSelected!.email || '',
              avatar:        userSelected!.avatar || ''
            })
          }
        })
      }
  }, [!userSelected])

  return (
    <div>
      <h1>{id !== 'newPaciente' ? 'Editar usuario' : 'Crear usuario' }</h1>
      <form noValidate onSubmit={ onSubmit }>
        <div className="row">
          <label className="form-label">Nombre</label>
          <input 
              type="text"
              placeholder="Nombre"
              name="first_name"
              value={ first_name }
              onChange={ onChange }
              className={ `${ first_name.trim().length <= 0 ? 'form-control is-invalid' : 'form-control is-valid'}` }
          />
          { first_name.trim().length <= 0 && <span className="invalid-feedback">Este campo es necesario</span> }
        </div>
        <div className="row">
          <label className="form-label">Apellido</label>
          <input 
              type="text"
              placeholder="Apellido"
              name="second_name"
              value={ second_name }
              onChange={ onChange }
              className={ `${ second_name.trim().length <= 0 ? 'form-control is-invalid' : 'form-control is-valid'}` }
          />
          { second_name.trim().length <= 0 && <span className="invalid-feedback">Este campo es necesario</span> }
        </div>
        <div className="row">
          <label className="form-label">Email</label>
          <input 
              type="email"
              placeholder="Email"
              name="email"
              value={ email }
              onChange={ onChange }
              className={ `${ !isValidEmail(email) ? 'form-control is-invalid' : 'form-control is-valid'}` }
          />
          { !isValidEmail( email ) && <span>Email no es válido</span> }
        </div>
        <div className="row">
          <label className="form-label">Avatar</label>
          <input 
              type="text"
              placeholder="Avatar"
              name="avatar"
              value={ avatar }
              onChange={ onChange }
              className="form-control is-valid"
          />
        </div>

        <div className="row mt-3">
          <div className="col">
            <Link to='/home'>
              <button type="button" className="btn btn-secondary" onClick={ resetForm }>Cancelar</button>        
            </Link>
            <button type="submit" className="btn btn-primary ms-5" disabled={isLoading}> 
              {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              {id === 'newPaciente' ? 'Crear': 'Actualizar'} 
            </button>
          </div>
        </div>

      </form>
    </div>
  )
}
