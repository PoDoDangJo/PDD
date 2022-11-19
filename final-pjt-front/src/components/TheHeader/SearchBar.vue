<template>
  <div class="wrap">
    <div class="search">
      <input type="text" class="searchTerm" placeholder="Search" />
      <button type="submit" class="searchButton">
        <img
          class="seach__button__icon"
          src="@/assets/icons/search.png"
          alt=""
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
};
</script>

<style scoped>
.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border-right: none;
  padding: 5px;
  height: 1vw;
}

.searchTerm {
  background: linear-gradient(white, white) padding-box,
    linear-gradient(to right, #a261f5, #dddcfb, #614af2) border-box;
  border-radius: 5px 0 0 5px;
  border: 3px solid transparent;
}

button {
  padding: 0;
}
/* #614af2,
    #a261f5,
    #dddcfb, */

.searchButton {
  width: 40px;
  height: 2rem;
  border: 3px solid #614af2;
  background: #614af2;
  text-align: center;
  color: #dddcfb;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

.seach__button__icon {
  height: 50%;
}

/*Resize the wrap to see the search bar change!*/
.wrap {
  width: calc(200px + 10vw);
  min-width: 200px;
  max-width: 500px;
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
