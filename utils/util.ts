export function formatDateString(input: string): string {
  // Date 객체로 변환
  const date = new Date(input);

  // 연도, 월, 일 추출
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
  const day = date.getDate().toString().padStart(2, '0');

  // yyyy.mm.dd 형식으로 변환
  return `${year}.${month}.${day}`;
}

export function formDate(date:Date):string{
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
  const day = date.getDate().toString().padStart(2, '0');

  // yyyy.mm.dd 형식으로 변환
  return `${year}.${month}.${day}`;
}


export function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
}

export function goToLogin(){
  window.location.assign(`${process.env.REACT_APP_SERVER_API}/mugja/login`);
}
export function goToMain(){
  window.location.assign(`${process.env.REACT_APP_SERVER_API}/mugja/main`);
}