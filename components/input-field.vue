<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class InputField extends Vue{

}

</script>

<template>
  <div class="no-error">
      <label class="main-input ">
       <span class="secondary-label"> </span>

       <input type="text"/>
       <span class="primary-label"> Email</span>
      </label>

      <div class="error holder">
        <div class="error-label"> Some error message</div>
      </div>
  </div>
</template>


<style lang="scss" scoped>
  .main-input{
    width: 100%;
    position: relative;
  }

  .no-error{
    .error-label{
      visibility: hidden !important;
    }
  }
  
  

  input{
    width: 100%;
    border: 1px solid var(--grey);
    min-height: 45px;
    padding: 0 15px;
    border-radius: 2.5px;

  }

   input:focus{
      outline: none;
      border: 2px solid var(--light-green);
      
    }

   input:focus ~ .primary-label{
     color: var(--light-green);
     background-color: var(--white);
     transform: translateY(-100%);
     padding: 0 5px;
     font-size: var(--tiny);
      
    }

    .primary-label{
      position: absolute;
      left: 15px;
      bottom: 0px;
    }

  

  /* show error */
   .error{
      .error-label{
        display: flex !important;
        color: var(--red);
        font-size: var(--tiny);
      }

      input{
        border: 1px solid var(--red) !important;
      }
    }
</style>
