import { useEffect } from "react";
import { deleteUser, getUsers, loadUserSelected } from "../../store/slices/user/ThunksUser";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import {Link} from 'react-router-dom';   
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const Home = () => {

    const MySwal = withReactContent(Swal);
    const dispatch = useAppDispatch();
    const {users, isLoading} = useAppSelector(state => state.users);

    useEffect(() => {
      dispatch( getUsers() );
    }, [])
    
    const onClickEliminarUser = (id: string | undefined) => {
        MySwal.fire({
            title: '¿Está seguro?',
            text: "No se podrá recuperar el usuario",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true,
            customClass: {
                confirmButton: 'btn btn-success ms-3',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteUser(id)).catch(err => {
                Swal.fire( 'Error', 'No se pudo eliminar el usuario', 'error')
              })
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
                MySwal.fire('Cancelado', 'El usuario sigue activo :)', 'error')
            }
          })
    } 

  return (
    <>
        <h2>Usuarios</h2>
        <hr/>
        <div>
          <Link to={`/user/newPaciente`}>
              <button className="btn btn-primary">Crear</button>
          </Link>
        </div>

        {
          isLoading && 
          <div className="text-center mt-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }

        <table className="table table-light table-striped mt-2">
        <thead>
            <tr>
            <th scope="col">id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Email</th>
            <th scope="col">Avatar</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
            </tr>
        </thead>
        <tbody>
            {
                users.map( user => (
                    <tr key={user.id}>
                        <td className="align-middle">{user.id}</td>
                        <td className="align-middle">{user.first_name}</td>
                        <td className="align-middle">{user.second_name}</td>
                        <td className="align-middle">{user.email}</td>
                        <td className="align-middle">
                        <img src={user.avatar} className="rounded-circle" style={{width: '70px'}} alt="Avatar" />
                        </td>
                        <td className="align-middle">
                            <Link to={`/user/${user.id}`}>
                                <button className="btn btn-primary" onClick={() => dispatch(loadUserSelected(user))}>Editar</button>
                            </Link>
                        </td>
                        <td className="align-middle"><button className="btn btn-danger" onClick={() => onClickEliminarUser(user.id)}>Eliminar</button></td>    
                    </tr>
                ))
            }
        </tbody>
        </table>
    </>
  )
}
