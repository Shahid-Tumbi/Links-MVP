import { api } from '../../api';

export type User = {
  id: string;
  name: string;
  userName: string;
  email: string;
  phoneNumber : number;
  referrer: string;
  otp:number
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
    verifyOtp: build.mutation<User, Partial<User>>({
      query: ({ body,token }:any) => ({
        url: `/users/verify-otp`,
        method: 'POST',
        body:body,
        headers:{
          Authorization: token ? `Bearer ${token}` : '',
        }
      }),
    }),
    resendOtp: build.mutation({
      query: ({token}:any) => {
        return {
          url:`/users/resend-otp`,
          method:'POST',
          headers:{
            Authorization: token ? `Bearer ${token}` : '',
          }
        }
      },      
    }),
    loginUser: build.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: `/users/login`,
        method: 'POST',
        body:userData,
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

export const { useRegisterUserMutation,useVerifyOtpMutation,useResendOtpMutation,useLoginUserMutation,useUpdateUserMutation, usePostListMutation } = userApi;
