import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Checkbox, Input, SelectProps, Spin } from 'antd';

import { FormChooseProblems } from '../../type';
import { useCategoriesQuery } from '../../../../graphql/queries/categories.generated';
import { CategoryTypeEnum, StatusEnum } from '../../../../graphql/type.interface';
import { ModalCustomize } from '../../../../components/modal-customize';
import { useDebouceValue } from '../../../../hooks';

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  onFinish: (values: FormChooseProblems) => void;
  problems?: SelectProps['options'];
};

export const ChooseProblems = memo(({ setOpen, onFinish, problems = [], ...props }: Props) => {
  const [search, setSearch] = useState('');

  const [filter, setFilter] = useState({
    limit: 1000,
    page: 1,
    isActive: StatusEnum.ACTIVE,
    search: '',
    type: CategoryTypeEnum.PROBLEM,
  });
  const { data, loading } = useCategoriesQuery({
    variables: filter,
  });
  const problemOptions = useMemo(() => data?.categories?.items ?? [], [data]);

  const [ids, setIds] = useState<string[]>([]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const textSearch = useDebouceValue({ defaultValue: search });

  useEffect(() => {
    if (textSearch !== filter?.search) setFilter({ ...filter, search: textSearch, page: 1 });
  }, [filter, textSearch]);

  useEffect(() => {
    if (problems && problems.length > 0) {
      const newIds = problems?.map((it) => it?.value);
      setIds(newIds as string[]);
    }
  }, [problems]);

  const handleSelected = useCallback(
    (newId: string) => {
      const exist = ids.includes(newId);
      if (exist) {
        setIds(ids.filter((id) => id !== newId));
        return;
      }
      setIds([...ids, newId]);
    },
    [ids],
  );

  return (
    <Spin spinning={loading}>
      <ModalCustomize
        title="Chọn Hiện tượng hư hỏng"
        onCancel={() => setOpen(false)}
        {...props}
        okButtonProps={{
          disabled: !ids || ids.length === 0,
        }}
        onOk={() => {
          const problems = problemOptions?.filter((it) => ids.includes(it?.id));
          onFinish({
            ids,
            problems,
          });
        }}>
        <Input
          className="w-full"
          placeholder="Nhập Hiện tượng hư hỏng"
          onChange={(e) => handleSearch(e?.target?.value)}
        />
        <div className="h-[380px] overflow-y-auto mt-20px">
          {problemOptions &&
            problemOptions.length > 0 &&
            problemOptions?.map((v) => (
              <div
                key={v?.id}
                className="p-16px my-12px rounded border border-solid border-grayscale-border flex justify-between items-center gap-x-16px hover:cursor-pointer"
                onClick={() => handleSelected(v?.id)}>
                <span>{v?.name}</span>
                <Checkbox checked={ids.includes(v?.id)} />
              </div>
            ))}
        </div>
      </ModalCustomize>
    </Spin>
  );
});
