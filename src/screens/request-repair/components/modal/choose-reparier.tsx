import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Radio, Row, Select, Space, Spin } from 'antd';
import { Link } from 'react-router-dom';

import { ModalCustomize } from '../../../../components/modal-customize';
import { LikeIcon, MoneyIcon, RoutingIcon, StarIcon, StarYellowIcon } from '../../../../assets/icon';
import {
  PartnersForBookingQueryVariables,
  usePartnersForBookingQuery,
} from '../../../../graphql/queries/partnersForBooking.generated';
import { RenderImage } from '../../../../components';
import { CategoryEntity, FileType, SortDirectionEnum } from '../../../../graphql/type.interface';
import { getNameCategoriesEntity, numberWithDots } from '../../../../utils';
import { FormChooseRepairer } from '../../type';
import { AppRoutes } from '../../../../helpers';

const { Option } = Select;

const optionsValue = {
  suggest: 'suggest',
  distance: 'distance',
  review: 'review',
  expense: 'expense',
};

const options = [
  {
    label: 'CALL ME đề xuất',
    value: optionsValue.suggest,
    icon: <LikeIcon />,
  },
  {
    label: 'Khoảng cách',
    value: optionsValue.distance,
    icon: <RoutingIcon />,
  },
  {
    label: 'Đánh giá',
    value: optionsValue.review,
    icon: <StarIcon />,
  },
  {
    label: 'Chi phí',
    value: optionsValue.expense,
    icon: <MoneyIcon />,
  },
];

type FormFilter = {
  isAgency: boolean;
  isTechnician: boolean;
  search: string;
  sortType: string;
};

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  onFinish: (values: FormChooseRepairer) => void;
  partnerId?: string;
  latitude: number;
  longitude: number;
  loading: boolean;
};

