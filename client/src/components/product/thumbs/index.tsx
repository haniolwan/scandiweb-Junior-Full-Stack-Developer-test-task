import { useRef } from "react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { Product } from "../../../helpers/types";
import "./style.css";
type Props = {
  gallery: Product["gallery"];
};
const ThumbsGallery = ({ gallery }: Props) => {
  const swiperRef = useRef<SwiperRef | null>(null);

  const setActiveThumb = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div className="flex gap-10">
      <div className="w-[100px] h-[400px]">
        <Swiper
          direction="vertical"
          slidesPerView={5}
          spaceBetween={10}
          className="h-full"
        >
          {gallery.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item}
                alt="product images"
                className="object-contain cursor-pointer"
                onClick={() => setActiveThumb(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-[478px] h-[394px]">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Thumbs]}
          loop={true}
          slidesPerView={1}
          pagination={{ clickable: true }}
          grabCursor={true}
          navigation={true}
          thumbs={{
            swiper: swiperRef.current ? swiperRef.current.swiper : null,
          }}
          className="thumbShow w-full h-full"
        >
          {gallery.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbsGallery;
