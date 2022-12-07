<template>
  <div class="detail__info">
    <h1 class="info-title" style="font-size: calc(3px)">줄거리</h1>
    <p class="movie__overview">{{ movie.overview }}</p>
    <div class="people-profile">
      <div class="director-container">
        <h1 class="info-title">감독</h1>
        <div class="director">
          <img
            class="profile-image"
            :src="directorProfile.profile_path"
            alt=""
          />
        </div>
      </div>
      <div class="actors-container">
        <h1 class="info-title">배우</h1>
        <div
          class="actors"
          v-for="actorProfile of actorProfiles"
          :key="actorProfile.id"
        >
          <img class="profile-image" :src="actorProfile.profile_path" alt="" />
        </div>
      </div>
    </div>
    <div class="people-name">
      <div>
        <span>감독:</span>
        <span>
          {{ directorProfile.name }}
        </span>
      </div>
      <div>
        <span>출연:</span>
        <span>
          {{ actorsName }}
        </span>
      </div>
      <div>
        <span>장르:</span>
        <span>
          {{ genres }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DetailInfo",
  computed: mapState({
    movie: (state) => state.movies.movieDetailModalStatus.movie,
    directorProfile() {
      if (this.movie.director[0].profile_path) {
        const directorProfile = {
          profile_path:
            "https://image.tmdb.org/t/p/original" +
            this.movie.director[0].profile_path,
          name: this.movie.director[0].name,
        };
        return directorProfile;
      } else {
        const directorProfile = {
          profile_path: "",
          name: this.movie.director[0].name,
        };
        return directorProfile;
      }
    },
    actorProfiles() {
      const actors = this.movie.actors.slice(0, 3);
      const actorProfiles = actors.map((actor) => {
        const actorProfile =
          "https://image.tmdb.org/t/p/original" + actor.profile_path;
        return { name: actor.name, profile_path: actorProfile };
      });

      return actorProfiles;
    },
    actorsName() {
      const actors = this.movie.actors.slice(0, 3);
      const actorsName = [];
      for (const actor of actors) {
        actorsName.push(actor.name);
      }
      return actorsName.join(", ");
    },
    genres() {
      const genres = this.movie.genre_ids;
      const genresName = [];
      for (const genre of genres) {
        genresName.push(genre.name);
      }
      return genresName.join(", ");
    },
  }),
};
</script>

<style scoped>
.detail__info {
  margin: 2vw;
}
.info-title {
  opacity: 0.8;
  font-size: calc(8px + 0.5vw) !important;
}

.movie__overview {
  font-size: calc(8px + 0.3vw);
}

.people-profile {
  display: flex;
}

.actors-container {
  margin-left: 2vw;
}

.profile-image {
  width: 20vw;
  margin: 0 0.5vw;
  display: inline-block;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 10px #000;
}
.actors {
  display: inline;
  margin: 0 1vw;
}

.people-name {
  margin: 1vw 0;
}
.people-name > * {
  padding-top: 1vw;
}
</style>
