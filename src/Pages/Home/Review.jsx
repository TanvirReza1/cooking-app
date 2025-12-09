import { useQuery } from "@tanstack/react-query";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";
import axios from "axios";

const Reviews = () => {
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/reviews`
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center my-10">Loading reviews...</p>;
  if (isError)
    return (
      <p className="text-center my-10 text-red-500">Failed to load reviews.</p>
    );

  return (
    <div className="my-24">
      <div className="text-center mb-24">
        <h3 className="text-3xl text-center font-bold my-8">Reviews</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          molestias earum omnis maiores quia, minima facere quis quisquam ipsa
          explicabo asperiores iste soluta adipisci laborum similique aliquam
          exercitationem porro tenetur.
        </p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        spaceBetween={30}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          slideShadows: true,
          scale: 0.75,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
