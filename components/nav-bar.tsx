import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { login, myPageSelector } from "../atom";
import logo from '../image/logo_square.jpg';
import { Link } from "react-router-dom";
import { useState } from "react";

const Logo = styled.img`
    height: 60px;
    width: 110px;
`
const Login = styled.div`
    height: 40px;
    width: 128px;
    border: 1px solid ${props => props.theme.innerColor};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    justify-content: center;
    align-items: center;
    max-height: 75px;
    width: 100%;
    height: auto;
    border-bottom: 1px solid ${props => props.theme.innerColor};
`
const Container = styled.div`
    padding: 0 20px ;
    height: 75px;
    width: auto;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &>div{
        position: relative;
    }
`
const LogoutBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    border-radius: 5px;
    background-color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    position: absolute;
    right: 12px;
    bottom: -35px;
`
function Header(){
    const [isLogin, setIsLogin] = useRecoilState(login);
    const [onMouse, setOnMouse] = useState(false);
    const setMyPageOption = useSetRecoilState(myPageSelector);
    const onClick = () => {
        //로그인 페이지로 이동
        window.location.assign(`${process.env.REACT_APP_SERVER_API}/mugja/logout`);
    }
    const onClickLogo = () => {
        window.location.assign(`${process.env.REACT_APP_SERVER_API}/mugja/main`);
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLogin(false);
    }
    const handleGoMyPage = ()=>{
        setMyPageOption(3)
    }
    return(
        <Wrapper>
            <Container>
                <Logo className="clickable" src={logo} onClick={onClickLogo}/>
                <Login  className="clickable">
                    {isLogin? 
                        <Link style={{color:"black"}} to={`/mypage/wishlist`} onClick={handleGoMyPage}>
                            <div onMouseEnter={()=>setOnMouse(true)}>
                                마이페이지
                                {onMouse? 
                                    <LogoutBox onMouseEnter={()=>setOnMouse(true)} onMouseLeave={()=>setOnMouse(false)} onClick={handleLogout}>
                                        <span>로그아웃</span>
                                    </LogoutBox>
                                : null}
                            </div>
                        </Link>
                    : 
                        <div onClick={onClick}>
                            로그인
                        </div> 
                    }
                </Login>
            </Container>
        </Wrapper>
    )
}

export default Header;