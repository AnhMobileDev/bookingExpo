import { Row, Col } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { memo, useMemo } from 'react';

import { FolderIcon, ArrowRight } from '../../assets/icon';
import { GuideEntity, InstructionEntity } from '../../graphql/type.interface';

type ItemProps = {
  item: InstructionEntity;
  handleLoadAnotherGuide(): void;
  key?: string;
};

const GuideItem = memo(({ item, handleLoadAnotherGuide, key }: ItemProps) => {
  return (
    <Row
      gutter={16}
      align={'middle'}
      onClick={handleLoadAnotherGuide}
      key={key}
      className="p-20px bg-white mb-6px hover:cursor-pointer">
      <Col span={2}>
        <FolderIcon />
      </Col>
      <Col span={20}>
        <h4 title={item?.name} className="text-14px line-clamp-1 font-medium">
          {item?.name}
        </h4>
        <p className="text-[13px] text-grayscale-gray leading-18px line-clamp-1">{item?.description}</p>
        <span className="text-[11px] text-grayscale-gray leading-14px">
          {dayjs(item?.updatedAt).format('DD-MM-YYYY')}
        </span>
      </Col>
      <Col span={2}>
        <ArrowRight />
      </Col>
    </Row>
  );
});

const TabGuide = memo(({ guide }: { guide: GuideEntity }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = useMemo(
    () => searchParams.get('instructionId') ?? guide?.instructions?.[0].id,
    [guide?.instructions, searchParams],
  );

  const descriptionDocument = useMemo(() => {
    const instruction = guide.instructions?.find((it) => it.id === id);
    return { description: instruction?.description ?? '', title: instruction?.name };
  }, [guide.instructions, id]);

  return (
    <div className="m-[20px] mt-0">
      <Row gutter={24} className="justify-between">
        <Col span={10}>
          <div className="h-[500px] overflow-y-auto overflow-x-hidden">
            {guide.instructions?.map((item) => (
              <GuideItem
                key={item?.id}
                item={item as InstructionEntity}
                handleLoadAnotherGuide={() => {
                  navigate({ search: `id=${guide?.id}&instructionId=${item.id}` });
                }}
              />
            ))}
          </div>
        </Col>
        <Col span={14}>
          <div className="p-20px bg-white">
            <div className="overflow-hidden">
              <h3 className="my-5">{descriptionDocument?.title}</h3>
              <p className="my-5">{descriptionDocument?.description}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
});

export default TabGuide;
