import { Button, Col, Form, Popconfirm, Spin, notification } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import '../style.less';

import { AddressEntity, UserEntity } from '../../../graphql/type.interface';
import { AddCircle } from '../../../assets/icon';
import { ModalCustomize } from '../../../components/modal-customize';
import { useAddAddressMutation } from '../../../graphql/mutations/addAddress.generated';
import { showGraphQLErrorMessage } from '../../../helpers';
import { useAddressesQuery } from '../../../graphql/queries/addresses.generated';
import { useRemoveAddressMutation } from '../../../graphql/mutations/removeAddress.generated';
import { useUpdateAddressMutation } from '../../../graphql/mutations/updateAddress.generated';

import { BodyModalAddress } from './body-modal-address';
import ProfileLayout from './profile-layout';

interface Props {
  user: UserEntity;
}

type Address = { latitude: number; longitude: number; mapAddress: string; addressName: string };

const AddressProfile = ({ user }: Props) => {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [addressItem, setAddressItem] = useState<AddressEntity | undefined>();

  const { data, refetch, loading } = useAddressesQuery();

  const [addressMapInfo, setAddressMapInfo] = useState<Address | undefined>();

  const listAddresses = data?.addresses;

  const [userAddAddress, { loading: loadingAddAddress }] = useAddAddressMutation({
    onCompleted: () => {
      notification.success({ message: 'Thêm địa chỉ thành công' });
      form.resetFields();
      refetch();
      setIsModalOpen(false);
    },
    onError: showGraphQLErrorMessage,
  });

  const [userUpdateAddress, { loading: loadingUpdateAddress }] = useUpdateAddressMutation({
    onCompleted: () => {
      notification.success({ message: 'Sửa địa chỉ thành công' });
      form.resetFields();
      refetch();
      setIsModalOpen(false);
    },
    onError: showGraphQLErrorMessage,
  });

  const [userRemoveAddress, { loading: loadingRemoveAddress }] = useRemoveAddressMutation({
    onCompleted: () => {
      notification.success({ message: 'Xóa địa chỉ thành công' });
      refetch();
    },
    onError: showGraphQLErrorMessage,
  });

  // remove address
  const handleDeleteAddress = async (id: string) => {
    await userRemoveAddress({ variables: { id: id } });
  };

  //  onOk Modal
  const handleOk = async () => {
    form
      .validateFields()
      .then(async () => {
        const values = form.getFieldsValue();
        if (!addressItem) {
          await userAddAddress({
            variables: {
              input: {
                addressName: addressMapInfo?.addressName as string,
                contactName: values.contactName,
                addressDetail: values.addressDetail,
                contactPhone: values.contactPhone,
                isDefault: values.isDefault,
                latitude: addressMapInfo?.latitude as number,
                longitude: addressMapInfo?.longitude as number,
                mapAddress: addressMapInfo?.mapAddress as string,
              },
            },
          });
        } else {
          await userUpdateAddress({
            variables: {
              input: {
                addressName: addressMapInfo ? addressMapInfo?.addressName : (addressItem?.addressName as string),
                contactName: values.contactName,
                addressDetail: values.addressDetail,
                contactPhone: values.contactPhone,
                isDefault: values.isDefault,
                latitude: addressMapInfo ? addressMapInfo.latitude : (addressItem?.latitude as number),
                longitude: addressMapInfo ? addressMapInfo.longitude : (addressItem?.longitude as number),
                mapAddress: addressMapInfo ? addressMapInfo.mapAddress : (addressItem?.mapAddress as string),
                id: addressItem?.id as string,
              },
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // open modal update
  const handleOpenModalUpdate = async (address: AddressEntity) => {
    setAddressItem(address);
    form.setFieldsValue(address);
    setIsModalOpen(true);
  };

  // modal cancel
  const handleCancelModal = () => {
    form.resetFields();
    setAddressItem(undefined);
    setIsModalOpen(false);
  };

  return (
    <ProfileLayout user={user}>
      <Col className="flex-grow">
        <div className="bg-white p-5 ">
          <div className=" w-full flex items-center justify-between">
            <h2 className=" text-xl font-semibold ">Địa chỉ của tôi</h2>
            <div>
              <Button type="default" htmlType="button" onClick={() => setIsModalOpen(true)}>
                <AddCircle /> <span className="ml-2 -translate-y-1.5  text-black">Thêm địa chỉ</span>
              </Button>
            </div>
          </div>
        </div>

        <Form form={form} name="control-hooks" onFinish={handleOk} style={{ maxWidth: 600 }}>
          <ModalCustomize
            open={isModalOpen}
            title={!addressItem ? 'Địa chỉ mới' : 'Cập nhật địa chỉ'}
            onCancel={handleCancelModal}
            onOk={handleOk}
            footer={
              <div className="flex justify-end shadow-md p-3 rounded-md">
                <Button onClick={handleCancelModal}>Hủy</Button>
                <Button type="primary" htmlType="submit" onClick={handleOk} loading={loadingAddAddress}>
                  Lưu
                </Button>
              </div>
            }>
            <BodyModalAddress setAddressMapInfo={setAddressMapInfo}></BodyModalAddress>
          </ModalCustomize>
        </Form>

        <Spin spinning={loading || loadingUpdateAddress}>
          <div className="mt-5 flex flex-col gap-5">
            {listAddresses?.map((address) => (
              <div key={address?.id} className="bg-white p-5 address ">
                <div className=" w-full flex items-center justify-between">
                  <div className="flex gap-4 flex-col">
                    <div className="flex gap-1">
                      <h2>{address?.contactName}</h2> <span> | </span> <div>(+84) {address?.contactPhone}</div>
                    </div>
                    <div className="space-y-1 text-[#676E72]">
                      <div>{address?.addressDetail}</div>
                      <div>{address?.mapAddress} </div>
                      {address?.isDefault === true ? (
                        <Button className="h-5">
                          <span className="px-1 py-1 -translate-y-4 font-normal">Mặc định</span>
                        </Button>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-1 justify-end">
                      <Button type="link" onClick={() => handleOpenModalUpdate(address)}>
                        Sửa
                      </Button>
                      <span className="-translate-y-2.5">|</span>
                      <Popconfirm
                        onConfirm={() => handleDeleteAddress(address?.id as string)}
                        title="Xóa địa chỉ"
                        description="Bạn có chắc chắn xóa địa chỉ này?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                        <Button type="link" disabled={loadingRemoveAddress}>
                          Xóa
                        </Button>
                      </Popconfirm>
                    </div>
                    <Button className="h-5" disabled={address?.isDefault}>
                      <span className="px-1 py-1 -translate-y-4 font-normal"> Thiết lập mặc định</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Spin>
      </Col>
    </ProfileLayout>
  );
};

export default AddressProfile;
