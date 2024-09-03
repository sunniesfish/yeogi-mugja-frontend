import styled from "styled-components";
import { IWishProps } from "../interface";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchImage } from "../api";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 180px;
    border-bottom: 1px solid ${props => props.theme.innerColor};
`
const Img = styled.img`
    display: block;
    width: 35%;
    height: 160px;
    border-radius: 15px;
    border: 1px solid gray;
`
const InfoBox =styled.div`
    display: flex;
    flex-direction: column;
    width: 55%;
    margin-right: 40px;
    position: relative;
    &>div{
      margin: 5px;
    }
    &>div:first-child{
        font-size: 20px;
        font-weight: bold;
    }
    &>div:last-child(2){

    }
`
const LikeBox = styled.div`
    position: absolute;
    right: 30px;
    padding-top: 3px;
`
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
// const Star = () => {
//     return(
//         <svg 
//             style={{margin:"8px"}}
//             xmlns="http://www.w3.org/2000/svg" 
//             viewBox="0 0 576 512">
//                 <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
//         </svg>
//     )
// }
function Wish({wish, onClick}:IWishProps){
    // const avgScore = wish.host.avgScore;
    const Image = wish.host.hostImgList
    const navigate = useNavigate();
    const goToHost = (hostId:number) => {
        navigate(`/host/${hostId} `)
    }
    const [imageUrl, setImageUrl] = useState("");
    useEffect(()=>{
        fetchImage("host",Image[0].imgPath).then(url => setImageUrl(url));
    },[])
    return(
        <Container>
            <Img src={imageUrl} onClick={()=>goToHost(wish.host.hostId)} className="clickable"/>
            <InfoBox onClick={()=>goToHost(wish.host.hostId)} className="clickable">
                <div>{wish.host.hostName}</div>
                <div>
    
                </div>
            </InfoBox>
            <LikeBox>
                <svg
                    className="clickable"
                    onClick={onClick} 
                    fill="#ff4752"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 512 512"
                    width="20px"
                >
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
                </svg>
            </LikeBox>
        </Container>
    )
}

export default Wish;