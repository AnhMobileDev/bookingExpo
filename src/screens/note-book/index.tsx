import { Spin, Tabs, TabsProps, Tooltip } from 'antd';
import { useMemo, memo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { SubHeader } from '../../components';
import { AppRoutes } from '../../helpers';
import { useUserGetGuidesQuery } from '../../graphql/queries/userGetGuides.generated';
import { GuideEntity, StatusEnum } from '../../graphql/type.interface';

import TabGuide from './tab-guide';

const NoteBook = memo(() => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { data, loading } = useUserGetGuidesQuery({
    variables: { limit: 1000, page: 1, isActive: StatusEnum.ACTIVE },
  });

  const guideList: TabsProps['items'] = useMemo(() => {
    return (data?.userGetGuides?.items ?? [])
      .filter((item) => (item?.instructions?.length ?? 0) > 0)
      ?.map((item) => ({
        key: item.id,
        label: (
          <Tooltip title={item?.name}>
            <p title={item?.name}>{item?.name.length > 16 ? item.name.slice(0, 16) + '...' : item.name}</p>
          </Tooltip>
        ),
        id: item.id,
        instructions: item.instructions,
      }));
  }, [data]);

  const id = useMemo(() => (searchParams.get('id') ?? guideList?.[0]?.id) as string, [guideList, searchParams]);

  const onChangeGuide = useCallback(
    (activeTab: string) => {
      navigate({
        search: `id=${activeTab}`,
      });
    },
    [navigate],
  );

  const guide = useMemo(() => (guideList?.find((it) => it.id === id) ?? guideList?.[0]) as any, [guideList, id]);

  return (
    <div>
      <SubHeader
        items={[
          { title: 'Trang chủ', to: AppRoutes.home },
          { title: 'Sổ tay', to: AppRoutes.note.index },
        ]}
      />
      <div>
        <Spin spinning={loading}>
          <Tabs items={guideList} onChange={onChangeGuide} activeKey={id} />
          {guide != null && <TabGuide guide={guide as GuideEntity} />}
        </Spin>
      </div>
    </div>
  );
});

export default NoteBook;
