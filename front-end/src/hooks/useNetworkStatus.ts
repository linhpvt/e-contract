import { useState } from 'react';
import useEventListener from './useEventListener';
export const NetworkStatus = {
  ONLINE: 'online',
  OFFLINE: 'offline',
};
export default function useNetworkStatus() {
  const [networkStatus, setNetworkStatus] = useState(
    window.navigator.onLine ? NetworkStatus.ONLINE : NetworkStatus.OFFLINE,
  );
  useEventListener(
    NetworkStatus.ONLINE,
    (e) => setNetworkStatus(NetworkStatus.ONLINE),
    window,
  );

  useEventListener(
    NetworkStatus.OFFLINE,
    (e) => setNetworkStatus(NetworkStatus.OFFLINE),
    window,
  );
  return networkStatus;
}
