/* eslint-disable */

import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

import "./App.css";

// 부트스트랩
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";

// 데이터 json 파일 가져오기
import data from "./data.js";

// 컴포넌트

// 이건 이제 배포를 고려 안했을때나 쓰는법. 이렇게 배포하면 파일 사이즈가 커진다.
// import Detail from "./component/Detail.js";
// import Card from "./component/Card.js";
// import Main from "./component/Main.js";
// import Cart from "./component/Cart.js";
// import Watched from "./component/Watched.js";

// 해결법 => lazy import
// 리액트 방식은 Single Page Application이기 때문에 코드 스플리팅이 필수임.
// lazy import는 그걸 도와줌
const Detail = lazy(() => import("./component/Detail.js"));
const Card = lazy(() => import("./component/Card.js"));
const Main = lazy(() => import("./component/Main.js"));
const Cart = lazy(() => import("./component/Cart.js"));
const Watched = lazy(() => import("./component/Watched.js"));

// 필요해질 때 import 해주세요~ 하는 코드임.
// 사이트 발행할 때 별도의 js 파일로 분리된다.
// 단점 : 약간의 지연시간 발생함. => <Suspense/>로 해결 가능.

// State
import { Suspense, lazy, useEffect, useState } from "react";

// Axios
import axios from "axios";

// React-Query
import { useQuery } from "react-query";

