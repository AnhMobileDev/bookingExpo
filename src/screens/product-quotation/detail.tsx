import { memo, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Col, Image, Row, Spin } from 'antd';

import { SubHeader } from '../../components';
import { AppRoutes } from '../../helpers';
import { useUserProductQuotationQuery } from '../../graphql/queries/userProductQuotation.generated';
import { ProductQuotationStatusEnum } from '../../graphql/type.interface';

const RowItem = ({ label, value, valueColor }: { label?: string; value?: any; valueColor?: string }) => {
  return (
    <div className="flex justify-between items-baseline mb-[4px]">
      <span className="text-14px leading-20px font-normal text-grayscale-gray">{label}</span>
      {value && typeof value !== 'string' ? (
        value
      ) : (
        <span className={'text-14px leading-20px font-normal ' + valueColor}>{value}</span>
      )}
    </div>
  );
};

const ProductQuotationDetail = memo(() => {
  const { id = '' } = useParams();

  const { data, loading } = useUserProductQuotationQuery({
    variables: { id },
  });
  const quotation = useMemo(() => data?.userProductQuotation, [data]);

  if (!quotation) return null;
  return (
    <Spin spinning={loading}>
      <div>
        <SubHeader
          items={[
            { title: 'Trang chủ', to: AppRoutes.home },
            { title: AppRoutes.quotations.list.label, to: AppRoutes.quotations.list.value },
            { title: AppRoutes.quotations.detail.label, to: AppRoutes.quotations.detail.value },
          ]}
        />
        <div className="m-20px">
          <Row gutter={20}>
            <Col span={12}>
              <div className="bg-white p-20px min-h-[152px]">
                <h4 className="text-14px leading-29px font-semibold mb-16px">Thông tin gian hàng</h4>
                <RowItem
                  label="Tên gian hàng"
                  value={
                    <Link to={AppRoutes.shopping.store.detailId(quotation?.partnerId)}>
                      <span className={'text-14px leading-20px font-normal '}>{quotation?.partner?.fullname}</span>
                    </Link>
                  }
                />
                <RowItem label="Số điện thoại" value={quotation?.partner?.phone ?? ''} />
                <RowItem label="Địa chỉ" value={quotation?.partner?.mapAddress ?? ''} />
              </div>
            </Col>
            <Col span={12}>
              <div className="bg-white p-20px min-h-[152px]">
                <h4 className="text-14px leading-29px font-semibold mb-16px">Thông tin sản phẩm</h4>

                <RowItem
                  label="Sản phẩm"
                  value={
                    <div className="flex items-center">
                      <Image
                        src={quotation?.product?.avatar?.fullThumbUrl ?? ''}
                        width={40}
                        height={40}
                        preview={{
                          src: quotation?.product?.avatar?.fullOriginalUrl ?? '',
                        }}
                        className="rounded"
                      />
                      <span className="pl-12px text-14px font-medium leading-20px line-clamp-1">
                        {quotation?.product.name}
                      </span>
                    </div>
                  }
                />
                <RowItem label="Số lượng" value={quotation?.quantity ?? ''} />
              </div>
            </Col>
          </Row>
        </div>
        <div className="m-20px p-20px bg-white">
          <h4 className="text-14px leading-29px font-semibold mb-16px">Thông tin báo giá</h4>
          <RowItem
            label="Trạng thái"
            value={
              quotation?.status === ProductQuotationStatusEnum.RESPONDED ? (
                <span className="text-[#1BB045]">Đã phản hồi</span>
              ) : (
                <span className="text-blue">Chưa phản hồi</span>
              )
            }
          />
          <RowItem label="Yêu cầu chi tiết/Câu hỏi" value={quotation?.detail ?? ''} />
          <RowItem label="Nội dung báo giá" value={quotation?.response ?? ''} />
          <RowItem label="File đính kèm" value={''} />
          {quotation?.medias && quotation?.medias.length > 0 && (
            <div className="pt-12px">
              <span className="text-grayscale-gray">{quotation?.medias.length} đính kèm: </span>
              {quotation?.medias.map((media) => (
                <a
                  className="block"
                  href={media?.fullOriginalUrl as string}
                  target="_blank"
                  rel="noreferrer"
                  key={media?.id}>
                  {media?.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
});

export default ProductQuotationDetail;
