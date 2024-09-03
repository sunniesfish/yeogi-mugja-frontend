import styled from "styled-components";
import { IGetEmail, IReview } from "../interface";
import { formatDateString } from "../util";
import { useQuery } from "react-query";
import { getEmail } from "../api";

const Container = styled.div`
    background-color: ${props => props.theme.innerColor};
    width: 47%;
    height: 100%;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div:first-child{
        font-size: 15;
        font-weight: bold;
        width: 90%;
        margin-bottom: 8px;
    }
    div:nth-child(2){
        font-size: 15px;
        overflow: hidden;
        word-wrap: break-word;
        height: 60%;
        width: 90%;
    }
    div:nth-child(3){
        align-self: flex-end;
        margin-right: 15px;
        font-size: 10px;
        color: gray;
    }
`

function SmallReview(review:IReview){
    const date = formatDateString(review.writeDate);
    const {data} = useQuery<IGetEmail>(["email",review.memId],()=>getEmail(review.memId));
    return(
        <Container>
            <div>{data?.memEmail}</div>
            <div>{review.content}</div>
            <div>{date}</div>
        </Container>
    )
}

export default SmallReview;