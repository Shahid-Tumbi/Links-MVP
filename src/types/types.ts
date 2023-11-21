export type Post = {
    id: string;
    content: string;
    image?: string;
    likes: number;
    profile: User;
  };
  
  export type User = {
    id: string;
    name: string;
    position: string;
    image?: string;
    backimage?: string;
    about?: string;
    experience?: Comments[];
  };
  
  export type Comments = {
    id: string;
    title: string;
    commentusername: string;
    commentimage?: string;
  };

  export type PostFinal = {
    postTitle: string;
    usernames: string;
    userBio: string;
    backImage?: string;
    image?: string;
  }