import { useState } from "react";
import { styled } from "styled-components";
import ReviewForm from "./ReviewForm";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 180px;
  border-bottom: 1px solid ${(props) => props.theme.innerColor};
  position: relative;
`;
const InfoBox = styled.div`
  display: flex;
  width: 70%;
  margin-right: 40px;
  position: relative;
  align-items: center;
  justify-content: space-between;
  & > div {
    margin: 5px;
    span {
      display: block;
    }
  }
  & > div:first-child {
    min-width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > span:first-child {
      font-size: 18px;
      color: gray;
    }
    & > span:nth-child(2) {
      font-size: 21px;
      font-weight: bold;
    }
    & > span:last-child {
      font-size: 18px;
      color: gray;
    }
  }
  & > div:last-child {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    margin-left: 5%;
    span {
      font-size: 14px;
    }
    & > span:last-child {
      font-weight: bold;
      font-size: 15px;
    }
  }
`;
const MenuBox = styled.div`
  position: absolute;
  background-color: white;
  width: 120px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  right: 40px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  div {
    height: 40%;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 18px;
    }
  }
  & > div:nth-child(2) {
    border-top: 1px solid ${(props) => props.theme.innerColor};
  }
`;
const MoreBox = styled.div`
  position: absolute;
  right: 30px;
  padding-top: 3px;
  width: 10px;
  svg {
    fill: darkgrey;
    width: 8px;
  }
`;

function Book({ token, book }: BookProp) {
  const [onMouse, setOnMouse] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const navigate = useNavigate();
  const goToHost = (hostId: number) => {
    navigate(`/host/${hostId}`);
  };
  return (
    <Container>
      <InfoBox onClick={() => goToHost(book.hostId)} className="clickable">
        <div>
          <span>{book.formattedBookStatus}</span>
          <span>{book.hostName}</span>
          <span>{book.roomName}</span>
        </div>
        <div>
          <span>
            체크인 :{" "}
            {book.formattedCheckInDate ? book.formattedCheckInDate : ""}
          </span>
          <span>
            체크아웃 :{" "}
            {book.formattedCheckOutDate ? book.formattedCheckOutDate : ""}
          </span>
          <span>예약자명 : {book.guestName}</span>
          <span>결제일자 : {book.payDate}</span>
          <span>{book.payPrice}원</span>
        </div>
      </InfoBox>
      <MoreBox onMouseEnter={() => setOnMouse(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
          <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
        </svg>
      </MoreBox>
      {onMouse ? (
        <MenuBox onMouseLeave={() => setOnMouse(false)}>
          <div className="clickable" onClick={openModal}>
            <span>리뷰 쓰기</span>
          </div>
          <div className="clickable">
            <span>예약 취소</span>
          </div>
        </MenuBox>
      ) : null}
      <ReviewForm
        memId={book.memberId}
        hostId={book.hostId}
        hostName={book.hostName}
        showModal={showModal}
        closeModal={closeModal}
        token={token}
      />
    </Container>
  );
}

export default Book;
