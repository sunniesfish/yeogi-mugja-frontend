export interface IHostProp {
  data: IHost;
  reviews?: IReview[];
  token: string;
}
export interface IHost {
  hostId: number;
  avgScore: number;
  hostName: string;
  hostAdress: string;
  hostIntro?: string;
  lat: number;
  lng: number;
  hostImgList: IHostImg[];
}
export interface IHostImg {
  hostImgId: number;
  imgPath: string;
  imgDir?: string;
}

export interface IMapProps {
  locationData: {
    lat: number; //위도
    lng: number; //경도
    level: number; //지도 확대 레벨
  };
  mapSize: {
    //지도 크기
    height: string;
    width: string;
  };
  markerData?: {
    locationData: ILocationData;
    MarkerComponent: JSX.Element;
  }[];
}

export interface ILocationData {
  lat: number; //위도
  lng: number; //경도
}

export interface IReviewFormProps {
  hostName: string;
  hostId: number;
  memId: number;
  showModal: boolean;
  closeModal: React.MouseEventHandler;
  token: string;
}

export interface IReviewForm {
  rvId?: number;
  memId: number;
  hostId: number;
  content?: string;
  score: number;
  image?: File;
}

export interface IRoomProps {
  room: IRoom;
  token?: string;
}

export interface IWishProps {
  wish: {
    wishId?: number;
    memId: number;
    host: IHost;
  };
  onClick: React.MouseEventHandler;
}
export interface IWish {
  wishId: number;
  memId: number;
  host: IHost;
}
export interface IWishList {
  content: IWish[];
  pageable: IPageable;
  last: true;
  totalElements: number;
  totalPages: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  empty: boolean;
}
export interface IMyPageSideBarProps {
  isFavPage: boolean;
}

export interface IRoomPage {
  content: IRoom[];
  pageable: IPageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
export interface IRoom {
  roomId: number;
  host: IHost;
  capacity: number;
  price: number;
  name: string;
  status: boolean;
  roomImgList: IRoomImg[];
}
export interface IRoomImg {
  roomImgId: number;
  roomImgPath: string;
}
export interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: false;
}
export interface IReviewPage {
  content: IReview[];
  pageable: IPageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
export interface IReview {
  rvId: number;
  memId: number;
  hostId: number;
  content?: string;
  score: number;
  writeDate: string;
  imgPath: string;
  image?: Object;
}

export interface BookListProps {
  token: string;
}
export interface IBook {
  bookId?: number;
  memberId: number;
  hostId: number;
  roomId: number;
  payPrice: number;
  formattedCheckInDate?: string;
  formattedCheckOutDate?: string;
  payDate: string;
  roomName?: string;
  hostName: string;
  guestName: string;
  guestContect: string;
  formattedBookStatus: string;
}
export interface IBookingParams {
  roomId: number;
  hostId: number;
  payPrice: number;
}
export interface IBookPage {
  content: IBook[];
  pageable: IPageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
export interface BookProp {
  token: string;
  book: IBook;
}

export interface ISearch {
  hostId: number;
  avgScore: number;
  hostName: string;
  hostAddress: string;
  hostImgList: IHostImg[];
  category: string;
  price: number;
  fav: boolean;
}
export interface ISearchPage {
  content: ISearch[];
  pageable: IPageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
export interface ISearchProps {
  search: ISearch;
  token: string;
}

export type SearchPageProps = {
  category: string;
  search: string;
  token: string;
};

export interface IGetEmail {
  memEmail: string;
}
