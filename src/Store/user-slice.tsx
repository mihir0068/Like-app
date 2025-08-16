import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  phone: string;
  birthDate: string;
  bloodGroup: string;
  weight: number;
  height: number;
  image: string;
  userName: string;
  university: string;
  company: {
    name: string;
    department: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      country: string;
    };
  };
}

interface Comment {
  id: string;
  userId: number;
  comments: string;
}
interface UserState {
  userData: User[];
  likedUsers: Record<number, boolean>; 
  comment: Comment[];
}

const initialState: UserState = {
  userData: [],
  likedUsers: [],
  comment: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.userData = action.payload;
    },
    toggleLike(state, action) {
      const userId = action.payload;
      state.likedUsers[userId] = !state.likedUsers[userId];
    },
    addCommnet(state, action) {
      const user = action.payload;
      state.comment.push({
        userId: user.userId,
        comments: user.comment,
        id: new Date().toISOString(),
      });
    },
    deleteComment(state, action) {
      const commentId = action.payload;
      state.comment = state.comment.filter(
        (comment) => comment.id !== commentId
      );
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
