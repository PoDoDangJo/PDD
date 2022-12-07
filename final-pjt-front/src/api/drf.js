// accoounts urls
const V0 = "http://localhost:8000/";
// movies urls
const V1 = "http://localhost:8000/api/v1/";
// community urls
const V2 = "http://localhost:8000/api/v2/";

const ACCOUNTS = "accounts/";
const REVIEWS = "reviews/";
const MOVIES = "movies/";
const RATES = "rates/";
const COMMENTS = "comments/";

export default {
  accounts: {
    // 로그인
    login: () => V0 + ACCOUNTS + "login/",
    // 로그아웃
    logout: () => V0 + ACCOUNTS + "logout/",
    // 회원가입
    signup: () => V0 + ACCOUNTS + "signup/",
    // 프로필
    profile: (username) => V0 + ACCOUNTS + "profile/" + `${username}/`,
    // 곧 구현할 기능
    // passwordChange: () => V0 + ACCOUNTS + "password/change"
  },
  movie: {
    // 영화 정보 조회
    movies: () => V1 + MOVIES,
    // 영화 상세 정보
    movieDetail: (movie_pk) => V1 + MOVIES + `${movie_pk}/`,
    // 영화 평가 작성
    movieRate: (movie_pk) => V1 + MOVIES + `${movie_pk}/` + RATES,
    // 영화 검색
    movieSearch: (words_target) => V1 + MOVIES + "search/" + `${words_target}/`,
    // 모든 영화 평가 조회
    rates: () => V1 + RATES,
    // 영화 평가 상제 정보, 수정, 삭제
    rateDetail: (rate_pk) => V1 + RATES + `${rate_pk}/`,
    // 영화 추천
    moviesCategory: (category) => V1 + MOVIES + `${category}/`,
  },
  reviews: {
    // 게시글 전체 조회 및 글 작성
    reviews: () => V2 + REVIEWS,
    // 게시글 상세 페이지 조회 및 수정, 삭제
    reviewDetail: (review_pk) => V2 + REVIEWS + `${review_pk}/`,
    // 모든 게시글 댓글 조회
    comments: () => V2 + COMMENTS,
    // 게시판 상세글 댓글 생성
    commentDetail: (review_pk) => V2 + REVIEWS + `${review_pk}/` + COMMENTS,
    // 게시판 상세글 댓글 조회, 수정 및 삭제
    comment: (comment_pk) => V2 + COMMENTS + `${comment_pk}/`,
  },
};
