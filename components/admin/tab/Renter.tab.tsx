import AdminTabLayout from '@/components/layout/AdminTabLayout';
import RenterTable from '../table/RenterTable';

import useModal from '@/components/Modals/useModal';
import RequestDetail from '@/components/Modals/RequestDetail';
import { BookRequest } from '@/types';
import { useState } from 'react';

import { useRecoilValue } from 'recoil';
import { AdminAllRequestAtom } from '@/service/recoil/admin';

export default function RenterTab() {
  const requestData = useRecoilValue(AdminAllRequestAtom);

  const [viewRequest, setViewRequest] = useState<BookRequest | null>(null);
  const { toggle, ModalWrapper } = useModal();

  return (
    <AdminTabLayout title='Renter'>
      <ModalWrapper>
        <RequestDetail request={viewRequest} />
      </ModalWrapper>

      <RenterTable
        data={requestData.filter(
          (request) => request.isApproved && request.status === 'ACHIEVED'
        )}
        actions={[
          {
            label: 'View',
            onClick: (request) => {
              setViewRequest(request);
              toggle();
            },
            bgColor: 'bg-alt-secondary'
          }
        ]}
      />
    </AdminTabLayout>
  );
}
