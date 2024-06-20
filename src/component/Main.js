import React, { useState } from "react";
import Card from "./Card";
import bg from "../img/bg.png";
import axios from "axios";
import Loading from "./Loading";

const Main = (props) => {
  let [cnt, setCnt] = useState(2);
  let [loading, setLoading] = useState(false);

  return (
    <>
      <div className="main-bg" style={{ backgroundImage: `url(${bg})` }}></div>
      <div className="container">
        <div className="row">
          {props.shoes.map((a, i) => {
            return <Card key={i} shoes={props.shoes} i={i} />;
          })}
        </div>
        <button
          onClick={() => {
            let copy = [...props.shoes];
            copy.sort((a, b) =>
              a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
            );
            props.setShoes(copy);
          }}
        >
          정렬
        </button>
        {loading === true ? <Loading /> : null}
        <button
          onClick={() => {
            if (cnt > 3) {
              alert("No More Items");
            } else {
              setLoading(true);
              axios
                .get(`https://codingapple1.github.io/shop/data${cnt}.json`)
                .then((result) => {
                  // then 함수로 가져온 데이터 뽑기
                  // let copy = [...props.shoes];
                  // copy.push(...result.data); 이렇게가 아니라
                  let copy = [...props.shoes, ...result.data]; // 이게 더 편해보인다.
                  props.setShoes(copy);
                  setLoading(false);
                })
                .catch(() => {
                  // 만약 AJAX 요청 실패하면?
                  alert("Server Disconnected");
                  setLoading(false);
                });
              setCnt(++cnt);

              // axios.post('/urlurlurl', "{name: 'kim'}")  // 이건 Post 요청 방법 ( 서버로 데이터 전송 )
              // 서버로 데이터 전송시에는 문자자료만 주고 받을 수 있기 때문에 " (보낼 자료) " <= 더블쿼테이션 잘 해줘야 한다. ( 이렇게 array/object를 문자자료로 바꾼걸 JSON이라고 한다. )
              // 수신시에는 axios 쓰면 알아서 JSON을 array/object 형식으로 변형해준다. 물론 fetch는 못한다. 직접 해줘야 한다.

              // 참고. fetch의 경우.//
              // fetch('URL').then( RESULT => RESULT.json() ).then( (RESULT) => {console.log(RESULT)} ) 이렇게 해줘야 한다.

              // Promise.all( [ axios.get('/url1') axios.get('/url2') ]).then(()=>{ '코드' })  // 동시에 ajax 요청 여러개 하는법. Promise.all 함수 활용.
              // .then 부분은 ajax 요청 '두 개가 모두' 정상 실행되었을 때 '코드' 부분을 실행한다.
            }
          }}
        >
          더보기
        </button>
      </div>
    </>
  );
};

export default Main;
