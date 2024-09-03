import styled from "styled-components";
import { Btn } from "./components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IReviewForm, IReviewFormProps } from "../interface";
import { useMutation } from "react-query";
import { writeReview } from "../api";
import { formDate } from "../util";
// import { useRecoilValue } from "recoil";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const FormContainer = styled.form`
    display: grid;
    grid: 3fr 7fr 70px/1fr;
    aspect-ratio: 13/9; 
    width: 500px;
    place-items: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    &>div{
        display: flex;
        justify-content: center;
        width: 90%;
    }
    div:first-child{
        grid-row: 0/1;
    }
`
const SubmitBtn = styled(Btn)`
    display: block;
    width: 80px;
    height: 30px;
    border: none;
    border-radius: 8px;
`
const TitleLine = styled.div`
    flex-grow: 1;
    height: 70%;
    span:first-child{
        color: black;
        font-size: 20px;
        font-weight: 600;
    };
    span:last-child{
        color: ${props => props.theme.textGray};
    };
`
const ScoreLine = styled.div`
    flex-grow: 1;
    height: 30%;
`
const ContentBox = styled.textarea`
    display: block;
    grid-row: 2/3;
    border: 1px solid ${props => props.theme.innerColor};
    border-radius: 20px;
    height: 100%;
    width: 90%;
    padding: 10px;
    resize: none;
    &:focus{
        outline: none;
    }
`
// const ImgLine = styled.div`
//     position: relative;
//     width: 90%;
//     grid-row: 3/4;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-start;

//     &>Button{
//         display: flex;
//         border: none;
//         border-radius: 5px;
//         background-color: ${props => props.theme.innerColor};
//         height: 40px;
//         width: 40px;
//         justify-content: center;
//         align-items: center;
//         &>svg{
//             fill: dimgrey;
//             width: 23px;
//         }
//     }
//     &>img{
//         display: flex;
//         border: none;
//         border-radius: 5px;
//         height: 40px;
//         width: 40px;
//     }
//     &>svg{
//         position: absolute;
//         left: 30px;
//         bottom:30px;
//         width: 7px;
//         height: 7px;
//         border-radius: 2px;
//         background-color: ${props=>props.theme.innerColor};
//         padding: 2px;
//     }
// `
interface IStar{
    color:string;
    onClick:React.MouseEventHandler<SVGSVGElement>;
}
const Star = ({onClick, color}:IStar) => {
    return(
        <svg 
            onClick={onClick}
            style={{fill:color, width:"10px"}}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 576 512">
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
        </svg>
    )
}
// const Plus = () => {
//     return(
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
//             <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
//         </svg>
//     )
// }
// interface IX{
//     onClick:React.MouseEventHandler<SVGSVGElement>;
// }
// const X = ({onClick}:IX) => {
//     return(
//         <svg 
//             onClick={onClick} 
//             xmlns="http://www.w3.org/2000/svg" 
//             viewBox="0 0 384 512"
//         >
//             <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
//         </svg>
//     )
// }
const HidenInput = styled.input`
    display: none;
`
const CloseModalBtn = styled.button`
    position: absolute;
    right: 20px;
    top: 20px;
    border: none;
    background-color: transparent;
    svg{
        fill: white;
        width: 20px;
    }
`
function ReviewForm({hostName, hostId, memId, showModal,closeModal,token}:IReviewFormProps){
    const {
        mutate
    } = useMutation((data:IReviewForm) => writeReview(hostId,data,token),{
        onSuccess:(event) => {
            //네비게이트
            closeModal(event);
            alert("리뷰 작성 완료");
        }
    })
    // const imgRef:any = useRef(null);
    // const [imgPath, setImgPath] = useState("");
    // const [isUploaded, setIsUploaded] = useState(false);
    const { register,handleSubmit,setValue } = useForm<IReviewForm>();
    const [score, setScore] = useState(10);
    // const onFile = (event:React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    //     if(imgRef.current){
    //         imgRef.current.click();
    //     }
    // }
    // const onUpload = () => {
    //     if(imgRef.current && imgRef.current.files){
    //         const img = imgRef.current.files[0];
    //         setValue("image",img);

    //         //미리보기
    //         const reader = new FileReader();
    //         reader.readAsDataURL(img);
    //         reader.onload = () => {
    //             setImgPath(reader.result as string);
    //         }
    //     }
    //     setIsUploaded(true)
    // }
    const onValid = (data:IReviewForm) => {
        mutate(data);
    }
    const today = new Date();
    const date = formDate(today);
    if(!showModal) return null;
    return(
        <ModalBackground>
            <CloseModalBtn onClick={closeModal} className="clickable">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
            </CloseModalBtn>
            <FormContainer method="post" onSubmit={handleSubmit(onValid)}>
                <div>
                    <TitleLine>
                        <span>{hostName}</span>
                        <span>{date}</span>
                        <ScoreLine>
                            {new Array(score).fill(true).map((i,index) =>
                                <Star 
                                    onClick={()=>setScore(index+1)}
                                    key={index} 
                                    color={"#FFD600"} 
                                />)
                            }
                            {new Array(10-score).fill(false).map((i,index) =>
                                <Star 
                                    onClick={()=>setScore(score+index+1)}
                                    key={index} 
                                    color={"#D9D9D9"} 
                                />)
                            }
                        </ScoreLine>
                    </TitleLine>
                    <SubmitBtn onClick={(event) => {
                        setValue("score",score);
                        // closeModal(event)
                    }}>
                        글쓰기
                    </SubmitBtn>
                </div>
                <ContentBox {...register("content",{maxLength:100})}>
                    {}
                </ContentBox>
                {/* <ImgLine>
                    {isUploaded? 
                        <>
                            <img src={imgPath} alt=""/>
                            <X onClick={()=>{
                                setValue("image",undefined);
                                setIsUploaded(false);
                            }}/>
                        </>
                        :
                        <button onClick={onFile}>
                            <Plus/>
                        </button>
                    }
                </ImgLine> */}
                <HidenInput 
                    value={memId}
                    {...register("memId", {required:true})
                }/>
                <HidenInput
                    value={hostId}
                    {...register("hostId", {required:true})}
                />
                <HidenInput
                    defaultValue={score}
                    {...register("score", {required:true})}
                />
                {/* <HidenInput
                    {...register("image")}
                    onChange={onUpload}
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    ref={imgRef}
                /> */}
            </FormContainer>
        </ModalBackground>
    )
}

export default ReviewForm;