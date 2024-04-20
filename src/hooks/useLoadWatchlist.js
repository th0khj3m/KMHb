import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadWatchlist } from '../store/watchlist/watchlist.actions';

const useLoadWatchlist = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadWatchlist());
    }
  }, [dispatch, isAuthenticated]);
  
};

export default useLoadWatchlist;