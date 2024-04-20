import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRatings } from '../apis/rating';

const useFetchRatings = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchRatings());
    }
  }, [dispatch, isAuthenticated]);
  
};

export default useFetchRatings;