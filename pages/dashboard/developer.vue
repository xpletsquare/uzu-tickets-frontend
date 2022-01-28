<template>
  <div class="container">
    <!-- <div class="developer">
      <div>
        <h3>Developer</h3>

        <p>
          Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
        </p>
      </div>
      <div class="btn">
        <primary-button label="GENERATE KEY"></primary-button>
      </div>
    </div> -->

    <!-- <div class="api-key">
      <div>
        <h4>API KEY</h4>
        <p>7348737347384EGEGY737734</p>
      </div>

      <span class="icon">
        <i class="far fa-clone"></i>
      </span>
    </div> -->

    <div class="documentation">
      <h4>
        Uzu tickets Integration
        <span class="icon">
          <i class="far fa-paper-plane"></i>
          <!-- <fa icon="paper-plane" /> -->
        </span>
      </h4>

      <p>If you already own a website and want to sell tickets directly from your website and retain your web traffic, you can do that with our white label solution. 
      </p>
      <p>
        Each event has a unique event ID, from the dropdown below, select the prefered event and the code section will be updated accordingly
      </p>

      
    </div>

     <p>
        On your header or script file, import our CDN to your codebase so your webapp can estabish a connection with our white labeling server.
      </p>


      <h3> Select event</h3>
       <div class="md:w-2/4 mt-4 border rounded border-gray-500">
        <multiselect
          v-model="formFields.category"
          :options="events"
          :show-labels="false"
          placeholder="Select Event"
        ></multiselect>
      </div>

    <div class="codebase">
        <pre>
        <code v-highlight class="HTML code-inner">
          	&lt;script src="https://cdn.jsdelivr.net/gh/kenovienadu/uzu-ticket-payment/main-2.js"&gt;&lt;/script&gt;
        </code>
      </pre>
    </div>
    <!-- end of codebase section -->

     <p>
        In your Event page, inside your body tag, create a Buy ticket button for the specific event. In the Button element, add  <code class="thecode">id="but"</code> attribute.
      </p>
    

       <div class="codebase">
        <pre>
        <code v-highlight class="HTML code-inner">
          	&lt;button class="bg-gray-800 text-gray-50 p-3 rounded" id="buy"&gt;Buy Ticket&lt;/button&gt;
        </code>
      </pre>
    </div>
    <!-- end of codebase section -->

 
      <p>
        In your script tag, Add the following code.
      </p>

       <div class="codebase">
        <pre>
        <code v-highlight class="javascript code-inner">
          const uzuEvent = new UzuEvent("635e15aa-8dd2-4372-a024-fb2dad542c5a"); // Sample valid event id

			    document.querySelector("#buy").addEventListener("click", () => {
				    uzuEvent.open(); // Open Ticket Payment Modal (takes a few seconds to load up though)
			    });
        </code>
      </pre>
    </div>
    <!-- end of codebase section -->



    <h3>
        Full Code
      </h3>

       <div class="codebase">
        <pre>
        <code v-highlight class="HTML code-inner">
          &lt;body class="pt-20 flex justify-center items-center"&gt;
            &lt;button class="bg-gray-800 text-gray-50 p-3 rounded" id="buy">Buy Ticket&lt;/button&gt;

            &lt;script src="https://cdn.jsdelivr.net/gh/kenovienadu/uzu-ticket-payment/main-2.js"&gt;&lt;/script&gt;

            &lt;script&gt;
              const uzuEvent = new UzuEvent("635e15aa-8dd2-4372-a024-fb2dad542c5a"); // Sample valid event id

              document.querySelector("#buy").addEventListener("click", () => {
                uzuEvent.open(); // Open Ticket Payment Modal (takes a few seconds to load up though)
              });
            &lt;/script&gt;
            &lt;/body&gt;
			    });
        </code>
      </pre>
    </div>
    <!-- end of codebase section -->

    <h2>Help</h2>

    <p>
        If you have any difficulies implementing Uzu tickets on website, feel free to contact our technical support team via email at tech@uzutickets.com.
    </p>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Multiselect from 'vue-multiselect';
import { EventDetailsFull } from '~/common/models/interfaces';

@Component({
  layout: 'dashboard',
  components: { 
    Multiselect 
  },

  
})




export default class DeveloperPage extends Vue {
    @Prop() eventDetails!: EventDetailsFull

  disabled = false

  selectValue: string = ''
  events: string[] = ['First Event', 'Second event', 'Last']
  tag: string = ''

  formFields: Partial<EventDetailsFull> = {
    title: '',
    category: '',
    tags: [],
    // tags: ['category 1', 'category 2', 'category 3'],
    location: '',
    id: ''
  }
}
</script>

<style  lang="scss" scoped>

h2{
  font-size: 20pt;
}
.thecode{
  display: inline-block;
  color: rgb(88, 88, 88);
  background-color: rgb(246, 246, 246);
  font-size: 9pt;
  padding: 2px 6px;
  margin: 0 5px;
  border-radius: 2px;
}

.code-inner{
  border-radius: 5px !important;
  /* padding: 10px !important; */
  flex-wrap: wrap !important;
  overflow: auto !important;
  /* padding: 20px !important; */
  tab-size: 2 !important;
  max-height: max-content;
  margin: 0px !important;
  /* display: flex !important; */
}

.container {
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 90%;
  }

@media (max-width: 1300px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }

  .developer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin: 2rem 0;

    h3 {
      font-size: 24px;
      font-weight: bold;
    }

    p {
      font-size: 12px;
      font-weight: normal;
      color: var(--grey);
    }

    .btn button {
      min-width: 170px;
    }
  }

  .api-key {
    border: 1px solid #15b743;
    border-radius: 10px;
    background-color: var(--pale-green);
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem 0;

    h4 {
      font-size: 12px;
      font-weight: bold;
      color: #0a0d0b;
    }

    p {
      font-size: 14px;
      font-weight: bold;
      color: #15b743;
    }

    .icon {
      cursor: pointer;
      color: #15b743;
      font-size: 20px;
    }
  }

  .documentation {
    margin: 2rem 0;

    h4 {
      color: var(--dark-grey);
      font-size: 24px;
      display: flex;
      align-items: center;
      gap: 1rem;

      .icon {
        cursor: pointer;
        color: #15b743;
        font-size: 16px;
      }
    }

    p {
      font-size: 12px;
      color: #0a0d0b;
      width: 70%;
    }
  }
}
</style>