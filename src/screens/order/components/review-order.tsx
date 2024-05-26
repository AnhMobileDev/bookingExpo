import { memo, useEffect } from 'react';
import { Form, Input, Rate, Spin } from 'antd';

import { CreateProductReviewInput, OrderProductEntity, PartnerEntity } from '../../../graphql/type.interface';
import { ModalCustomize } from '../../../components/modal-customize';
import { validationMessages } from '../../../helpers';

export type FormDataReviewOrder = {
  starPartner: number;
  commentPartner: string;
  products?: CreateProductReviewInput[];
};

type Props = {
  partner: PartnerEntity;
  loading?: boolean;
  onFinish: (values: FormDataReviewOrder) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  products?: OrderProductEntity[];
};

export const ReviewOrder = memo(({ partner, setOpen, loading, onFinish, products, ...props }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue(
      'products',
      products?.map((it) => ({ productId: it?.productId })),
    );
  }, [form, products]);

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
          form={form}
          size="small"
          id="review-customer"
          className="h-[438px] overflow-x-auto"
          onFinish={onFinish}
          layout="vertical">
          <Form.List name="products">
            {(fields) => (
              <div>
                {fields.map(({ key, name, ...restField }) => {
                  const it = products?.[key];
                  if (!it) return null;
                  return (
                    <div key={key}>
                      <div className="flex border border-solid border-[#eee] p-[8px] mb-12px">
                        <div className="w-[48px] h-[48px]">
                          <img className="w-[48px] h-[48px] rounded" src={it?.avatar?.fullThumbUrl as string} />
                        </div>
                        <span className="pl-12px text-14px font-medium leading-20px line-clamp-1">{it.name}</span>
                      </div>
                      <h2>Chất lượng sản phẩm</h2>
                      <Form.Item {...restField} className="mt-12px hidden" name={[name, 'productId']}>
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        className="mt-12px"
                        name={[name, 'star']}
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
                        {...restField}
                        className="my-12px pb-20px"
                        name={[name, 'comment']}
                        rules={[
                          {
                            required: true,
                            message: validationMessages.required,
                          },
                        ]}
                        normalize={(e) => e.trimStart()}>
                        <Input.TextArea placeholder="Nhập đánh giá về Chất lượng sản phẩm" maxLength={1000} showCount />
                      </Form.Item>
                    </div>
                  );
                })}
              </div>
            )}
          </Form.List>

          <div className="flex border border-solid border-[#eee] p-[8px] mb-12px">
            <div className="w-[48px] h-[48px]">
              <img className="w-[48px] h-[48px] rounded" src={partner?.avatar?.fullThumbUrl as string} />
            </div>
            <span className="pl-12px text-14px font-medium leading-20px line-clamp-1">{partner.fullname}</span>
          </div>
          <h2>Gian hàng</h2>
          <Form.Item
            className="mt-12px"
            name={'starPartner'}
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
            name="commentPartner"
            rules={[
              {
                required: true,
                message: validationMessages.required,
              },
            ]}
            normalize={(e) => e.trimStart()}>
            <Input.TextArea placeholder="Nhập đánh giá về Gian hàng" maxLength={1000} showCount />
          </Form.Item>
        </Form>
      </Spin>
    </ModalCustomize>
  );
});
