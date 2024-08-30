import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchUserDetail } from '../../redux/user/userSlice';
import { selectUserData } from '../../redux/user/userSelector';

const Account = () => {
  const params = useParams();
  const userId = params.id;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserDetail(userId))
  }, [])

  const {loading, userDetail} = useSelector(selectUserData)
  console.log('userDetail', userDetail);
  

  return (
    <div>Account</div>
  )
}

export default Account