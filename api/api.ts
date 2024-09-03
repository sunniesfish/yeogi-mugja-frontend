import { IBookingParams, IReviewForm } from "@/interface/interface";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_SERVER_API}/api`;

export async function writeReview(
  hostId: number,
  data: IReviewForm,
  token: string
) {
  console.log("write review");
  const formData = new FormData();
  formData.append("memId", data.hostId.toString());
  formData.append("hostId", hostId.toString());
  formData.append("score", data.score.toString());
  if (data.content) {
    formData.append("content", data.content);
  }
  if (data.image) {
    formData.append("image", data.image);
  }
  const response = await fetch(`${BASE_URL}/host/${hostId}/review/`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "POST",
    body: formData,
    credentials: "include",
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Fail");
  }
  return response.json().catch((error) => console.log(error));
}

export async function getHost(hostId: number, token: string) {
  console.log("get Host");
  return fetch(`${BASE_URL}/host/${hostId}`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
    cache: "no-store",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export async function getRooms(hostId: number) {
  console.log("get rooms");
  return fetch(`${BASE_URL}/host/${hostId}/rooms/`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

export async function getReviews(hostId: number, pageNum: number) {
  console.log("get reviews");
  return fetch(`${BASE_URL}/host/${hostId}/review/${pageNum}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

export async function getFavs(pageNo: number, token: string) {
  console.log("get favs");
  console.log(token);
  return fetch(`${BASE_URL}/mypage/wish/${pageNo}`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

export async function isFavFn(hostId: number, token: string) {
  console.log("is fav");
  console.log("int api : ", token);
  return fetch(`${BASE_URL}/mypage/wish/${hostId}/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
}
export async function addFav(hostId: number, token: string) {
  console.log("add fav");
  return fetch(`${BASE_URL}/mypage/wish/${hostId}`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "POST",
    credentials: "include",
    cache: "no-store",
  }).then((res) => res.json());
}

export async function delFav(hostId: number, token: string) {
  console.log("del fav");
  const response = await fetch(`${BASE_URL}/mypage/wish/${hostId}`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "DELETE",
    credentials: "include",
    cache: "no-store",
  });
  return response.json();
}

export async function doSearch(
  cat: string,
  pageNo: number,
  search: string,
  token: string
) {
  console.log("do search");
  const encodedSearch = encodeURIComponent(search);
  const response = fetch(
    `${BASE_URL}/host/category/${cat}/${pageNo}/${encodedSearch}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    }
  );
  return (await response).json();
}

export async function validatePassword(password: string, token: string) {
  const formData = new FormData();
  formData.append("password", password);
  return fetch(`${BASE_URL}/member/mypwdChk`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
    body: formData,
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      alert("비밀번호를 확인해주세요.");
      return { isValid: false };
    });
}
export async function getMemInfo(token: string) {
  return fetch(`${BASE_URL}/member/email`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "GET",
    credentials: "include",
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

export async function modifyMemInfo(password: string, token: string) {
  const formData = new FormData();
  formData.append("password", password);
  return fetch(`${BASE_URL}/member/mypwdChg`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "PUT",
    body: formData,
    credentials: "include",
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

export async function getBookList(token: string, pageNo: number) {
  return fetch(`${BASE_URL}/booking/${pageNo}`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "GET",
    credentials: "include",
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

export async function reserveRoom(token: string, book: IBookingParams) {
  const formData = new FormData();
  formData.append("hostId", book.hostId + "");
  formData.append("roomId", book.roomId + "");
  formData.append("price", book.payPrice + "");
  return fetch(`${BASE_URL}/`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "POST",
    credentials: "include",
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

export async function fetchImage(folderName: string, fileName: string) {
  try {
    const response = await axios.get(
      `${BASE_URL}/image/${folderName}/images/${fileName}`,
      {
        responseType: "blob", // 이미지 파일을 가져올 때는 blob 타입으로 설정
      }
    );
    return URL.createObjectURL(response.data);
  } catch (error) {
    throw new Error("fail to fetch image");
  }
}

export async function getEmail(memId: number) {
  return fetch(`${BASE_URL}/member/email/${memId}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}
