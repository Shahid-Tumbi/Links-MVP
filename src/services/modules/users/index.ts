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
export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    appConfig: build.mutation<User, Partial<User>>({
      query: () => ({
        url: `/config`,
        method: "GET",
      }),
    }),
    registerUser: build.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: `/users/register`,
        method: "POST",
        body: newUser,
        headers: {
          Authorization: "Basic bGlua3M6YmFja2VuZA==",
        },
      }),
    }),
    verifyOtp: build.mutation<User, Partial<User>>({
      query: ({ body, token }: any) => ({
        url: `/users/verify-otp`,
        method: "POST",
        body: body,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }),
    }),
    resendOtp: build.mutation({
      query: ({ token }: any) => {
        return {
          url: `/users/resend-otp`,
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),
    loginUser: build.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: `/users/login`,
        method: "POST",
        body: userData,
        headers: {
          Authorization: "Basic bGlua3M6YmFja2VuZA==",
        },
      }),
    }),
    forgotPassword: build.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: `/users/forgot-password`,
        method: "POST",
        body: userData,
        headers: {
          Authorization: "Basic bGlua3M6YmFja2VuZA==",
        },
      }),
    }),
    resetPassword: build.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: `/users/reset-password`,
        method: "POST",
        body: userData,
        headers: {
          Authorization: "Basic bGlua3M6YmFja2VuZA==",
        },
      }),
    }),
    updateUser: build.mutation<User, Partial<User>>({
      query: ({ id, body, token }: any) => {
        return {
          url: `/users/updateUserData/${id}`,
          method: "PUT",
          body: body,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),
    getCuratorList: build.mutation({
      query: ({ page, limit, id, token }: any) => {
        return {
          url: `/users/curatorList?page=${page}&limit=${limit}`,
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),

    getFollowerList: build.mutation({
      query: ({ id, token, page, limit }: any) => {
        return {
          url: `/users/followers/${id}?page=${page}&limit=${limit}`,
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),

    getFollowingList: build.mutation({
      query: ({ id, token, page, limit }: any) => {
        return {
          url: `/users/following/${id}?page=${page}&limit=${limit}`,
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),

    followSomeone: build.mutation<User, Partial<User>>({
      query: ({ id, token, body }: any) => {
        return {
          url: `/users/follow`,
          method: "POST",
          body: body,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),

    unfollowSomeone: build.mutation<User, Partial<User>>({
      query: ({ id, token, body }: any) => {
        return {
          url: `/users/unfollow`,
          method: "POST",
          body: body,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),
  }),

  overrideExisting: true,
});

export const {
  useAppConfigMutation,
  useRegisterUserMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
  useGetCuratorListMutation,
  useGetFollowerListMutation,
  useFollowSomeoneMutation,
  useGetFollowingListMutation,
  useUnfollowSomeoneMutation
} = userApi;
