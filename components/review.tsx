import styled from "styled-components"
import { IGetEmail, IReview } from "../interface"
import { useEffect, useState } from "react"
import { formatDateString } from "../util"
import { getEmail } from "../api"
import { useQuery } from "react-query"

const ReviewBox = styled.div`
    height: 200px;
    width: 100%;
    background-color: ${props => props.theme.innerColor};
    display: grid;
    grid-template-columns: auto 200px;
    grid-template-rows: 50px auto 5dvh;
    border-radius: 15px;
    margin: 5px;
`
const NickName = styled.div`
    grid-row: 1/2;
    grid-column: 1/2;
    font-size: 20px;
    font-weight: 600;
    padding-left: 15px;
    padding-top: 15px;
`
const StarBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Content = styled.div`
    grid-row: 2/3;
    grid-column: 1/3;
    padding: 0 15px;
    font-size: 18px;
`
const Date = styled.div`
    grid-row: 3/4;
    grid-column: 2/3;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: gray;
`
interface IStar{
    color:string;
}
const Star = ({color}:IStar) => {
    return(
        <svg 
            style={{fill:color, width:"10px"}}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 576 512">
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
        </svg>
    )
}

function Review(review:IReview){
    const {data} = useQuery<IGetEmail>(["email",review.memId],()=>getEmail(review.memId));
    const date = formatDateString(review.writeDate);
    const [score,setScore] = useState(0);
    useEffect(()=>{
        setScore(review.score)
    },[review.score])
    return (
        <>
        <ReviewBox>
            <NickName>{data?.memEmail}</NickName>
            <StarBox>
                {new Array(score).fill(true).map((i,index) =>
                    <Star 
                        key={index} 
                        color={"#FFD600"} 
                    />)
                }
                {new Array(10-score).fill(false).map((i,index) =>
                    <Star 
                        key={index} 
                        color={"#D9D9D9"} 
                    />)
                }
            </StarBox>
            <Content>{review.content}</Content>
            <Date>{date}</Date>
        </ReviewBox>
        </>
    )
}

export default Review;