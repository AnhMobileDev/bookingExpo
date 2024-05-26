import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { ModalCustomize } from '../../../../components/modal-customize';
import { useCategoriesQuery } from '../../../../graphql/queries/categories.generated';
import { CategoryTypeEnum, StatusEnum } from '../../../../graphql/type.interface';
import { useCancelBookingByUserMutation } from '../../../../graphql/mutations/cancelBookingByUser.generated';
import { showGraphQLErrorMessage } from '../../../../helpers';
import { showNotification } from '../../../../utils';

type Props = {
  bookingId?: string;
  open: boolean;
  refetch?: any;
  refetchCount?: any;
  onOk?: () => void;
  setIsModalCancel: (x: boolean) => void;
};

export const CancelRepair = (props: Props) => {
  const { bookingId, setIsModalCancel, refetch, refetchCount } = { ...props };

  const [note, setNote] = useState<string>('');

  const [selectedReason, setSelectedReason] = useState<string[]>([]);

  const { data: dataCategories, loading } = useCategoriesQuery({
    variables: { type: CategoryTypeEnum.CANCEL_REASON, limit: 1000, isActive: StatusEnum.ACTIVE },
  });

  const reasons = useMemo(() => dataCategories?.categories.items, [dataCategories?.categories.items]);

  const handleSelected = (id: string) => {
    const exist = selectedReason.includes(id);

    if (!exist) {
      setSelectedReason([...selectedReason, id]);
      return;
    }
    setSelectedReason(selectedReason.filter((i) => i !== id));
  };

  const [userCancelBooking, { loading: canceling }] = useCancelBookingByUserMutation({
    onCompleted: () => {
      showNotification('success', 'Hủy yêu cầu sửa chữa thành công');
      refetch?.();
      refetchCount?.();
      setIsModalCancel(false);
    },
    onError: showGraphQLErrorMessage,
  });

  const handleCancelRequest = useCallback(async () => {
    await userCancelBooking({
      variables: {
        input: {
          bookingId: bookingId as string,
          note: note ? note : '',
          reasons: selectedReason,
        },
      },
    });
  }, [bookingId, note, selectedReason, userCancelBooking]);

  const handleChangeNote = (e: ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value);

  return (
    <ModalCustomize
      title="Lý do hủy yêu cầu sửa chữa"
      okText="Xác nhận"
      okButtonProps={{ disabled: selectedReason.length <= 0 }}
      onOk={handleCancelRequest}
      onCancel={() => setIsModalCancel(false)}
      {...props}>
      <Spin spinning={loading || canceling}>
        <div className="h-[440px] overflow-y-auto text-14px leading-18px ">
          {(reasons || []).map((reason, key: number) => (
            <div
              onClick={() => handleSelected(reason.id)}
              className={`px-16px py-12px mt-16px border border-[#EEEEEE] border-solid rounded mb-12px last:mb-0 cursor-pointer ${
                selectedReason.includes(reason.id) ? 'border-[#F5B102] border-solid bg-[#FFFDF6]' : ''
              }`}
              key={key}>
              {reason.name}
            </div>
          ))}

          <TextArea placeholder="Nhập lý do khác" value={note} maxLength={1000} onChange={handleChangeNote} showCount />
        </div>
      </Spin>
    </ModalCustomize>
  );
};
