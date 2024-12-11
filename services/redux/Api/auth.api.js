import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiWrapperFor401Error";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["playlist", "track"],
  endpoints: (builder) => ({
    //user
    ...{
      userSignin: builder.mutation({
        query: (body) => ({
          url: "/user/login/",
          method: "POST",
          body,
        }),
      }),
      userSignup: builder.mutation({
        query: (body) => ({
          url: "/user",
          method: "POST",
          body,
        }),
      }),
      userUpdate: builder.mutation({
        query: (body) => ({
          url: "/user",
          method: "PATCH",
          body,
        }),
      }),
      createPlaylist: builder.mutation({
        query: (body) => ({
          url: "/playlist/create",
          method: "POST",
          body,
        }),
        invalidatesTags: ["playlist"],
      }),
      addTrack: builder.mutation({
        query: (body) => ({
          url: "/track/create",
          method: "POST",
          body,
        }),
        invalidatesTags: ["track"],
      }),
      updatePlaylist: builder.mutation({
        query: (body) => ({
          url: "/playlist/update",
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["playlist"],
      }),
      deletePlaylist: builder.mutation({
        query: (body) => ({
          url: `/playlist/delete?id=${body}`,
          method: "DELETE",
          body,
        }),
        invalidatesTags: ["playlist"],
      }),
      deleteTrack: builder.mutation({
        query: (body) => ({
          url: `/track/delete?id=${body}`,
          method: "DELETE",
        }),
        invalidatesTags: ["track"],
      }),
      getAllPlaylist: builder.query({
        query: () => ({
          url: `/playlist/getall`,
        }),
        providesTags: ["playlist"],
      }),
      searchTrack: builder.query({
        query: (q) => ({
          url: `/track/getTrack/${q}`,
        }),
        providesTags: ["track"],
      }),
      gettAllTracks: builder.query({
        query: (q) => ({
          url: `/track/getall/${q}`,
        }),
        providesTags: ["track"],
      }),
    },

    // ====================================
  }),
});

export const {
  useUserSigninMutation,
  useUserSignupMutation,
  useUserUpdateMutation,
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
  useGetAllPlaylistQuery,
  useLazySearchTrackQuery,
  useAddTrackMutation,
  useGettAllTracksQuery,
  useDeleteTrackMutation,
} = authApi;
// export const { userSignin, userSignup } = authApi.endpoints;
