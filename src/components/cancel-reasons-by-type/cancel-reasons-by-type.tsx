import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { CategoryTypeEnum, StatusEnum } from '../../graphql/type.interface';
import { useCategoriesQuery } from '../../graphql/queries/categories.generated';
import { ModalCustomize } from '../modal-customize';

export type FormValueReject = { note: string; reasons: string[] };

type Props = {
  open: boolean;
  onOk?: () => void;
  setOpen: (newOpen: boolean) => void;
  loading: boolean;
  onFinish: (values: FormValueReject) => void;
  type: CategoryTypeEnum;
  title: string;
};

export const CancelReasonsByType = ({ setOpen, onFinish, type, loading, title, ...props }: Props) => {
  const [note, setNote] = useState<string>('');

  const [selectedReason, setSelectedReason] = useState<string[]>([]);

  const { data: dataCategories, loading: getting } = useCategoriesQuery({
    variables: { type, limit: 1000, isActive: StatusEnum.ACTIVE },
  });

  const reasons = useMemo(() => dataCategories?.categories.items, [dataCategories?.categories.items]);

  const handleSelected = useCallback(
    (id: string) => {
      const exist = selectedReason.includes(id);

      if (!exist) {
        setSelectedReason([...selectedReason, id]);
        return;
      }
      setSelectedReason(selectedReason.filter((i) => i !== id));
    },
    [selectedReason],
  );

  const handleChangeNote = (e: ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value);

  return (
    <ModalCustomize
      title={title}
      okText="Xác nhận"
      okButtonProps={{ disabled: selectedReason.length <= 0 || loading }}
      cancelButtonProps={{
        disabled: loading,
      }}
      onOk={() =>
        onFinish({
          reasons: selectedReason,
          note,
        })
      }
      onCancel={() => setOpen(false)}
      {...props}>
      <Spin spinning={loading || getting}>
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

          <TextArea placeholder="Nhập lý do khác" value={note} maxLength={255} onChange={handleChangeNote} showCount />
        </div>
      </Spin>
    </ModalCustomize>
  );
};
