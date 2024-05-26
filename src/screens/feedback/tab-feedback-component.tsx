import React, { useMemo, memo, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Card, Col, Divider, Empty, Image, Menu, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ServiceFeedbackTypeEnum, ServiceFeedbacksStatusEnum } from '../../graphql/type.interface';
import { feedbackStatusText, feedbackTypeText, getTimeAgo } from '../../utils/messages';
import { Complain, Question, Support } from '../../assets/icon';
import { useGetServiceFeedbacksQuery } from '../../graphql/queries/getServiceFeedbacks.generated';
import { ALL_PARAMS } from '../../constants/params';
import { CenteredSpinning } from '../../components';
import { TIME_FORMAT } from '../../constants/format';

import './styles.less';
import { TABS } from '.';
interface FeedbackElementProps {
  type?: ServiceFeedbackTypeEnum;
  description?: string;
  status?: ServiceFeedbacksStatusEnum;
  time: string;
  images?: { id: string; thumbnailUrl?: string; fullOriginalUrl?: string }[];
  id: string;
}

export const icons = (props?: React.ComponentProps<React.ComponentType<React.SVGProps<SVGSVGElement>>>) => ({
  [ServiceFeedbackTypeEnum.COMPLAIN]: <Complain {...props} />,
  [ServiceFeedbackTypeEnum.QUESTION]: <Question {...props} />,
  [ServiceFeedbackTypeEnum.SUPPORT]: <Support {...props} />,
});

function getFileType(url: string): 'image' | 'video' | 'unknown' {
  const extension = url.split('.').pop()?.toLowerCase();

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const videoExtensions = ['mp4', 'webm', 'ogg'];

  if (!extension) return 'unknown';
  if (imageExtensions.includes(extension)) return 'image';
  if (videoExtensions.includes(extension)) return 'video';
  return 'unknown';
}

function renderMediaElement(thumbnailUrl: string, fullOriginalUrl: string) {
  const fileType = getFileType(thumbnailUrl);
  if (fileType === 'image') {
    return (
      <Image
        width={80}
        height={80}
        src={thumbnailUrl}
        preview={{
          src: fullOriginalUrl,
        }}
      />
    );
  } else if (fileType === 'video') {
    return (
      <video width={80} height={80} controls>
        <source src={thumbnailUrl} type={`video/${thumbnailUrl.split('.').pop()?.toLowerCase()}`} />
        Trình duyệt của bạn không hỗ trợ video này.
      </video>
    );
  } else {
    return (
      <div>
        <p>Không thể phát video.</p>
        <a href={thumbnailUrl} download>
          Download
        </a>
      </div>
    );
  }
}

const FeedbackElement = memo(({ type, description, status, time, id }: FeedbackElementProps) => {
  return (
    <Row className="justify-between pr-8" id={id}>
      <Col className="max-w-[80%] self-center">
        {type && <Typography.Paragraph className="title">{feedbackTypeText(type)}</Typography.Paragraph>}
        <Typography.Paragraph ellipsis className="description">
          {description}
        </Typography.Paragraph>
      </Col>
      <Col>
        {status && (
          <Typography.Paragraph className={`status ${status}`} style={{ marginBottom: 4 }}>
            {feedbackStatusText(status)}
          </Typography.Paragraph>
        )}
        <Typography.Paragraph className="time">{time}</Typography.Paragraph>
      </Col>
    </Row>
  );
});

const FeedbackDetailPanel = memo(({ type, description, status, time, images }: FeedbackElementProps) => {
  return (
    <div className="detail-panel">
      {type && <Typography.Paragraph className="title">{feedbackTypeText(type)}</Typography.Paragraph>}
      <Typography.Paragraph className="description">{description}</Typography.Paragraph>
      <Divider />
      {images && images.length !== 0 && (
        <>
          <Typography.Paragraph className="title-media">Ảnh/ Video</Typography.Paragraph>
          <Row className="gap-2">
            <Image.PreviewGroup>
              {images.map((el) => (
                <div key={el.id}>{renderMediaElement(el.thumbnailUrl as string, el?.fullOriginalUrl as string)}</div>
              ))}
            </Image.PreviewGroup>
          </Row>
          <Divider />
        </>
      )}
      <Row className="justify-between">
        <Col>
          <Typography.Paragraph className="second-text" style={{ marginBottom: 16 }}>
            Trạng thái
          </Typography.Paragraph>
          <Typography.Paragraph className="second-text">Thời gian gửi</Typography.Paragraph>
        </Col>
        <Col>
          {status && (
            <Typography.Paragraph className={`status ${status}`} style={{ marginBottom: 16 }}>
              {feedbackStatusText(status)}
            </Typography.Paragraph>
          )}
          <Typography.Paragraph className="time">{time}</Typography.Paragraph>
        </Col>
      </Row>
    </div>
  );
});

