import { Col, Row, Collapse } from 'antd';
import { useState } from 'react';

import { FolderIcon } from '../../assets/icon';
import { SubHeader } from '../../components';
const { Panel } = Collapse;
const References = () => {
  const [active, setActive] = useState<any>();
  const data = [
    {
      title: 'Tài liệu đào tạo Komatsu',
      subTitle: ' Tài liệu tiếng việt Komatsu pc-200-8',
      createdAt: '28-01-2023',
      categories: [
        { id: 1, name: 'P1.1 Document Name' },
        { id: 2, name: 'P1.2 Document Name' },
      ],
    },
    {
      title: 'Tài liệu đào tạo Komatsu',
      subTitle: ' Tài liệu tiếng việt Komatsu pc-200-8',
      createdAt: '28-01-2023',
      categories: [
        { id: 3, name: 'P1.1 Document Name' },
        { id: 4, name: 'P1.2 Document Name' },
      ],
    },
    {
      title: 'Tài liệu đào tạo Komatsu',
      subTitle: ' Tài liệu tiếng việt Komatsu pc-200-8',
      createdAt: '28-01-2023',
      categories: [
        { id: 5, name: 'P1.1 Document Name' },
        { id: 6, name: 'P1.2 Document Name' },
      ],
    },
  ];
  return (
    <div>
      <SubHeader
        items={[
          { title: 'Trang chủ', to: null },
          { title: 'Tài liệu tham khảo', to: null },
        ]}
      />
      <div className="mx-[24px] my-[20px]">
        <Row gutter={20}>
          <Col span={8}>
            <div className="bg-white">
              <Collapse defaultActiveKey={['1']} ghost expandIconPosition="end">
                {data.map((item, idx) => {
                  const categories = item.categories;
                  return (
                    <Panel
                      header={
                        <div className="flex items-center">
                          <FolderIcon className="mr-[16px]" />
                          <div>
                            <h3 className="text-grayscale-black font-medium text-[14px]">Tài liệu đào tạo Komatsu</h3>
                            <p className="font-normal text-[13px] pt-1 pb-[8px] text-grayscale-gray">
                              Tài liệu tiếng việt Komatsu pc-200-8
                            </p>
                            <p className="text-grayscale-light text-[11px]">28-01-2023</p>
                          </div>
                        </div>
                      }
                      key={idx}>
                      <div>
                        {categories.length > 0 &&
                          categories.map(({ name, id }, index) => {
                            return (
                              <div key={index} className="ml-[44px]">
                                <button
                                  onClick={() => setActive(id)}
                                  className={`${
                                    active === id ? 'bg-[#EEEEEE]' : 'bg-white'
                                  }  py-[12px] px-[16px] mb-3 w-full outline-none  border rounded text-[13px] font-normal hover:cursor-pointer text-grayscale-black text-left border-[#EEEEEE] border-solid`}>
                                  {name}
                                </button>
                              </div>
                            );
                          })}
                      </div>
                    </Panel>
                  );
                })}
              </Collapse>
            </div>
          </Col>
          <Col span={16}>
            <div className="bg-white p-[48px]">
              <h2 className="text-grayscale-black font-semibold text-[24px] pb-[20px]">P1.1 Document Name</h2>
              <div>content</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default References;
