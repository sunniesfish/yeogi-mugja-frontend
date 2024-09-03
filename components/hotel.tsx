import { useEffect, useState } from "react";
import styled from "styled-components";
import { IHostProp, IMapProps } from "../interface";
import MapBox from "./map-box";
import SmallReview from "./SmallReview";
import { useQuery, useQueryClient } from "react-query";
import { addFav, delFav, isFavFn } from "../api";

const MapCard = styled.div`
  background-color: white;
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  & > div:first-child {
    width: 100%;
    height: 25px;
    background-color: ${(props) => props.theme.btnColor};
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 18px;
      color: white;
    }
  }
  & > div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      text-overflow: ellipsis;
    }
  }
`;
const HotelContainer = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  justify-content: center;
  grid: 164.75px 163.75px/1fr 1fr 325px;
`;
const Content = styled.div`
  position: relative;
  grid-row: 1/2;
  grid-column: 1/3;
  div {
    padding-left: 5px;
  }
  & > div:first-child {
    font-size: 20px;
  }
  & > div:nth-child(2) {
    font-size: 25px;
    font-weight: 800;
  }
  & > div:nth-child(3) {
    font-size: 20px;
  }
`;
const MapContainer = styled.div`
  grid-row: 1/3;
  grid-column: 3/4;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid gray;
  aspect-ratio: 1/1;
`;
const Reviews = styled.div`
  grid-row: 2/3;
  grid-column: 1/3;
  display: flex;
  justify-content: space-evenly;
`;
// const Score = styled.div`
//     background-color: ${props => props.theme.innerColor};
//     width: 45px;
//     height: 22px;
//     font-size: 15px;
//     border-radius: 6.25px;
//     display: flex;
//     align-items: center;
//     svg{
//         fill: ${props => props.theme.yellowColor};
//         width: 10px;
//         height: 13px;
//         margin-right: 5px;
//         stroke-width: 8px;
//         stroke: black;
//     }
// `
const LikeBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 5px;
  display: flex;
  align-items: center;
  font-size: 17px;
  svg {
    width: 30px;
    margin-left: 4px;
  }
`;

// const Star = () => {
//     return(
//         <svg
//             style={{marginRight:"10px"}}
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 576 512">
//                 <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
//         </svg>
//     )
// }
function Hotel({ data, reviews, token }: IHostProp) {
  const locationData: IMapProps["locationData"] = {
    lat: data.lat,
    lng: data.lng,
    level: 3,
  };
  const markerData: IMapProps["markerData"] = [
    {
      locationData: {
        lat: data.lat,
        lng: data.lng,
      },
      MarkerComponent: (
        <MapCard>
          <div>
            <span>{data.hostName}</span>
          </div>
          <div>
            <span>{data.hostAdress}</span>
          </div>
        </MapCard>
      ),
    },
  ];
  const [isMap, setIsMap] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { data: isFav } = useQuery(
    ["fav", data.hostId],
    () => isFavFn(data.hostId, token),
    {
      onSuccess: (data: boolean) => {
        setIsLiked(data);
      },
    }
  );
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
    script.onload = () => {
      setIsMap(true);
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  const onFavClick = () => {
    if (isLiked) {
      delFav(data.hostId, token);
      setIsLiked(false);
    } else {
      addFav(data.hostId, token);
      setIsLiked(true);
    }
  };
  return (
    <HotelContainer>
      <Content>
        <div>{data.hostIntro}</div>
        <div>{data.hostName}</div>
        <div>{data.hostAdress}</div>
        <div>{/* <Score></Score> */}</div>
        {token.length > 0 ? (
          <LikeBtn>
            숙소 찜하기
            <svg
              className="clickable"
              width={"10px"}
              onClick={onFavClick}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill={isLiked ? "#ff4752" : "gray"}
            >
              <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
            </svg>
          </LikeBtn>
        ) : null}
      </Content>
      <Reviews>
        {reviews ? (
          reviews?.map((review) => (
            <SmallReview key={review.rvId} {...review} />
          ))
        ) : (
          <h3>Loading...</h3>
        )}
      </Reviews>
      <MapContainer>
        {isMap ? (
          <MapBox
            locationData={locationData}
            mapSize={{
              height: "100%",
              width: "100%",
            }}
            markerData={markerData}
          />
        ) : (
          <h3>Loading...</h3>
        )}
      </MapContainer>
    </HotelContainer>
  );
}

export default Hotel;