export const TabFeedbackComp = memo(
  // eslint-disable-next-line react/prop-types
  forwardRef(({ status }: { status?: ServiceFeedbacksStatusEnum }, ref) => {
    const {
      data: feedbacksData,
      loading,
      refetch,
    } = useGetServiceFeedbacksQuery({
      variables: { ...ALL_PARAMS, status },
    });

    useImperativeHandle(ref, () => ({ refetch }));

    const feedbacks = useMemo(
      () => feedbacksData?.getServiceFeedbacks.items ?? [],
      [feedbacksData?.getServiceFeedbacks.items],
    );

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const detail = useMemo(
      () => feedbacks?.find((fb) => fb.id === searchParams.get('id')) ?? feedbacks?.[0],
      [feedbacks, searchParams],
    );
    const statusTab = useMemo(() => searchParams.get('status') ?? TABS.ALL, [searchParams]);

    const feedbackItems = feedbacks.map((feedback) => ({
      label: (
        <FeedbackElement
          type={feedback.type}
          description={feedback.content}
          status={feedback.status}
          time={getTimeAgo(feedback.createAt)}
          id={feedback.id}
        />
      ),
      key: feedback.id,
      icon: icons()[feedback.type],
    }));

    useEffect(() => {
      document
        .getElementById(`${detail?.id}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }, [detail?.id]);

    if (loading) return <CenteredSpinning />;

    if (feedbacks.length === 0)
      return (
        <div className="items-center justify-center">
          <Empty description="Xin lỗi, không có dữ liệu hiển thị." imageStyle={{ height: 60 }} />
        </div>
      );

    return (
      <Row className="tab-comp gap-4 px-8 py-2">
        <Card
          // TODO: Custom scroll bar
          className="w-[40%] h-fit max-h-[calc(100vh-250px)] overflow-auto"
          bodyStyle={{ padding: '0' }}>
          {/* TODO: Change get all to get list and add scroll load more */}
          <Menu
            onClick={({ key }) => {
              // setDetail(feedbacks.find((fb) => fb.id === key) ?? feedbacks[0]);
              navigate({ search: `status=${statusTab}&id=${key}` });
            }}
            defaultSelectedKeys={[feedbackItems[0].key]}
            mode="inline"
            items={feedbackItems}
            selectedKeys={[searchParams.get('id') ?? feedbackItems[0].key]}
          />
        </Card>
        <Card className="h-fit px-5 py-10 w-[calc(60%-14px)]">
          <FeedbackDetailPanel
            id={detail.id}
            type={detail?.type}
            description={detail?.content}
            status={detail?.status}
            time={dayjs(detail?.createAt).format(TIME_FORMAT)}
            images={detail?.images?.map((el) => ({
              id: el?.id,
              thumbnailUrl: el?.fullThumbUrl ?? (el?.originalUrl as string),
              fullOriginalUrl: el?.fullOriginalUrl as string,
            }))}
          />
          {detail?.answer && (
            <>
              <Divider className="bg-grayscale-black" />
              <FeedbackDetailPanel
                id={detail.id}
                description={detail?.answer as string}
                time={dayjs(detail?.updateAt).format(TIME_FORMAT)}
                images={detail?.imagesAnswer?.map((el) => ({
                  id: el?.id,
                  thumbnailUrl: el?.fullThumbUrl ?? (el?.originalUrl as string),
                  fullOriginalUrl: el?.fullOriginalUrl as string,
                }))}
              />
            </>
          )}
        </Card>
      </Row>
    );
  }),
);
