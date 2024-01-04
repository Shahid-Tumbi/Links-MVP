import { api } from "../../api";

export type User = {
  id: string;
  name: string;
  userName: string;
  email: string;
  phoneNumber: number;
  referrer: string;
  otp: number;
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
      PostDetail: build.mutation({
        query: ({id,token}:any) => {
          return {
            url:`/posts/${id}`,
            method:'GET',
            headers:{
              Authorization: token ? `Bearer ${token}` : '',
            }
          }
        },      
      }),
      DeletePost: build.mutation({
        query: ({id, token}:any) => {
          return {
            url:`/posts/delete/${id}`,
            method:'DELETE',
            headers:{
              Authorization: token ? `Bearer ${token}` : '',
            }
          }
      }
    }),
      likePost: build.mutation({
        query: ({ body,token }:any) => {
          return {
            url:`/posts/like`,
            method:'POST',
            body:body,
            headers:{
              Authorization: token ? `Bearer ${token}` : '',
            }
          }
        },      
      }),
      dislikePost: build.mutation({
        query: ({ body,token }:any) => {
          return {
            url:`/posts/dislike`,
            method:'POST',
            body:body,
            headers:{
              Authorization: token ? `Bearer ${token}` : '',
            }
          }
        },      
      }),
      sharePost: build.mutation({
        query: ({ body,token }:any) => {
          return {
            url:`/posts/share`,
            method:'POST',
            body:body,
            headers:{
              Authorization: token ? `Bearer ${token}` : '',
            }
          }
        },      
      }),
      commentPost: build.mutation({
        query: ({ body,token }:any) => {
          return {
            url:`/posts/comment`,
            method:'POST',
            body:body,
            headers:{
              Authorization: token ? `Bearer ${token}` : '',
            }
          }
        },      
      }),
      commentList: build.mutation({
        query: ({ id,page,limit,token }:any) => {
          return {
            url:`/posts/comment/${id}?parentId=&page=${page}&limit=${limit}`,
            method:'GET',
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
  usePostListMutation,
  useAddPostMutation,
  usePostDetailMutation,
  useLikePostMutation,
  useDislikePostMutation,
  useSharePostMutation,
  useCommentPostMutation,
  useCommentListMutation,
  useGetUserWisePostListMutation,
  useDeletePostMutation
} = postApi;
