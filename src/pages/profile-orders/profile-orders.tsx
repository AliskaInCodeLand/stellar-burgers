import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getOrders,
  selectOrdersData
} from '../../services/slices/order/order-slice';

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectOrdersData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
