import { createSelector } from "@reduxjs/toolkit";

const selectLoading = state => state.user.loading;
const selectUserDetail = state => state.user.userDetail;

export const selectUserData = createSelector(
    [selectLoading, selectUserDetail],
    (loading, userDetail) => {
        return {loading, userDetail}
    })