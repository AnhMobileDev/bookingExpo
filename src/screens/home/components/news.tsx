import { memo } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const data = Array(100)
  .fill(0)
  .map((_it) => ({
    image: 'https://picsum.photos/200/200',
    title: 'Bàn giao máy xúc lật xcmg lw500fn gầu 3,5 m3 cho trạm trộn bê tông',
    createdAt: dayjs(),
  }));

export const News = memo(() => {
  return (
    <div className="text-grayscale-black p-[20px] bg-white">
      <div className="flex justify-between items-center mb-[20px]">
        <h2 className="font-semibold text-[20px]">Có gì mới?</h2>
        <Link to="">
          <span className="text-[13px] text-grayscale-black">Xem tất cả {'  >'}</span>
        </Link>
      </div>
      <Swiper
        // centeredSlides={false}
        // spaceBetween={20}
        // slidesPerView="auto"
        // navigation={true}
        // modules={[Pagination, Navigation]}
        className="home-swiper">
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="w-[220px]">
                <img className="w-full rounded h-[120px]" src={item.image} alt={item.title} />
                <Link to="/">
                  <h3 className="text-grayscale-black text-[14px] font-bold mt-[16px] mbs-[12px] line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-grayscale-light text-[12px] font-normal">
                  {dayjs().format('DD') + ' tháng ' + dayjs().format('MM') + ', ' + dayjs().format('YYYY')}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
});
