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
export const postApi = api.injectEndpoints({
  endpoints: build => ({
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
      addPost: build.mutation({
        query: ({ body,token }:any) => {
          return {
            url:`/posts/create`,
            method:'POST',
            body:body,
            headers:{
              Authorization: token ? `Bearer ${token}` : '',
            }
          }
        },      
      }),
      getUserWisePostList: build.mutation({
        query: ({page,limit,token,userId}:any) => {
          return {
            url:`/posts/userWiseList/${userId}?page=${page}&limit=${limit}'`,
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

export const {
  usePostListMutation,useAddPostMutation, useGetUserWisePostListMutation } = postApi;


