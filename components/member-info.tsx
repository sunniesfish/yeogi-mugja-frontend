import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { Btn } from "./components";
import { useState } from "react";
import { getMemInfo, modifyMemInfo, validatePassword } from "../api";
import { useMutation, useQuery } from "react-query";

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
const Container = styled.form`
    width: 100%;
    height: 80vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    &>span{
        display: block;
        margin: 10vh 0 40px 0;
        font-size: 22px;
        font-weight: bold;
    }
    &>div{
        width: 100%;
        margin-top: 3vh;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
            width: 80%;
            display: block;
            color: #03075B;
            margin: 3px;
        }
        div{
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    }
`
const SubmitBtn = styled(Btn)`
    display: block;
    width: 60px;
    height: 30px;
    border: none;
    border-radius: 8px;
    margin-top: 30px;
`
const Input = styled.input`
    background-color: ${prop => prop.theme.innerBlue};
    border: none;
    margin-bottom: 20px;
    height: 30px;
    width: 180px;
    border-radius: 8px;
    padding: 0 10px 0 10px;
    text-align: center;
    &:focus{
        outline-color: ${props => props.theme.btnColor};
    }
`
const Input2 = styled.input`
    height: 35px;
    width: 90%;
    background-color: ${props => props.theme.innerBlue};
    border: none;
    border-radius: 8px;
    padding: 0 10px 0 10px;
    text-align: center;
    &:focus{
        outline-color: ${props => props.theme.btnColor};
    }
`
interface ValidateForm{
    password:string;
}
interface IMemberInfoProps{
    token:string
}
interface ModifyForm{
    password:string;
}
interface IMemInfo{
    email:string
}
function MemberInfo({token}:IMemberInfoProps){
    //비밀번호 확인
    const {register, handleSubmit} = useForm<ValidateForm>();
    const [isValid, setIsValid] = useState(false);
    const onValid = async (data:ValidateForm) => {
        const response = await validatePassword(data.password,token);
        setIsValid(response.isValid);
    }

    //회원정보수정
    const { register:modify, handleSubmit:handleModify } = useForm<ModifyForm>();
    const { data } = useQuery<IMemInfo>("memInfo", ()=>getMemInfo(token))
    const { mutate } = useMutation((data:ModifyForm) => modifyMemInfo(data.password, token),{
        onSuccess:() => {
            alert("수정 완료");
        },
        onError:() => {
            alert("수정 실패");
        }
    })
    const onValidMod = async (data:ModifyForm) => {
        mutate(data);
    }

    return(
        <>
            <Title><span>내 정보 관리</span></Title>
            {isValid? 
            <>
            <Container method="put" onSubmit={handleModify(onValidMod)}>
                <div>
                    <div>
                        <span>이메일</span>
                        <Input2 type="text" disabled value={data?.email}/>
                    </div>
                </div>
                <div>
                    <div>
                        <span>비밀번호</span>
                        <Input2 type="password" {...modify("password")} placeholder="********"/>
                    </div>
                </div>

                <SubmitBtn className="clickable">수정</SubmitBtn>
            </Container>
            </>
            : 
            <Container method="post" onSubmit={handleSubmit(onValid)}>
                <span>비밀번호를 입력해주세요</span>
                <Input 
                    autoFocus
                    type="password" 
                    {...register(
                        "password", 
                        {required:true})
                    }
                />
                <SubmitBtn className="clickable">확인</SubmitBtn>
            </Container>
            }
        </>
    )
}

export default MemberInfo;