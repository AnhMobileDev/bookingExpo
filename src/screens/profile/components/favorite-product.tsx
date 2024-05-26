import { Button, Col, Input, Spin, Table, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AdminUserPaginationInput, ProductEntity, UserEntity } from '../../../graphql/type.interface';
import { useUserFavoriteProductsQuery } from '../../../graphql/queries/userFavoriteProducts.generated';
import { Protection } from '../../../assets/icon';
import { useUserRemoveFavoriteProductMutation } from '../../../graphql/mutations/userRemoveFavoriteProduct.generated';
import { AppRoutes, showGraphQLErrorMessage } from '../../../helpers';
import { numberWithDots } from '../../../utils';

import ProfileLayout from './profile-layout';
interface Props {
  user: UserEntity;
}

const FavouriteProduct = memo(({ user }: Props) => {
  const navigate = useNavigate();
  const [idsSelected, setIdsSelected] = useState<string[]>([]);

  const [checkInputAll, setCheckInputAll] = useState<boolean>();

  const [filter, setFilter] = useState<AdminUserPaginationInput>({
    page: 1,
    limit: 10,
    search: '',
    filters: null,
    isActive: null,
    isApproved: null,
  });

  const { data, loading, refetch } = useUserFavoriteProductsQuery({ variables: { ...filter } });

  const [userRemoveFavoriteProduct, { loading: updating }] = useUserRemoveFavoriteProductMutation({
    onError: showGraphQLErrorMessage,
  });

  const favoriteProducts = data?.userFavoriteProducts?.items
    ? data?.userFavoriteProducts?.items.map((item, index) => ({ ...item, key: item.id, index: ++index }))
    : [];

  const onChangePage = (newPage: any) => {
    setFilter({ ...filter, page: newPage });
  };

  // handle bỏ thích
  const handleRemoveFavoritePoduct = async () => {
    for (let i = 0; i < idsSelected.length; i++) {
      await userRemoveFavoriteProduct({
        variables: { productId: idsSelected[i] },
        onCompleted: () => {
          notification.success({ message: 'Bỏ thích thành công' });
        },
      });
    }
    refetch();
    setCheckInputAll(false);
    setIdsSelected([]);
  };

  // thêm id vào mảng
  const handleChangeInput = (e: any) => {
    const { value, checked } = e.target;

    if (checked === true && !idsSelected.includes(value)) {
      setIdsSelected([...idsSelected, value as string]);
    }
    if (checked === false) {
      const newArr = idsSelected.filter((id) => id !== value);
      setIdsSelected(newArr);
      if (newArr.length === 0) {
        setCheckInputAll(false);
      }
    }
  };

  // add tất cả id vào mảng
  const handleListIdFavoriteProduct = (e: any) => {
    if (e.target.checked === true) {
      setCheckInputAll(true);
      setIdsSelected(favoriteProducts.map((item) => item.id));
    } else {
      setCheckInputAll(false);
      setIdsSelected([]);
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (item: ProductEntity) => {
        return (
          <div className="full h-[90px] flex  gap-3">
            <img
              className="w-[90px] h-[90px] object-cover relative hover:cursor-pointer"
              src={item?.avatar?.fullThumbUrl ?? ''}
              alt="Ảnh sản phẩm"
              onClick={() => navigate(AppRoutes.shopping.product.detailId(item?.id))}
            />
            <div
              className={`absolute top-5 left-4 text-white text-[9px] py-0.5 px-1.5 rounded-full ${
                item.isNew === false ? 'bg-[#676E72]' : 'bg-[#03A1FA]'
              }`}>
              {item.isNew === false ? 'Qua sử dụng' : 'Mới'}
            </div>
            <div className="flex flex-col gap-2">
              <h2
                className="w-[210px] text-[14px] h-[90px] text-ellipsis overflow-hidden font-semibold hover:cursor-pointer"
                onClick={() => navigate(AppRoutes.shopping.product.detailId(item?.id))}>
                {item.name}
              </h2>
              <span className="text-sm text-primary">
                {item?.unitPrice ? numberWithDots(item?.unitPrice ?? 0) + ' đ' : 'Thương lượng'}
              </span>
              <div className="flex gap-1">
                <Protection />
                <span className="font-normal text-[#676E72] text-[11px]">CALL ME đảm bảo</span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      render: (id: string) => {
        return (
          <Input
            value={id}
            className="w-5 h-5 hover:cursor-pointer"
            checked={!!idsSelected.includes(id)}
            onChange={(e) => handleChangeInput(e as any)}
            type="checkbox"
          />
        );
      },
    },
  ];

  return (
    <Spin spinning={updating || loading}>
      <ProfileLayout user={user}>
        <Col className="flex-grow space-y-3 mb-[60px]">
          <div className="bg-white py-3 px-5 flex justify-between items-center">
            <h2 className="font-semibold text-[16px]">Danh sách yêu thích</h2>
            <div className="flex gap-2">
              <label htmlFor="checked-all" className="text-sm font-semibold hover:cursor-pointer">
                Tất cả
              </label>
              <Input
                id="checked-all"
                checked={checkInputAll}
                className="w-5 h-5 hover:cursor-pointer"
                type="checkbox"
                onChange={(e) => handleListIdFavoriteProduct(e)}
              />
            </div>
          </div>
          <div className="flex  bg-white p-5 ">
            <Table
              size="middle"
              columns={columns}
              dataSource={favoriteProducts}
              pagination={{
                size: 'small',
                style: { display: 'flex', justifyContent: 'start', position: 'relative' },
                defaultPageSize: 10,
                showQuickJumper: false,
                showTotal: (total, range) => {
                  return `${range[0]}-${range[1]} của ${total}`;
                },
                onChange: onChangePage,
                current: Number(filter?.page),
                total: data?.userFavoriteProducts?.meta.totalItems,
              }}
              scroll={{ y: 'calc(100vh - 380px)' }}
            />
          </div>
        </Col>
        <div className="fixed left-0 bottom-0 right-0 flex items-center justify-end gap-x-20px px-24px py-[10px] bg-white w-full">
          <Button
            disabled={!idsSelected || (idsSelected && idsSelected.length === 0)}
            type="primary"
            onClick={handleRemoveFavoritePoduct}>
            Bỏ thích
          </Button>
        </div>
      </ProfileLayout>
    </Spin>
  );
});

export default FavouriteProduct;
