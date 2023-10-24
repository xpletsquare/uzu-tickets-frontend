<template>
    <div class="">
        <navbar />
        <section class="dual-background-section">
            <div class="centered-div">
                <h1 class="headline">See our<br /> pricing model</h1>
                <p class="centered-text">Who says it has to be 5? We do four days of full productivity and finish expected deliverables with no adjustments, theWho says it has to be 5? We do four days of full productivity and finish expected deliverables with no adjustments, the</p>
                <span class="big-span">7.5% + ₦100</span>
                <button class="custom-button"><span class="custombutton-text">Capped at ₦4,999</span></button>
            </div>
            <div class="pricing-table">
                <PricingTable :items="tableItems" />
            </div>
        </section>
        <div class="see-pricing">
            <div >
                <p class="see-pricing2">See our <br /> pricing model</p>
                <p class="see-pricing-text">Who says it has to be 5? We do four days of full productivity and finish expected deliverables with no adjustments, theWho says it has to be 5? We do four days of full productivity and finish expected deliverables with no adjustments, the</p>
            </div>
            <div class="second-table">
                <PricingTable :items="tableItems" :darkMode="true" :checkmarkSrc="darkCheckmarkSrc"/>
            </div>
        </div>
        <div style="background-color: #03161C; color: #fff;">
            <div class="events">
                <div class="event-text">
                    <p style="font-weight: 600;font-size: 36px; line-height: 53.13px; color: #DADADA;">Top 5 must attend<br /> events in <span style="color: #3FD246;">Lagos</span></p>
                    <p style="font-weight: 500;font-size: 16px; line-height: 30px; color: #DADADA;">The marketing masterclass 2.0</p>
                    <p style="font-weight: 500;font-size: 16px; line-height: 30px; color: #3FD246;">Tickets from NGN 30,000</p>
                    <p style="font-weight: 500;font-size: 16px; line-height: 30px; color: #DADADA;">Feb 25, 2023  06:45 PM</p>
                    <primary-button class="w-1/2" label="Buy ticket"></primary-button>
                </div>
                <div>
                    <Slider :images="sliderImages" />
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import PricingTable from '~/components/PricingTable.vue';
    import Slider from '~/components/Slider.vue';
    export default {
        components: {
            PricingTable,
            Slider,
        },
        data() {
            return {
            tableItems: ["Transfers of NGN 5,000 and below", "Transfers of NGN 5,000 and below", "Transfers of NGN 5,000 and below", "Transfers of NGN 5,000 and below", "Transfers of NGN 5,000 and below"],
            darkCheckmarkSrc: require("~/assets/images/darkgreencheck.png"),
            sliderImages: [
                { src: require('~/assets/images/image1.png')},
                { src: require('~/assets/images/image1.png')},
                { src: require('~/assets/images/image1.png')},
                { src: require('~/assets/images/image1.png')},
                { src: require('~/assets/images/image1.png')},
            ],
            };
        },
    };
</script>

<style>
    .dual-background-section {
    background-image: url('~assets/images/pricing-background-left.svg'), url('~assets/images/pricing-background-right.svg');
    background-position: left, right; 
    background-repeat: no-repeat;
    background-size: auto; 
    }
    .centered-div {
        max-width: 700px;
        height: auto;
        width: 100%;
        z-index: 1;
        display: grid;
        margin: 0 auto;
        padding: 40px 32px;
        text-align: center;
        font-weight: 500;
    }
    .headline {
        color: #03161C;
        font-weight: 600;
        font-size: 58px;
        line-height: 66.99px;
    }
    .centered-text {
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        width: 600px;
    }
    .big-span{
        font-size: 90px;
        font-weight: 600;
        line-height: 127px;
        letter-spacing: 0em;
        text-align: center;
        color: #3FD246;
        margin: 20px;
    }
    .custom-button {
        width: 311px;
        height: 68px;
        padding: 18px 29px;
        border-radius: 65px;
        border: 2px solid #06BA6B; 
        background-color: #3FD24614;
        justify-self: center;
    }
    .custombutton-text {
        font-weight: 500;
        font-size: 28px;
        text-align: center;
        line-height: 32.34px;
        color: #03161C;
    }
    .pricing-table {
        padding: 20%;
        padding-top: 0;
        padding-bottom: 2%;
    }
    .second-table {
        width: auto;
        height: auto;
        border-radius: 16px;
        background-color: #03161C;
        color: #fff;
        padding: 30px;
    }
    .see-pricing{
        display: grid;
        grid-template-columns: 1fr 1fr; /* Two equal columns */
        grid-gap: 10px;
        margin: 10%;
        align-items: center;
    }
    .events {
        display: flex;
        padding: 10%;
        justify-content: space-between;
    }
    .see-pricing2{
        font-weight: 600; 
        font-size: 58px;
        line-height: 66.99px;
        color: #03161C;
        width: 577px;
    }
    .see-pricing-text{
        font-weight: 500;
        line-height: 24px;
        font-size: 16px; 
        width: 615px;
    }
    @media (max-width: 1023px) {
    .desktop-only {
        display: none; /* Hide the section on smaller screens */
    }
    .headline {
        text-align: left; /* Hide the section on smaller screens */
        font-size: 30px;
        line-height: 42px;
    }
    .centered-text {
        text-align: left; /* Hide the section on smaller screens */
        width: auto;
    }
    .big-span {
        text-align: left; /* Hide the section on smaller screens */
        margin-left: 0;
        font-size: 40px;
        line-height: 60.41px;
    }
    .dual-background-section  {
        background-image: none; /* Hide the section on smaller screens */
    }
    .see-pricing{
        display: grid;
        grid-template-columns: 1fr; /* Two equal columns */
        grid-gap: 10px;
        margin: 5%;
        align-items: center;
    }
    .pricing-table {
        padding: 5%;
        padding-top: 0;
        padding-bottom: 2%;
    }
    .see-pricing2{
        font-size: 30px;
        line-height: 42px;
        color: #03161C;
        width: auto;
    }
    .see-pricing-text{
        font-weight: 400;
        line-height: 24px;
        font-size: 16px; 
        width: auto;
    }
    .second-table {
        width: auto;
        height: auto;
        border-radius: 16px;
        background-color: #03161C;
        color: #fff;
        padding: 30px;
    }
    .centered-div {
        padding: 40px 20px;
    }
    .events {
        display: grid;
        grid-template-columns: 1fr; /* Two equal columns */
        grid-gap: 20px;
        justify-content: space-between;
        padding: 0;
    }
    .event-text{
        margin: 5%;
    }
}
</style>
