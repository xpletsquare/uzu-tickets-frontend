<template>
  <div class="footer">
    <div class="wrapper">
      <div class="inner flex md:flex-row flex-col items-end md:gap-40 gap-20 border-b-[0.2px] border-[#062a35] pb-10">
        <div class="footer-left md:w-2/3 w-full">
          <div class="logo">
            <NuxtLink to="/">
              <img class="md:w-20 h-auto md:inline-block" alt="logo" src="~/assets/images/logo-white.svg" />
            </NuxtLink>
          </div>

          <p class="about my-10 text-white">
            creating a seamless ticketing experience for African event managers and attendees
          </p>

          <ul class="footer-links mt-5">
            <li class="hover:text-red">
              <NuxtLink to="/">CHANGELOG</NuxtLink>
            </li>
            <li class="hover:text-red">
              <NuxtLink to="/">FAQ</NuxtLink>
            </li>

            <li>
              <NuxtLink to="/terms-and-conditions">TERMS OF SERVICE</NuxtLink>
            </li>

            <li>
              <NuxtLink to="/about">MEET US</NuxtLink>
            </li>

            <li>
              <NuxtLink to="/pricing">PRICING</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="footer-right md:w-1/3 w-full">
          <h4 class="text-white my-5">Follow us on socials</h4>

          <ul class="footer-socials">
            <li>
              <a href="https://twitter.com/uzu_ticket" target="_blank"><fa :icon="['fab', 'twitter']" /></a>
            </li>

            <li>
              <a href="https://instagram.com/uzu_ticket" target="_blank"><fa :icon="['fab', 'instagram']" /></a>
            </li>
            <li>
              <a href="https://www.facebook.com/uzuticket" target="_blank"><fa :icon="['fab', 'facebook-f']" /></a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/uzu-ticket" target="_blank"
                ><fa :icon="['fab', 'linkedin']"
              /></a>
            </li>
            <!-- <li>
              <NuxtLink to="/"><fa :icon="['fab', 'linkedin']" /></NuxtLink>
            </li> -->
          </ul>
        </div>
      </div>

      <p class="text-[#3fd246] my-10">Copyright © Uzu Ticket {{ year }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {
  d = new Date()
  year = this.d.getUTCFullYear()
  mounted() {}
}
</script>

<style lang="scss" scoped>
.footer {
  background-color: #03161c;
  width: 100%;
  padding: 55px auto;

  .wrapper {
    width: 70%;

    justify-content: space-between;
    align-items: center;
    margin: 0px auto;
    gap: 2rem;
    padding: 55px 0px;

    @media (max-width: 1024px) {
      width: 90%;
    }

    @media (max-width: 568px) {
      flex-direction: column;
      padding: 30px 0;
    }
  }

  .footer-links {
    display: flex;
    align-items: start;
    gap: 30px;

    @media (max-width: 568px) {
      justify-content: space-evenly;
      flex-direction: column;
    }

    li {
      padding: 0px 0px;

      :hover {
        color: #3fd246 !important;
      }

      @media (max-width: 768px) {
        padding: 0 0px;
      }

      a {
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 500;
        color: #f1f1f1;

        @media (max-width: 768px) {
          font-size: 12px;
        }
      }
    }
  }

  .footer-socials {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    li {
      padding: 0px 10px;
      :hover {
        color: #3fd246 !important;
      }

      a {
        text-transform: uppercase;
        font-size: 22px;
        font-weight: bold;
        color: #f1f1f1;

        @media (max-width: 768px) {
          font-size: 15px;
        }
      }
    }
  }
}
</style>
