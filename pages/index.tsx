import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';

import { useRecoilState } from 'recoil';
import { homePageTabAtom } from '@/service/recoil';

import { HomePageTab } from '@/utils/enum';

import HomeLayout from '@/components/layout/HomeLayout';

export default function Home({ currentTab }: { currentTab: HomePageTab }) {
  // initialize
  const router = useRouter();

  // handling page routing
  const [tab, setTab] = useState(currentTab);

  const handlePageRouting = (tab: HomePageTab) => {
    router.push(`/?tab=${tab}`, undefined, { shallow: true });
  };
  useEffect(() => {
    const tab = router.query.tab;
    if (tab) {
      setTab(tab as HomePageTab);
    }
  }, [router.query.tab, setTab]);
  // end: handling page routing

  // initialize tab state
  useEffect(() => {
    setTab(currentTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='h-full w-full bg-primary'>
      <HomeLayout currentTab={tab} handlePageRouting={handlePageRouting}>
        {tab === HomePageTab.HOME && <div>Home</div>}
        {tab === HomePageTab.SAVED && <div>Saved</div>}
        {tab === HomePageTab.REQUEST_STATUS && <div>Request Status</div>}
        {tab === HomePageTab.PROFILE && <div>Profile</div>}
      </HomeLayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const {
    tab
  }: {
    tab: HomePageTab;
  } = context.query;

  if (!tab) {
    return {
      redirect: {
        destination: `/?tab=${HomePageTab.HOME}`,
        permanent: true
      }
    };
  }

  return {
    props: {
      currentTab: tab
    }
  };
};
