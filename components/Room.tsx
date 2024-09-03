import styled from "styled-components";
import { IRoomProps } from "../interface";
import { Btn } from "./components";
import { fetchImage } from "../api";
import { useState } from "react";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    background-color: ${props => props.theme.innerBlue};
    border-radius: 18.75px;
    margin: 15px;
`
const Img = styled.img`
    display: block;
    border: 1px solid black;
    max-width: 280px;
    height: 240px;
    width: 25%;
    margin-right: 10px;
    border-radius: 18.75px;
`
const InfoCard = styled.div`
    max-width: 800px;
    width: 70%;
    margin-left: 25px;
    &>div:first-child{
        font-size: 25px;
        font-weight: bold;
        padding-bottom: 5px;
    }
`
const InfoBox = styled.div`
    background-color: white;
    width: 100%;
    height: 180px;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &>div:first-child{
        margin-left: 20px;
        div:first-child{
            color: gray;
            font-size: 23px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        div:nth-child(){
            font-size: 13px;
        }
    }
    &>div:last-child{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-right: 20px;
        div:first-child{
            font-size: 23px;
            font-weight: bold;
            margin-bottom: 5px;
        }
    }
`
const ReserveBtn = styled(Btn)`
    width: 100px;
    height: 40px;
    border-radius: 10px;
    border: none;
    font-size: 20px;
`
function Room(room:IRoomProps){
    const handleReserve = () => {
        /*
        if (token){
            reserveRoom(token,{
                roomId:room.room.roomId,
                hostId:room.room.host.hostId,
                payPrice:room.room.price,
            })
        }
        */
       console.log("token : "+room.token)
       if(!room.token){window.location.assign(`${process.env.REACT_APP_SERVER_API}/mugja/login`)}
        window.location.href = `${process.env.REACT_APP_SERVER_API}/booking/${room.room.roomId}/${room.room.host.hostId}/${room.room.price}/${room.token}`
    }
    const [imageUrl, setImageUrl] = useState("");
    fetchImage("room",room.room.roomImgList[0].roomImgPath).then(url => setImageUrl(url))
    return(
        <>
            <Container>
                <Img src={imageUrl} alt=""/>
                <InfoCard>
                    <div>{room?.room.name}</div>
                    <InfoBox>
                        <div>
                            <div>{room?.room.capacity} 인</div>
                        </div>
                        <div>
                            <div>{room?.room.price} 원</div>
                            <ReserveBtn className="clickable" onClick={handleReserve}>숙박예약</ReserveBtn>
                        </div>
                    </InfoBox>
                </InfoCard>
            </Container>
        </>
    )
}

export default Room;
