import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Button, Checkbox, Result, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { ModalCustomize } from '../../../components/modal-customize';
import { useCategoriesQuery } from '../../../graphql/queries/categories.generated';
import { CategoryTypeEnum, MaintenanceStatusEnum, StatusEnum } from '../../../graphql/type.interface';
import { useCancelMaintenanceMutation } from '../../../graphql/mutations/cancelMaintenance.generated';
import { AppRoutes, showGraphQLErrorMessage } from '../../../helpers';
import { SuccessModal } from '../../../assets/icon';
import { TIME_FORMAT } from '../../../constants/format';

interface CancelMaintenanceModalProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

export const CancelMaintenance = ({ id, open, onClose }: CancelMaintenanceModalProps) => {
  const [note, setNote] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>();

  const { data: dataCategories, loading } = useCategoriesQuery({
    variables: { type: CategoryTypeEnum.CANCEL_REASON, limit: 1000, isActive: StatusEnum.ACTIVE },
  });

  const reasons = useMemo(() => dataCategories?.categories.items ?? [], [dataCategories?.categories.items]);

  const [userCancelMaintenance, { loading: canceling }] = useCancelMaintenanceMutation({
    onCompleted: () => {
      setSuccess(dayjs().format(TIME_FORMAT));
    },
    onError: showGraphQLErrorMessage,
  });

  const cancelMaintenance = useCallback(() => {
    userCancelMaintenance({ variables: { input: { maintenanceId: id, note, reasons: selectedReason } } });
  }, [id, note, selectedReason, userCancelMaintenance]);

  const onChangeCheckbox = (checkedValues: CheckboxValueType[]) => setSelectedReason(checkedValues as string[]);

  const handleChangeNote = (e: ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value);

  return (
    <ModalCustomize
      open={open}
      title={success ? undefined : 'Lý do hủy yêu cầu bảo dưỡng'}
      okText="Xác nhận"
      okButtonProps={success ? { style: { display: 'none' } } : { disabled: selectedReason.length !== 0 && !note }}
      cancelButtonProps={success ? { style: { display: 'none' } } : undefined}
      onOk={cancelMaintenance}
      onCancel={onClose}>
      <Spin spinning={loading || canceling}>
        {success ? (
          <Result
            icon={<SuccessModal />}
            title={<p className="font-semibold text-17px mb-3">Hủy yêu cầu bảo dưỡng thành công</p>}
            subTitle={
              <>
                <p className="mb-3">{success}</p>
                <p>Cảm ơn bạn đã gửi phản hồi về việc Hủy yêu cầu bảo dưỡng</p>
              </>
            }
            extra={
              <div className="flex flex-col gap-3">
                <Link to={AppRoutes.maintenances.create.value}>
                  <Button style={{ width: 240 }}>Tạo yêu cầu mới</Button>
                </Link>
                <Link
                  to={AppRoutes.maintenances.index}
                  state={{ activeTab: MaintenanceStatusEnum.DENY }}
                  onClick={() => {
                    if (window.location.pathname === AppRoutes.maintenances.index) return window.location.reload();
                  }}>
                  <Button type="primary">Về trang Danh sách bảo dưỡng</Button>
                </Link>
              </div>
            }
          />
        ) : (
          <div className="h-[55vh] overflow-y-auto text-14px leading-18px mt-8">
            <Checkbox.Group className="flex flex-col space-y-6 mb-2" onChange={onChangeCheckbox}>
              {reasons.map((reason) => (
                <Checkbox style={{ marginInlineStart: 0 }} key={reason.id} value={reason.id}>
                  {reason.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
            <TextArea
              placeholder="Nhập lý do khác"
              value={note}
              autoSize={{ minRows: 3, maxRows: 6 }}
              maxLength={255}
              onChange={handleChangeNote}
              showCount
            />
          </div>
        )}
      </Spin>
    </ModalCustomize>
  );
};
