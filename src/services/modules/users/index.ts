import { api } from '../../api';

export type User = {
  id: string;
  name: string;
  userName: string;
  email: string;
  phoneNumber : number;
  referrer: string;
};
export const userApi = api.injectEndpoints({
  endpoints: build => ({
    registerUser: build.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: `/users/register`,
        method: 'POST',
        body:newUser,
        headers:{
          Authorization: 'Basic bGlua3M6YmFja2VuZA=='
        }
      }),
    }),
    updateUser: build.mutation<User, Partial<User>>({
      query: ({ id,body,token }:any) => {
        return {
          url: `/users/updateUserData/${id}`,
          method: 'PUT',
          body:body,
          headers:{
            Authorization: token ? `Bearer ${token}` : '',
          }
        }},
      }),
      postList: build.mutation({
        query: ({page,limit,token}:any) => {
          return {
            url:`/posts?page=${page}&limit=${limit}`,
            method:'GET',
            headers:{
              Authorization: token ? `Bearer ${token}` : '',
            }
          }
        },      
      }),
    }),
    
    overrideExisting: true,
  });

export const { useRegisterUserMutation,useUpdateUserMutation, usePostListMutation } = userApi;