function App() {
  const [shoes, setShoes] = useState(data);
  const navigate = useNavigate(); // 페이지 이동을 도와준다. Hook이다. Hook은 유용한 것들이 들어있는 함수라고 생각하면 된다.
  const [mountWatched, setMountWatched] = useState(false);

  const goToHome = () => {
    navigate("/");
  };
  const goToCart = () => {
    navigate("/cart");
  };
  const goToAbout = () => {
    navigate("/about");
  };
  const goToEvent = () => {
    navigate("/event");
  };

  // const KEY = "watched";
  // const isThere = localStorage.getItem(KEY);

  // if (!isThere) {
  //   localStorage.setItem(KEY, JSON.stringify([]));
  // } else {
  // }
  useEffect(() => {
    const KEY = "watched";
    const isThere = localStorage.getItem(KEY);

    if (!isThere) {
      localStorage.setItem(KEY, JSON.stringify([]));
    } else {
    }

    let a = setTimeout(() => {
      setMountWatched(true);
    }, 0);
    // return clearTimeout(a); 이게 있으면 Watched 컴포넌트가 잠깐 뜨고 사라짐.
  }, []);

  // 리액트 쿼리를 사용했을때....

  // 장점1. 성공/실패/로딩중을 쉽게 파악할 수 있다.
  // result.data; => ajax 성공했을때 가져오는 데이터가 들어있다.
  // result.isLoading; => 로딩중일때 True 반환
  // result.error; => 에러났을때 True 반환

  // 장점2. 자동으로 재요청해줌( 틈만나면 자동으로 refetch ) => 실시간으로 데이터를 보여줘야하는 SNS나 코인거래소 등에서 유용함.

  // 장점3. ajax 요청 실패시 알아서 retry 해준다. (자동으로 재요청 보내준다.)

  // 장점4. state 공유 안해도 됨. 그냥 ajax 요청 코드 한번 더 적으면 됨.

  // 장점5. ajax 결과 캐싱 가능. 성공결과를 5분동안 기억해둔다는 소리.
  // 5분 내로 한번더 get 요청이 온다면 이미 저장된 결과를 우선적으로 보여줌 그다음에 ajax 요청 수행.
  let result = useQuery(
    ["name"],
    () => {
      // 리액트쿼리 이용해서 ajax 요청하기
      return axios
        .get(`https://codingapple1.github.io/userdata.json`)
        .then((res) => {
          console.log("요청됨");
          return res.data;
        })
        .catch(() => {
          console.log("에러남");
        });
    },
    { enable: false }
    // refetch 간격도 staleTime으로 설정 가능함. 물론 일부분 끌수도 있다.
    // 끄는 방법과 범위는 다양하며, 이 외에도 여러 기능이 있으니 구글링 ㄱㄱ
  );

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={goToHome}>Shoe Shop</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Link
              style={{
                textDecoration: "none",
                margin: "10px",
                marginTop: "8px",
                color: "",
              }}
              to={"/"}
            >
              Home
            </Link>
            <Link
              style={{
                textDecoration: "none",
                margin: "10px",
                marginTop: "8px",
              }}
              to={"/detail"}
            >
              Details
            </Link> 
            결론만 말하자면, 안이래도 된다. 그냥 요소로서 추가해주면 끝난다.*/}
            <Nav.Link onClick={goToHome}>
              {/* 내 생각엔 이게 제일 깔끔한 것 같기도 하고. */}
              Home
            </Nav.Link>
            <Nav.Link onClick={goToCart}>Cart</Nav.Link>
            <Nav.Link onClick={goToAbout}>About Us</Nav.Link>
            <Nav.Link onClick={goToEvent}>Event</Nav.Link>
            {/* <Nav.Link
              // 이런 식으로 온클릭 이벤트와 navigate 함수를 이용해서 구현도 가능하다.
              // navigate 함수에 인자로 1 혹은 -1을 넣어준다면? 각각 앞으로가기, 뒤로가기 버튼이 된다!
              // -2 를 넣어주면 두페이지 뒤로 간다. 여러모로 응용해보자. Awesome.
              // onClick={() => {
              //   navigate(1);
              // }}
            >
              Test
            </Nav.Link> */}
          </Nav>
          <Nav className="ms-auto" style={{ color: "white" }}>
            {result.isLoading && "로딩중..."}
            {result.error && "에러!"}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      {mountWatched ? <Watched /> : null}
      {/* <Watched /> */}

      <Suspense fallback={<div>로딩 UI</div>}>
        {/* 컴포넌트 로드까지 지연시간이 발생한다. 그 지연시간 동안 대신 보여줄 html을 <Suspense/>를 이용해서 작성할 수 있다. */}
        <Routes>
          <Route
            path="/"
            element={<Main shoes={shoes} setShoes={setShoes} />}
          />
          <Route path="/detail" element={<Detail shoes={shoes} />} />
          <Route path="/about" element={<About navigate={navigate} />}>
            <Route path="member" element={<div>멤버임</div>} />
            <Route path="location" element={<div>위치정보임</div>} />
          </Route>
          <Route path="/event" element={<Event navigate={navigate} />}>
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
          </Route>
          {/* <Route path="/about/member" element={<About />} />
        <Route path="/about/location" element={<About />} />
        이렇게 해도 되지만, 저 위와 같이 Nested Routes 방식을 이용하면 좀 더 편할 수도 있다. */}
          <Route path="*" element={<div>404</div>} />{" "}
          {/* 아스테라이트는 지정된 경로 이외의 모든 경로를 의미 한다.*/}
          <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
          {/* 페이지를 여러개 만들고 싶다면 ':URL 파라미터' 형태로 사용할 수 있다. 위의 ':id'가 URL 파라미터다. 
        파라미터는 여러개 만들 수 있다. ex) :id/:pass/ㄹㅇㅁㄴㄹㅇㄴ/:... 이런식으로 섞어서든 어떻게든 사용 가능.*/}
          <Route path="/cart" element={<Cart />} />
          <Route path="/test" element={<Watched />} />
        </Routes>
      </Suspense>
    </div>
  );
}

const About = ({ navigate }) => {
  const goToMember = () => {
    navigate("/about/member");
  };
  const goToLocation = () => {
    navigate("/about/location");
  };

  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
      <Nav.Link onClick={goToMember}>멤버</Nav.Link>
      <Nav.Link onClick={goToLocation}>위치</Nav.Link>
    </div>
  );
};

const Event = ({ navigate }) => {
  const goToOne = () => {
    navigate("/event/one");
  };
  const goToTwo = () => {
    navigate("/event/two");
  };

  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>

      <Nav.Link onClick={goToOne}>이벤트1</Nav.Link>
      <Nav.Link onClick={goToTwo}>이벤트2</Nav.Link>
      <button
        onClick={() => {
          props.navigate(-1);
        }}
      >
        뒤로
      </button>
      <button
        onClick={() => {
          props.navigate(1);
        }}
      >
        앞으로
      </button>
    </div>
  );
};

export default App;
