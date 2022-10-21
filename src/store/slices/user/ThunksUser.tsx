import Swal from "sweetalert2";
import { userApi } from "../../../api/UserApi";
import { User } from "../../../models/user";
import { AppDispatch, RootState } from "../../Store";
import { startLoadingUsers, setUsers, setUserSelected, startDeleteUser, startUpdateUser, startCreateUser } from "./UserSlice";

export const getUsers = () => {
    return async ( dispatch: AppDispatch, getState: () => RootState ) => {
        dispatch(startLoadingUsers ());    

        const {data, status} = await userApi.get('/users');

        dispatch(setUsers({users: data}));
    }
}

export const getUserById = (id: string | undefined) => {
    return async ( dispatch: AppDispatch, getState: () => RootState ) => {
        const {data: user} = await userApi.get(`/users/${id}`);
        dispatch(setUserSelected({user}));
    }
}

export const loadUserSelected = (user: User) => {
    return ( dispatch: AppDispatch, getState: () => RootState ) => {        
        dispatch(setUserSelected({user}));
    }
}

export const updateUser = (user: User) => {
    return async ( dispatch: AppDispatch, getState: () => RootState ) => {     
        const resp = await userApi.put(`/users/${user.id}`, user);
        dispatch(startUpdateUser({user}));
        Swal.fire( 'Actualizado!', 'El usuario ha sido actualizado.', 'success');
    }
}

export const createUser = (user: User) => {
    return async ( dispatch: AppDispatch, getState: () => RootState ) => {     
        const {data} = await userApi.post(`/users`, user);
        user = data;
        dispatch(startCreateUser({user}));
        Swal.fire( 'Creado!', 'El usuario ha sido creado.', 'success');
    }
}

export const deleteUser = (id: string | undefined) => {
    return async ( dispatch: AppDispatch, getState: () => RootState ) => {     
        const resp = await userApi.delete(`/users/${id}`); 
        dispatch(startDeleteUser({id}));
        Swal.fire( 'Eliminado!', 'El usuario ha sido eliminado.', 'success')
    }
}