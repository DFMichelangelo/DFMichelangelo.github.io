<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core';

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const { y: scroll } = useWindowScroll()
</script>

<template>
  <header class="header z-40">

    <button title="Scroll to top" fixed right-3 bottom-3 w-10 h-10 hover:op100 rounded-full hover-bg-hex-8883 transition
      duration-300 z-100 print:hidden :class="scroll > 300 ? 'op30' : 'op0! pointer-events-none'" @click="toTop()">
      <div i-ri-arrow-up-line />
    </button>
    <nav class="nav">
      <RouterLink class="w-12 h-12 absolute xl:fixed m-5 select-none outline-none" to="/" focusable="false">
        <Logo />
      </RouterLink>
      <div class="spacer" />
      <div class="right" print:op0>
        <RouterLink to="/expertise" title="Expertise">
          <span class="lt-md:hidden">Expertise</span>
          <div i-ri-lightbulb-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/experience" title="Experience">
          <span class="lt-md:hidden">Experience</span>
          <div i-material-symbols:work-outline class="md:hidden" />
        </RouterLink>
        <RouterLink to="/blog" title="Blog">
          <span class="lt-md:hidden">Blog</span>
          <div i-ri-article-line md:hidden />
        </RouterLink>
        <!-- <RouterLink to="/demos" title="Demos">
          <span class="lt-md:hidden">Demos</span>
          <div i-ri-screenshot-line class="md:hidden" />
        </RouterLink> -->
        <RouterLink to="/chat" title="Let's Chat">
          <div i-ri-chat-1-line />
        </RouterLink>
        <RouterLink to="/giving-talks" title="Giving Talks">
          <div i-carbon:user-speaker />
        </RouterLink>
        <a href="https://www.linkedin.com/in/dfmichelangelo/" target="_blank" title="Linkedin" class="lt-md:hidden">
          <div i-uil-linkedin-alt />
        </a>
        <a href="https://github.com/dfmichelangelo" target="_blank" title="GitHub" class="lt-md:hidden">
          <div i-uil-github-alt />
        </a>
        <toggle-theme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}

.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav>* {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right>* {
  margin: auto;
}
</style>
