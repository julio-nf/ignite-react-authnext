import { useContext } from 'react';
import { Can } from '../components/Can';

import { AuthContext } from '../contexts/AuthContext';
// import { useCan } from '../hooks/useCan';
import { setupApiClient } from '../services/api';
import { withSsrAuth } from '../utils/withSsrAuth';

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  // const userCanSeeMetrics = useCan({
  //   permissions: ['metrics.list'],
  // });

  return (
    <>
      <h1>Dashboard:{user?.email}</h1>

      <Can permissions={['metrics.list']} roles={['administrator']}>
        Can I see it?
      </Can>

      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export const getServerSideProps = withSsrAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);

  const response = await apiClient.get('/me');

  console.log(response.data);

  return {
    props: {},
  };
});
