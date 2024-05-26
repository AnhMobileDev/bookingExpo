import React, { memo } from 'react';
import { Form, Input, Rate, Spin } from 'antd';

import { PartnerEntity } from '../../graphql/type.interface';
import { ModalCustomize } from '../modal-customize';
import { validationMessages } from '../../helpers';

export type FormDataReviewPartner = {
  star: number;
  comment: string;
};

type Props = {
  partner: PartnerEntity;
  loading?: boolean;
  onFinish: (values: FormDataReviewPartner) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const ReviewPartner = memo(({ partner, setOpen, loading, onFinish, ...props }: Props) => {
  return (
    <ModalCustomize
      title="Đánh giá"
      {...props}
      okText="Gửi đánh giá"
      onCancel={() => setOpen(false)}
      okButtonProps={{
        form: 'review-customer',
        htmlType: 'submit',
        disabled: loading,
      }}>
      <Spin spinning={loading}>
        <Form
          size="small"
          id="review-customer"
          initialValues={{
            star: 5,
          }}
          onFinish={onFinish}
          layout="vertical">
          <div className="mt-24px">
            <div className="flex space-x-12px p-12px rounded border border-solid border-bright-gray">
              <img
                className="w-40px h-40px rounded-full border-2 border-solid border-white shadow-md"
                src={partner?.avatar?.fullThumbUrl ?? ''}
                alt="avatar"
              />
              <div className="flex flex-col grow">
                <span className="text-14px font-medium leading-20px">{partner?.fullname}</span>
                <span className="text-12px text-grayscale-gray leading-16px">{partner?.phone}</span>
              </div>
            </div>
          </div>
          <Form.Item
            className="mt-12px"
            label={<span className="text-14px leading-20px font-semibold">Độ thân thiện</span>}
            name={'star'}
            rules={[
              {
                validator(rule, value) {
                  if (!value) return Promise.reject(new Error('Vui lòng đánh giá độ thân thiện.'));
                  return Promise.resolve();
                },
              },
            ]}>
            <Rate className="text-[0px]" style={{ height: 30 }} />
          </Form.Item>
          <Form.Item
            className="my-12px pb-20px"
            label=""
            name="comment"
            rules={[
              {
                required: true,
                message: validationMessages.required,
              },
            ]}
            normalize={(e) => e.trimStart()}>
            <Input.TextArea placeholder="Nhập nội dung" maxLength={1000} showCount />
          </Form.Item>
        </Form>
      </Spin>
    </ModalCustomize>
  );
});
