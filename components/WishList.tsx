import { useQuery } from "react-query"
import { delFav, getFavs } from "../api"
import { Loader } from "./components"
import { IWishList } from "../interface"
import Wish from "./Wish"
import { styled } from "styled-components"
import { useState } from "react"

const PagingBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 40px;
` 
const Paging = styled.span`
    margin: 30px 20px 20px 20px;
    height: 20px;
    width: 20px;
    border-radius: 10px;
    text-align: center;
    font-size: 13px;
    background-color: silver;
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
        width: 8px;
        fill: white;
    }
`
const Title = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    span{
        font-size: 22px;
        font-weight: bold;
        margin-right: 10px;
    }
`

const Back = ()=>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
        </svg>
    )
}
const Forward = ()=>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
    )
}
interface WishListProps{
    token:string;
}
function WishList({token}:WishListProps){
    const [thisPage, setThisPage ] = useState(1);
    const [pages, setPages] = useState(0);
    const {isLoading, data, refetch} = useQuery<IWishList>(
        ["wishlist", thisPage],
        () => getFavs(thisPage, token),
    )
    const handleDelete = async (hostId:number) => {
        try{
            console.log(token)
            await delFav(hostId,token);
        } catch (error){
            console.log("fail")
        }
        refetch();
    }
    return(
        <>
            <Title>
                <span>찜 목록</span>
                <svg
                    fill="#ff4752"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 512 512"
                    width="20px"
                >
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
                </svg>
            </Title>
            {isLoading? 
            <Loader/> 
            : 
            <>
                {data?.content.map(wish => 
                    <Wish key={wish.wishId} wish={wish} onClick={() => {
                        handleDelete(wish.host.hostId);
                    }}/>
                )}
                <PagingBox>
                    <Paging className="clickable" onClick={pages !== 0?
                            () => {
                                setPages(prev => prev - 5);
                                setThisPage(pages - 4);
                            }
                            :
                            () => {}
                        }
                    >
                        <Back/>
                    </Paging>
                        {isLoading? <Loader/> : !data? <Loader/> :
                            Array.from({length:data.totalPages>pages+5? 5 : data.totalPages%5},(_,i)=>i ).map(index => 
                                <Paging 
                                    key={index}
                                    className="clickable"
                                    style={{
                                        "backgroundColor": `${index+1+pages === thisPage ? "#1565FF" : "#F5F8FF"}`,
                                        "color": `${index+1+pages === thisPage? "white" : "black"}`,
                                    }}
                                    onClick={()=>{
                                        setThisPage(index+1+pages);
                                    }}
                                >
                                    {index+1+pages}
                                </Paging>
                            )
                        }
                    <Paging
                        className="clickable" 
                        onClick={ data && data.totalPages>pages+5?
                            () => {
                                setPages(prev => prev + 5);
                                setThisPage(pages + 6);
                            }
                            :
                            () => {}
                        }
                    >
                        <Forward/>
                    </Paging>
                </PagingBox>
            </>}
        </>
    )
}

export default WishList;        