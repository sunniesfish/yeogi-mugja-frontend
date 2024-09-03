import styled from "styled-components";

export const Container = styled.div`
    height: auto;
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
`;
export const ListPage = styled.div`
    min-height: 100vh;
    width: 100%;
    max-width: 1200px;
    display: flex;
    align-items: flex-start;
`;
export const SideBarWrapper = styled.div`
    height: auto;
    width: 30%;
    max-width: 400px;
    display: flex;
    align-items: center;
    flex-direction: column;
`
export const ListWrapper = styled.div`
    position: relative;
    min-height: 800px;
    height: 70%;
    width: 70%;
    max-width: 800px;
    display: flex;
    align-items: center;
    flex-direction: column;
`

export const Btn = styled.button`
    background-color: ${props => props.theme.btnColor};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.textWhite};
`

const Load = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: auto;
    span{
        font-size: 25px;
        font-weight: bold;
    }
`
export const Loader = () => {
    return(
        <Load>
            <span>Loading...</span>
        </Load>
    )
}