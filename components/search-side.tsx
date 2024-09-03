import { styled } from "styled-components";
import { favCategory } from "../atom";
import { useRecoilState } from "recoil";

const SearchSideTitle = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin: 10px 0 10px 0;
    span{
        font-size: 20px;
        font-weight: bold;
    }
`
const SearchSideOptions = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid gainsboro;
    margin-bottom: 16px;
    &>div{
        margin: 16px;
        display: flex;
        align-items: center;
        span{
            margin-right: 10px;
            text-align: center;
            font-size: 18px;
        }
    }
`

const Circle = styled.span`
    display: inline-block;
    border: 1px solid gainsboro;
    width: 16px;
    height: 16px;
    border-radius: 10px;
    background-color: ${props => props.color};
`

function SearchPageSideBar(){
    const [category, setCategory] = useRecoilState(favCategory);
    const catToggleHandler = (cat:string) => {
        setCategory(cat);
    }
    return(
        <>
        <SearchSideTitle><span>필터</span></SearchSideTitle>
        <SearchSideTitle><span>숙소 유형</span></SearchSideTitle>
        <SearchSideOptions>
            <div onClick={()=>catToggleHandler("all")}>
                {"all" === category? <Circle color="#1565FF" className="clickable"/> : <Circle className="clickable" color="white"/>}
                <span> 전체 </span>
            </div>
            <div onClick={()=>catToggleHandler("motel")}>
                {"motel" === category? <Circle color="#1565FF" className="clickable"/> : <Circle className="clickable" color="white"/>}
                <span> 모텔 </span>
            </div>
            <div onClick={()=>catToggleHandler("hotel_resort")}>
                {"hotel_resort" === category? <Circle color="#1565FF" className="clickable"/> : <Circle className="clickable" color="white"/>}
                <span> 호텔·리조트 </span>
            </div>
            <div onClick={()=>catToggleHandler("pension")}>
                {"pension" === category? <Circle color="#1565FF" className="clickable"/> : <Circle className="clickable" color="white"/>}
                <span> 펜션 </span>
            </div>
            <div onClick={()=>catToggleHandler("gesthouse_hanok")}>
                {"gesthouse_hanok" === category? <Circle color="#1565FF" className="clickable"/> : <Circle className="clickable" color="white"/>}
                <span> 게스트하우스&한옥 </span>
            </div>
            <div onClick={()=>catToggleHandler("camping")}>
                {"camping" === category? <Circle color="#1565FF" className="clickable"/> : <Circle className="clickable" color="white"/>}
                <span> 캠핑 </span>
            </div>
        </SearchSideOptions>
    </>
    )
}

export default SearchPageSideBar;