import { AutoComplete, Input, Spin } from 'antd';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { ManIcon, Protection, RefreshIcon, SearchNormal, TrashIcon } from '../../../../assets/icon';
import { useUserSearchSuggestionsQuery } from '../../../../graphql/queries/userSearchSuggestions.generated';
import { useDebouceValue } from '../../../../hooks';
import { STORAGE_KEYS } from '../../../../constants';

const renderItem = (title: string) => ({
  value: title,
  label: (
    <div
      key={'history' + title}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
      {title}
    </div>
  ),
});

const exploreData = [
  {
    label: 'CALL ME kiểm định',
    icon: <Protection width={32} height={32} />,
    value: 1,
  },
  {
    label: 'Gian hàng Uy tín',
    icon: <ManIcon />,
    value: 2,
  },
];

type Props = {
  onSearch: (value: string) => void;
  search?: string;
};

export const Search = memo(({ onSearch, search }: Props) => {
  const [textSearch, setTextSearch] = useState<string | null>();
  const debouceTextSearch = useDebouceValue({ defaultValue: textSearch });
  const { data, loading: loadingSuggest, refetch } = useUserSearchSuggestionsQuery({});
  const suggest = useMemo(() => data?.userSearchSuggestions ?? [], [data]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const history = useMemo(() => {
    const historyStringify = localStorage.getItem(STORAGE_KEYS.historySearchProduct);
    if (historyStringify && historyStringify.length > 0) {
      const parse = JSON.parse(historyStringify);
      return parse ? parse : [];
    }
    return [];
  }, []);

  const handleRemoveHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.historySearchProduct);
  }, []);

  const options = useMemo(
    () => [
      {
        label: (
          <span>
            Tìm kiếm gần đây
            <span className="float-right hover:cursor-pointer" onClick={handleRemoveHistory}>
              <TrashIcon />
            </span>
          </span>
        ),
        options: (history ?? []).map((text: string) => renderItem(text)),
      },
      {
        label: (
          <span>
            Đề xuất cho bạn
            <span className="float-right flex items-center gap-x-8px hover:cursor-pointer" onClick={handleRefresh}>
              Làm mới
              <RefreshIcon />
            </span>
          </span>
        ),
        options: (suggest ?? []).map((text) => ({
          value: text,
          label: (
            <div
              key={'suggest' + text}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              {text}
            </div>
          ),
        })),
      },
      {
        label: <span>Khám phá</span>,
        options: [
          {
            label: '',
            value: (
              <div className="flex items-center gap-x-16px">
                {exploreData.map(({ icon, label, value }) => (
                  <div key={'exploreData' + value} className="bg-ghost-white rounded hover:bg-white hover:text-primary">
                    <div className="flex justify-between items-center p-10px gap-x-12px">
                      <span className="text-[13px] font-semibold">{label}</span>
                      {icon}
                    </div>
                  </div>
                ))}
              </div>
            ),
          },
        ],
      },
    ],
    [handleRefresh, handleRemoveHistory, history, suggest],
  );

  const loading = useMemo(() => loadingSuggest, [loadingSuggest]);

  const handleSearch = useCallback((newValue: string) => {
    setTextSearch(newValue);
  }, []);

  const handleSelect = useCallback(
    (newValue: string) => {
      setTextSearch(newValue);
    },
    [setTextSearch],
  );

  useEffect(() => {
    if (debouceTextSearch && debouceTextSearch?.trim() && search !== debouceTextSearch) {
      onSearch(debouceTextSearch);
    }
  }, [debouceTextSearch, onSearch, search]);

  useEffect(() => {
    if (search && search !== debouceTextSearch) {
      setTextSearch(search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="px-[60px]">
        <AutoComplete
          value={textSearch}
          options={options}
          className="w-full"
          listHeight={600}
          onSearch={handleSearch}
          onSelect={handleSelect}>
          <Input
            suffix={<SearchNormal />}
            className="w-full"
            onPressEnter={(e) => e?.currentTarget?.value.trim() && onSearch(e?.currentTarget?.value.trim())}
            placeholder="Nhập tên sản phẩm"
          />
        </AutoComplete>
      </div>
    </Spin>
  );
});
