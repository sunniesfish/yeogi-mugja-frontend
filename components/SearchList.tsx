import { useEffect, useState } from "react";
import { Loader } from "./components";
import { useQuery, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { doSearch } from "../api";
import { favCategory } from "../atom";
import { ISearchPage, SearchPageProps } from "../interface";
import SearchResult from "./SearchResult";

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
const SearchBox = styled.div`
    width: 300px;
    height: 40px;
    position: relative;
    input{
        max-width: 400px;
        width: 100%;
        border: none;
        height: 40px;
        background-color: ${props => props.theme.innerColor};
        border-radius: 20px;
        padding: 0 15px 0 15px;
    }
    button{
        position: absolute;
        top: 10px;
        right: -20px;
        border: none;
        background-color: transparent;
        height: 25px;
        svg{
            width: 20px;
        }
    }
`

function SearchList({category, search, token}:SearchPageProps){
    const queryCLient = useQueryClient();
    const [ cat, setCat] = useRecoilState(favCategory);
    const [thisPage, setThisPage ] = useState(1);
    const [pages, setPages] = useState(0);
    const [ word, setWord] = useState(search);
    const [keyword, setKeyword] = useState(search);
    const { isLoading, data } = useQuery<ISearchPage>(
        ["searchList", thisPage, cat, word],
        () => doSearch(cat,thisPage,keyword,token),
        {onSuccess:()=>{

        }}
    )
    const onSearch = () => {
        if (keyword.length > 0){
            setWord(keyword);
        }
    }
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value)
    }

    useEffect(()=>{
        setCat(category);
    },[category, setCat])
    console.log(data);
    return(
        <>
            <Title>
                {isLoading? <Loader/> : <span>검색 결과 : {data?.totalElements} 개</span>}
            </Title>
            {isLoading? 
            <Loader/> 
            : 
            <>
                <SearchBox>
                    <input type="text" value={keyword} onChange={handleChange}/>
                    <button onClick={onSearch} className="clickable">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                        </svg>
                    </button>
                </SearchBox>
                {Array.isArray(data?.content) ? (
                    data?.content.map(search => 
                        <SearchResult 
                            key={search.hostId} 
                            search={search} 
                            token={token}
                        />
                    )
                ) : (
                    <div><h3>검색 결과가 없습니다</h3></div>
                )}
                <PagingBox>
                    <Paging className="clickable" onClick={pages !== 0?
                        () => {
                            setPages(prev => prev - 5);
                            setThisPage(pages - 4);
                        }
                        :
                        () => {}
                    }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
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
                    }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                    </Paging>
                </PagingBox>
            </>}
        </>
    )
}

export default SearchList;