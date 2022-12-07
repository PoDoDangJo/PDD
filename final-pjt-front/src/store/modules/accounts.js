import drf from "@/api/drf";
import axios from "axios";
import router from "@/router";

export default {
  state: {
    // 유저 토큰
    token: null,
    // 본인 유저 정보
    userInfo: null,
    // 다른 사람의 프로필
    curUserInfo: {},
    // 모달창 관리를 위한 데이터
    signUpModalStatus: false,
    loginModalStatus: false,
    profileModalStatus: false,
  },
  getters: {
    // 로그인 상태
    isLogIn: (state) => (state.token ? true : false),
    // 유저 토큰
    authToken: (state) => `Token ${state.token}`,
  },
  mutations: {
    // 유저 정보
    GET_USER_PROFILE(state, userInfo) {
      state.curUserInfo = userInfo;
    },
    // 회원 가입창 열기
    OPEN_SIGN_UP_MODAL(state) {
      state.signUpModalStatus = true;
      state.loginModalStatus = false;
    },
    // 회원 가입창 닫기
    CLOSE_SIGN_UP_MODAL(state) {
      state.signUpModalStatus = false;
    },
    // 로그인창 열기
    OPEN_LOG_IN_MODAL(state) {
      state.loginModalStatus = true;
    },
    // 로그인창 닫기
    CLOSE_LOG_IN_MODAL(state) {
      // 로그인 모달닫기
      state.loginModalStatus = false;
    },
    // 토큰 저장
    SAVE_TOKEN(state, userdata) {
      // 로그인 및 회원가입 성공 시 모달창 닫음

      state.userInfo = userdata.userInfo;
      state.token = userdata.token;

      // 로그인 성공시 로그인 및 회원가입 모달 닫기
      state.loginModalStatus = false;
      state.signUpModalStatus = false;
    },
    // 로그아웃
    LOG_OUT(state) {
      // 토큰과 유저 정보 null로 변경
      state.token = null;
      state.userInfo = null;
      // local 저장소에서 token 제거
      localStorage.removeItem("token");
      // 새로고침
      location.reload;
    },
    // 프로필창 열기
    OPEN_PROFILE_MODAL(state) {
      state.profileModalStatus = true;
    },
    // 프로필창 닫기
    CLOSE_PROFILE_MODAL(state) {
      state.profileModalStatus = false;
    },
  },
  actions: {
    // 유저 정보
    getUserProfile(context, username) {
      axios({
        method: "get",
        url: `${drf.accounts.profile}${username}/`,
        headers: {
          Authorization: context.getters.authToken,
        },
      })
        .then((response) => {
          context.commit("GET_USER_PROFILE", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 회원가입창 열기
    openSignUpModal(context) {
      context.commit("OPEN_SIGN_UP_MODAL");
    },
    // 회원 가입
    signUp(context, payload) {
      const username = payload.username;
      axios({
        method: "post",
        url: drf.accounts.signup(),
        data: {
          username: username,
          password1: payload.password1,
          password2: payload.password2,
        },
      })
        .then((response) => {
          const token = response.data.key;
          // 회원가입 성공 시 유저 정보 axios 요청
          axios({
            method: "get",
            url: drf.accounts.profile(username),
            headers: {
              Authorization: `Token ${token}`,
            },
          }).then((response) => {
            const userdata = {
              userInfo: response.data,
              token: token,
            };
            context.commit("SAVE_TOKEN", userdata);
          });
        })
        .catch((error) => {
          alert(error.response.data.username);
        });
    },
    // 회원 가입창 닫기
    closeSignUpModal(context) {
      context.commit("CLOSE_SIGN_UP_MODAL");
    },
    // 로그인창 열기
    openLogInModal(context) {
      context.commit("OPEN_LOG_IN_MODAL");
    },
    //로그인
    logIn(context, payload) {
      const username = payload.username;
      axios({
        method: "post",
        url: drf.accounts.login(),
        data: {
          username: username,
          password: payload.password,
        },
      })
        .then((response) => {
          const token = response.data.key;
          // 로그인 성공 시 유저 정보 axios 요청
          axios({
            method: "get",
            url: drf.accounts.profile(username),
            headers: {
              Authorization: `Token ${token}`,
            },
          })
            .then((response) => {
              const userdata = {
                userInfo: response.data,
                token: token,
              };
              context.commit("SAVE_TOKEN", userdata);
            })
            .catch((error) => {
              console.log(error.response);
              alert("이름과 비밀번호를 확인해 주세요.");
            });
        })
        .catch((error) => {
          alert(error.response.data.non_field_errors);
        });
    },
    // 로그인창 닫기
    closeLogInModal(context) {
      context.commit("CLOSE_LOG_IN_MODAL");
    },
    // 로그아웃
    logOut(context) {
      // CommunityView에 있다면 HomeView로 이동
      if (context.state.isCommunity) {
        router.push({ name: "HomeView" });
      }
      context.commit("LOG_OUT");
    },
    // 프로필창 열기
    openProfileModal(context) {
      context.commit("OPEN_PROFILE_MODAL");
    },
    // 프로필창 닫기
    closeProfileModal(context) {
      context.commit("CLOSE_PROFILE_MODAL");
    },
  },
};
