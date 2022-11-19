// accoounts urls
const V0 = "http://localhost:8000/";
// movies urls
const V1 = "http://localhost:8000/api/v1/";
// community urls
const V2 = "http://localhost:8000/api/v2/";

const ACCOUNTS = "accounts/";
const REVIEW = "review/";
const MOVIE = "movie/";
const COMMENTS = 'comments/'

export default {
  accounts: {
    // 로그인
    login: () => V0 + ACCOUNTS + "login/",
    // 로그아웃
    logout: () => V0 + ACCOUNTS + "logout/",
    // 곧 구현할 기능
    // passwordChange: () => V0 + ACCOUNTS + "password/change"
    // 회원가입
    signup: () => V0 + ACCOUNTS + "signup/",
  },
    
  movie: {
    // 모든 영화 정보 조회
    movies: () => V1,
    // 모든 영화 댓글 조회
    comments: () => V1 + COMMENTS,
    // 영화 댓글 상제 정보, 수정, 삭제
    commentDetail: (comment_pk) => V1 + COMMENTS + `${comment_pk}/`,
    // 영화 상세 정보
    movieDetail: (movie_pk) => V1 + MOVIE + `${movie_pk}/`,
    // 영화 댓글 작성
    // params: movie_id, type
    movieComments: (movie_pk) => V1 + MOVIE + `${movie_pk}/` + COMMENTS,
    // 영화 검색
    // params : query(찾을 데이터 명)
    //          type(genre, country, director, actor, year,weather)
    // movieSearch: () => V1 + MOVIE + "search",
    // 필터 기능
    // params : query(찾을 데이터 명)
    //          type(actor, director, title)
    // filter: () => V1 + MOVIE + "filter",
  },

  reviews: {
    // 게시판 전체 조회 및 글 작성
    reviews: () => V2,
    // 게시판 상세 페이지 조회 및 수정, 삭제
    review: (review_pk) => V2 + REVIEW + `${review_pk}/`,
    // 게시판 상세글 댓글 생성
    comments: (review_pk) => V2 + REVIEW + `${review_pk}/` + COMMENTS,
    // 게시판 상세글 댓글 수정 및 삭제
    comment: (review_pk, comment_pk) =>
      V2 + REVIEW + `${review_pk}/` + "comments/" + `${comment_pk}/`,
    // 게시글 검색
    // params : query(찾을 데이터 명)
    //          title, content, nickname 취사 선택
    //          값이 있는지 없는지만 구분
    // articleSearch: () => HOST + REVIEW + "search",
  },
};