export const ChooseReparier = memo(
  ({
    setOpen,
    partnerId,
    latitude = 21.22682493600007,
    longitude = 105.94862301500007,
    loading: creating,
    onFinish,
    ...props
  }: Props) => {
    const page = useRef(1);
    const [filter, setFilter] = useState<PartnersForBookingQueryVariables>({
      limit: 3,
      page: page?.current,
      longitude,
      latitude,
    });

    const { data, loading, fetchMore } = usePartnersForBookingQuery({
      variables: filter,
      onCompleted(data) {
        page.current = data?.partnersForBooking?.meta?.currentPage ?? 1;
      },
    });
    const partners = useMemo(() => data?.partnersForBooking?.items, [data]);

    const [id, setId] = useState<string | null>(partnerId ?? null);

    const handleFilter = useCallback(
      (values: FormFilter) => {
        const sortBy =
          values.sortType === optionsValue.distance
            ? {
                distance: SortDirectionEnum.ASC,
              }
            : values.sortType === optionsValue.suggest
            ? {
                suggestionPoint: SortDirectionEnum.ASC,
              }
            : values.sortType === optionsValue.review
            ? {
                star: SortDirectionEnum.ASC,
              }
            : undefined;
        const newPage = 1;
        setFilter({
          ...filter,
          isAgency: !!values.isAgency,
          isTechnician: !!values?.isTechnician,
          sortBy,
          page: newPage,
          search: values?.search,
        });
        page.current = newPage;
      },
      [filter],
    );

    const handleLoadmore = useCallback(
      async (e: React.UIEvent<HTMLDivElement>) => {
        const target = e?.target as HTMLInputElement;
        const bottom = +(target?.scrollHeight - target?.scrollTop).toFixed() <= +target?.clientHeight + 1;

        if (
          bottom &&
          data &&
          (data?.partnersForBooking?.meta?.totalPages ?? 0) > (page?.current as number) &&
          !loading
        ) {
          const newFilter = {
            ...filter,
            page: page?.current + 1,
          };

          await fetchMore({
            variables: {
              ...newFilter,
            },
            updateQuery(previousQueryResult, { fetchMoreResult }) {
              if (!fetchMoreResult.partnersForBooking) return previousQueryResult;
              return {
                partnersForBooking: {
                  items: [
                    ...(previousQueryResult?.partnersForBooking?.items ?? []),
                    ...(fetchMoreResult?.partnersForBooking?.items ?? []),
                  ],
                  meta: fetchMoreResult?.partnersForBooking?.meta,
                },
              };
            },
          });
        }
      },
      [data, fetchMore, filter, loading],
    );

    return (
      <Spin spinning={loading || creating}>
        <ModalCustomize
          title="Đơn vị sửa chữa"
          onCancel={() => setOpen(false)}
          width={'60%'}
          {...props}
          okButtonProps={{
            disabled: !id,
            loading: creating,
          }}
          cancelButtonProps={{
            loading: creating,
          }}
          onOk={() => {
            const partnerById = partners?.find((it) => it?.id === id);
            if (partnerById && id) {
              onFinish({
                id,
                transportDistance: partnerById?.expenseInfo?.distance ?? 0,
                transportDuration: partnerById?.expenseInfo?.time ?? 0,
                transportFee: partnerById?.expenseInfo?.cost ?? 0,
              });
            }
          }}>
          <Row gutter={20}>
            <Col span={8}>
              <Form name="basic" className="w-full h-[380px]" onFinish={handleFilter}>
                <Form.Item className="mb-20px" name="search">
                  <Input className="w-full" placeholder="Nhập tên đơn vị" />
                </Form.Item>
                <Form.Item className="mb-20px" name="sortType">
                  <Select className="w-full" placeholder="Bộ lọc" optionLabelProp="label">
                    {options?.map(({ icon: Icon, value, label }) => (
                      <Option value={value} label={label} key={value}>
                        <Space>
                          <span role="img" aria-label="China">
                            {Icon}
                          </span>
                          {label}
                        </Space>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="isAgency" valuePropName="checked">
                  <Checkbox>Đơn vị sửa chữa là Đại lý</Checkbox>
                </Form.Item>
                <Form.Item className="mb-20px" name="isTechnician" valuePropName="checked">
                  <Checkbox>Đơn vị sửa chữa là Cá nhân</Checkbox>
                </Form.Item>
                <Button
                  htmlType="submit"
                  type="default"
                  className="border border-primary border-solid rounded-sm w-full ">
                  <span className="text-primary">Áp dụng</span>
                </Button>
              </Form>
            </Col>
            <Col span={16}>
              <div className="h-[380px] overflow-y-auto" onScroll={handleLoadmore}>
                {partners &&
                  partners.length > 0 &&
                  partners?.map((v) => (
                    <div
                      onClick={() => setId(v?.id)}
                      key={v?.id}
                      className="p-16px mb-12px rounded border border-solid border-grayscale-border flex justify-between items-center gap-x-16px hover:cursor-pointer">
                      <div className="flex gap-x-16px">
                        <RenderImage
                          fileType={FileType.IMAGE}
                          key={v?.id}
                          fullOriginalUrl={v?.avatar?.fullOriginalUrl ?? ''}
                          fullThumbUrl={v?.avatar?.fullThumbUrl ?? ''}
                          size={72}
                        />
                        <div>
                          <Link
                            to={AppRoutes.shopping.store.detailId(v?.id)}
                            target="_blank"
                            className="text-grayscale-black line-clamp-1 text-14px font-semibold leading-20px">
                            {v?.fullname}
                          </Link>
                          <p className="text-13px font-medium leading-18px">
                            {getNameCategoriesEntity((v?.qualifications as CategoryEntity[]) ?? [])}
                          </p>
                          <div className="flex items-center mt-8px">
                            <span className="text-12px">
                              <StarYellowIcon />
                              {v?.reviewSummary?.starAverage?.toFixed(1)}
                            </span>
                            <span className="text-12px leading-16px text-grayscale-light inline-block pl-6px">
                              ({v?.reviewSummary?.total ?? 0}đánh giá)
                            </span>
                          </div>
                          <div>
                            <span className="text-12px leading-16px">{v?.expenseInfo?.time} phút</span>
                            <span className="inline-block px-8px ">-</span>
                            <span className="text-12px leading-16px">
                              {numberWithDots(v?.expenseInfo?.distance ?? 0)} km
                            </span>
                          </div>
                          <p className="mt-12px text-blue leading-12px text-14px font-semibold">
                            {numberWithDots(v?.expenseInfo?.cost ?? 0)}đ
                          </p>
                        </div>
                      </div>
                      <Radio checked={v?.id === id} onChange={() => setId(v?.id)} />
                    </div>
                  ))}
              </div>
            </Col>
          </Row>
        </ModalCustomize>
      </Spin>
    );
  },
);
