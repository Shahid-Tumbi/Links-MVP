import { api } from '../../api';

export type Notification = {
  id: string;
  page: number;
  limit: number;
  email: string;
  phoneNumber : number;
  referrer: string;
  otp:number
};
export const notificationApi = api.injectEndpoints({
  endpoints: build => ({
      notificationList: build.mutation({
        query: ({data,token}:any) => {
          return {
            url:`/notification/notificationList`,
            method:'POST',
            body:data,
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
    useNotificationListMutation
} = notificationApi;
