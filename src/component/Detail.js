import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, upCnt } from "../store.js";

// import styled from "styled-components";

// let YellowBtn = styled.button`
//   background: ${(props) => props.bg};  이렇게 쓰면 스테이트 넘겨주듯이 <YellowBtn bg='어쩌구' /> 저기 어쩌구만 바꾸면 색 바뀜. Awesome.
//   color: ${(props) => (props.bg == "blue" ? "white" : "black")};
//   padding: 10px;
// `;
// let NewBtn = styled.button(YellowBtn); // 복사 가능. 추가로 커스텀이 된다는데 안됨. 잘 모르겠음.

// 장점 :
// 스타일이 다른 js 파일로 오염되지 않는다. => css module 쓰면 됨.
// 이 페이지 안에서만 사용이 가능하다.
// 로딩 시간이 단축 될 수 있다.
// 간단한 프로그래밍도 가능하다. Yellow버튼 컴포넌트 참조
// 단점 :
// js파일이 매우 복잡해진다.
// 다른 파일에서 쓰려면 결국 똑같이 import 해야하는데 그럴거면 그냥 css 쓰는게 나음.

const Detail = (props) => {
  let [cnt, setCnt] = useState(10);
  let [visible, setVisible] = useState(true);
  let { id } = useParams(); // 유저가 URL 파라미터에 입력한 것을 가져오기 위한 훅.
  let finded = props.shoes.find((item) => {
    return item.id === parseInt(id, 10);
    // 에러난 이유, 훅으로 가져온 id는 문자열이기 때문. 따라서 === 이렇게 쓸려면 정수화 해주어야 한다. 물론 그냥 == 이렇게 쓰면 에러 안난다.
  });

  let [amount, setAmount] = useState("");

  let [nav, setNav] = useState(0); // 0이면 1번탭, 1이면 2번탭, 2먼 3번탭
  let [fadeDetail, setFadeDetail] = useState(""); // transition 상태 변경 state

  // REDUX
  let cart = useSelector((state) => {
    return state.cart;
  });
  let dispatch = useDispatch();

  const [isthere, setIsthere] = useState(false);

  useEffect(() => {
    // 컴포넌트가 Mount, Update 시에 실행됨. 두번 뜨는건 걱정 안해도 됨. 근데 밖에다 해도 똑같이 나온다. 물론 상당한 차이가 있다.
    // 이 안에 적은 코드는 html 렌더링이 진행된 '이후'에 실행된다.
    // 예시로 for문을 만번 돌린다고 가정하자.
    // 밖에다 썼으면 for문 만번 돌리고 html 보여준다. 이럼 좀 이상하다. 그래서 useEffect 쓴다.
    // 즉, 시간이 좀 걸리는 어려운 연산, 혹은 서버에서 데이터 가져오는 작업, 타이머 관련된 것들 등등은 여기에 작성한다.

    // setTimeout(()=>{실행할코드}, 밀리단위 시간); 자바스크립트 타이머 주는 방법.
    let a = setTimeout(() => {
      setVisible(false);
    }, 10000);

    let b = setInterval(() => {
      setCnt(--cnt);
    }, 1000);
    return () => {
      // 이 리턴 함수는 clean up function 이라는 별명이 있다.
      // clean up function은 mount시 실행되지 않고, unmount시 실행된다.
      // 여기 있는 코드는 useEffect 동작 전에 실행된다.
      // ex) 기존 타이머 제거
      clearTimeout(a); // <= setTimeout을 변수에 담은 이유. 제거의 용이성 때문.
      clearInterval(b);
    };
  }, []); // <= Dependency, 여기 대괄호는 실행조건 넣을 수 있는 곳. 텅빈 디펜덴시 추가하면 업데이트 될 때 코드 실행 안됨.

  useEffect(() => {
    if (isNaN(amount) === true) {
      alert("숫자만 입력해 주세요.");
    }
  }, [amount]);

  useEffect(() => {
    // 설명. Detail 컴포넌트 로드(mount) 될 때 이 코드가 실행되면서 end 클래스를 붙이고,
    // Detail 컴포넌트가 unmount 될 때 Clean Up Function이 동작하면서 end 클래스를 뗀다.
    let a = setTimeout(() => {
      setFadeDetail("end");
    }, 100);
    return () => {
      clearTimeout(a);
      setFadeDetail("");
    };
  }, []);

  useEffect(() => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === finded.id) {
        setIsthere(true);
        break;
      }
    }
  }, [cart]);

  useEffect(() => {
    // const set = new Set(JSON.parse(localStorage.getItem("watched")));
    // set.add(finded.id);
    // const arr = Array.from(set);
    // localStorage.setItem("watched", JSON.stringify(arr));
    // 이래버리면 앞서 본 아이템 중, 다시 한번 본 것들은 갱신이 되지 않는다. 뒤에 그냥 남아있다는 소리.

    const arr = JSON.parse(localStorage.getItem("watched"));
    arr.unshift(finded.id);
    let copy = [...new Set(arr)];
    const NewArr = [...copy];
    if (NewArr.length > 3) {
      NewArr.splice(3);
    }
    localStorage.setItem("watched", JSON.stringify(NewArr));
    // set과 unshift의 로직을 적절히 섞어주면 해결 가능.
  }, []);

  return (
    <div className={`container start ${fadeDetail}`}>
      {visible === true ? (
        <div className="alert alert-warning">{cnt}초 이내 구매시 할인!!!</div>
      ) : null}
      {/* <YellowBtn bg="blue">버튼</YellowBtn> */}
      <div className="row">
        <div className="col-md-6">
          <img
            alt="사진"
            src={`https://codingapple1.github.io/shop/shoes${
              finded.id + 1
            }.jpg`}
            width={"100%"}
          />
        </div>
        <div className="col-md-6">
          <input
            placeholder="수량을 입력해 주세요"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <h4 className="pt-5">{finded.title}</h4>
          <p>{finded.content}</p>
          <p>{finded.price}원</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              if (isthere === true) {
                dispatch(upCnt(finded.id));
              } else if (isthere === false) {
                dispatch(
                  addItem({ id: finded.id, name: finded.title, count: 1 })
                );
              }
            }}
          >
            주문하기
          </button>
        </div>
      </div>

      {/* justify를 요소를 넣으면 가운데정렬. */}
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setNav(0);
            }}
          >
            BTN1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setNav(1);
            }}
          >
            BTN2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setNav(2);
            }}
          >
            BTN3
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* {nav === 0 ? <div>Content1</div> : null}
      {nav === 1 ? <div>Content2</div> : null}      삼항 연산자는 하나의 중괄호 안에 여러개 못쓴다.
      {nav === 2 ? <div>Content3</div> : null} */}

      <TabContent nav={nav} shoes={props.shoes} />
    </div>
  );
};

