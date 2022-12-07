import drf from "@/api/drf";
import axios from "axios";

export default {
  state: {
    // 모든 리뷰 / 댓글 / 평가
    allReviews: [],
    allComments: [],
    // 모달창 관리를 위한 데이터
    reviewDetailModalStatus: { isActive: false, review: null },
    createReviewModalStatus: false,
  },
  getters: {
    reviews(state) {
      return state.allReviews;
    },
    comments(state) {
      const comments = state.allComments.filter((comment) => {
        if (comment.review_id == state.reviewDetailModalStatus.review.id) {
          return comment;
        }
      });
      return comments;
    },
  },
  mutations: {
    // 리뷰 상세창 토글
    REVIEW_MODAL_TOGGLE(state, reviewDetailModalStatus) {
      state.reviewDetailModalStatus = reviewDetailModalStatus;
    },
    // 리뷰 생성창 열기
    OPEN_CREATE_REVIEW_MODAL(state) {
      state.createReviewModalStatus = true;
    },
    // 리뷰 데이터 가져오기
    GET_REVIEWS(state, reviews) {
      state.allReviews = reviews;

      // 리뷰를 삭제했을 경우
      state.reviewDetailModalStatus = { isActive: false, review: null };
    },
    // 리뷰 댓글 생성
    CREATE_REVIEW_COMMENT(state, comments) {
      state.allComments.push(comments);
    },
    // 리뷰 생성
    CREATE_REVIEWS(state, review) {
      state.allReviews.push(review);
      state.createReviewModalStatus = false;
    },
    // 리뷰 생성창 닫기
    CLOSE_CREATE_REVIEW_MODAL(state) {
      state.createReviewModalStatus = false;
    },
    // 리뷰 수정
    UPDATE_REVIEW(state, reviewItem) {
      state.allReviews = state.allReviews.reverse().map((review) => {
        if (review.id == reviewItem.id) {
          review = reviewItem;
        }
        return review;
      });
    },
    // 댓글 가져오기
    GET_COMMENTS(state, comments) {
      state.allComments = comments;
    },
  },
  actions: {
    // 리뷰 조회
    getReviews(context) {
      axios({
        method: "get",
        url: drf.reviews.reviews(),
      })
        .then((response) => {
          const reviews = response.data;
          context.commit("GET_REVIEWS", reviews);
        })
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error);
          }
          context.commit("GET_REVIEWS", []);
        });
    },
    // 리뷰창 열기
    openReviewModal(context, id) {
      axios({
        method: "get",
        url: drf.reviews.reviewDetail(id),
      })
        .then((response) => {
          const isActive = !context.state.reviewDetailModalStatus.isActive;
          // 리뷰 정보
          const review = response.data;

          const reviewDetailModalStatus = {
            isActive: isActive,
            review: review,
          };
          context.commit("REVIEW_MODAL_TOGGLE", reviewDetailModalStatus);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 리뷰창 닫기
    closeReviewModal(context) {
      const isActive = !context.state.reviewDetailModalStatus.isActive;
      const reviewDetailModalStatus = { isActive: isActive, review: null };

      context.commit("REVIEW_MODAL_TOGGLE", reviewDetailModalStatus);
    },
    // 리뷰 생성창 열기
    openCreateReviewModal(context) {
      context.commit("OPEN_CREATE_REVIEW_MODAL");
    },
    // 리뷰 생성창 닫기
    closeCreateReviewModal(context) {
      context.commit("CLOSE_CREATE_REVIEW_MODAL");
    },
    // 리뷰 생성
    createReview(context, payload) {
      axios({
        method: "post",
        url: drf.reviews.reviews(),
        headers: {
          // 인증 여부를 확인하기 위한 Token을 담아서 요청
          Authorization: `Token ${context.rootState.accounts.token}`,
        },
        data: {
          title: payload.title,
          content: payload.content,
          spoiler: payload.spoiler,
          like_users: [],
          user_id: context.rootState.accounts.userInfo.id,
        },
      })
        .then((response) => {
          const review = response.data;
          context.commit("CREATE_REVIEWS", review);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 리뷰 수정
    updateReview(context, review) {
      context.commit("UPDATE_REVIEW", review);
    },
    // 리뷰 삭제
    deleteReview(context, review_id) {
      axios({
        method: "delete",
        url: drf.reviews.reviewDetail(review_id),
        headers: {
          // 인증 여부를 확인하기 위한 Token을 담아서 요청
          Authorization: `Token ${context.rootState.accounts.token}`,
        },
      })
        .then(() => {
          axios({
            method: "get",
            url: drf.reviews.reviews(),
          })
            .then((response) => {
              const reviews = response.data;
              context.commit("GET_REVIEWS", reviews);
            })
            .catch((error) => {
              if (error.data) {
                console.log(error.data);
              }
            });
        })
        .catch((error) => {
          console.log(error);
          context.commit("GET_REVIEWS", []);
        });
    },
    // 리뷰 댓글 조회
    getComments(context) {
      axios({
        method: "get",
        url: drf.reviews.comments(),
        headers: {
          Authorization: `Token ${context.rootState.accounts.token}`,
        },
      })
        .then((response) => {
          context.commit("GET_COMMENTS", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 리뷰 댓글 생성
    createReviewComment(context, payload) {
      axios({
        method: "post",
        url: drf.reviews.commentDetail(payload.review_id),
        headers: {
          // 인증 여부를 확인하기 위한 Token을 담아서 요청
          Authorization: `Token ${context.rootState.accounts.token}`,
        },
        data: {
          content: payload.content,
          spoiler: false,
          review_id: payload.review_id,
          user_id: context.rootState.accounts.userInfo.id,
        },
      })
        .then((response) => {
          const comments = response.data;
          context.commit("CREATE_REVIEW_COMMENT", comments);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 리뷰 댓글 삭제
    deleteReviewComment(context, comment) {
      axios({
        method: "delete",
        url: drf.reviews.comment(comment.id),
        headers: {
          Authorization: `Token ${context.rootState.accounts.token}`,
        },
      })
        .then(() => {
          // 댓글 조회
          axios({
            method: "get",
            url: drf.reviews.comments(),
            headers: {
              Authorization: `Token ${context.rootState.accounts.token}`,
            },
          })
            .then((response) => {
              context.commit("GET_COMMENTS", response.data);
            })
            .catch((error) => {
              console.log(error);
              context.commit("GET_COMMENTS", []);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