// const TabContent = (props) => {
//   // 컴포넌트(함수) 밖에서는 if 문 사용이 가능하다.
//   // 컴포넌트기 때문에 각 조건문 마다 return 필수로 적어줘야한다. (함수랑 같음)
//   if (props.nav === 0) {
//     return <div>Content1</div>;
//   } else if (props.nav === 1) {
//     return <div>Content2</div>;
//   } else if (props.nav === 2) {
//     return <div>Content3</div>;
//   }
// };
// 아 저는 props.nav <-- 이거 계속 치는거 귀찮아요.
// 그럼 이렇게.

const TabContent = ({ nav, shoes }) => {
  // 이렇게 하면 props.어쩌구 안붇여도 된다.
  // if (nav === 0) {
  //   return <div>Content1</div>;
  // } else if (nav === 1) {
  //   return <div>Content2</div>;
  // } else if (nav === 2) {
  //   return <div>Content3</div>;
  // }

  let [fade, setFade] = useState(""); // transition 상태 변경 state

  // if문 안써도 해결이 가능함.
  useEffect(() => {
    // Aoutomatic Batching 때문에 setTimeout 함수를 사용해야함. 자세한 내용은 코딩애플 '멋있게 컴포넌트 전환 애니메이션 주는법' 참고.
    let a = setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      clearTimeout(a);
      setFade("");
    };
  }, [nav]);
  return (
    <div className={`start ${fade}`}>
      {
        [
          <div>{shoes[0].title}</div>,
          <div>굉장한 신발임.</div>,
          <div>이걸 안사?</div>,
        ][nav]
      }
    </div>
  );
  // 배열 인덱싱 방법으로도 해결 가능.
};

export default Detail;
