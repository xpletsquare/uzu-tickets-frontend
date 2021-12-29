<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class InputField extends Vue{
  @Prop() label? : string ;
  @Prop() error_message? : string ;
  @Prop() disabled? : boolean ;
  @Prop() type? : string ;
  @Prop() defaultValue!: string;

  value = '';

  get isEmpty(){
    return this.value.length === 0
  }

  mounted() {
    this.value = this.defaultValue || ''; 
  }

  onInputChange(){
    this.$emit('change', this.value);
    this.$emit('update:value', this.value);
  }

}

</script>

<template>
  <div class="no-error input-item">
      <label class="main-input ">
       <span class="secondary-label"> </span>

       <input v-model="value" :type="type ? type : 'text'" @keyup="onInputChange"/>
       <span :class="isEmpty ? 'primary-label' : 'primary-label active'"> {{ label }}</span>
      </label>

      <div class="error holder">
        <div class="error-label"> {{ error_message }}</div>
      </div>

      <!-- <p>{{message}}</p> -->
      <!-- <p>{{isEmpty + ""}}</p> -->
  </div>
</template>


<style lang="scss" scoped>
  .main-input{
    display: block;
    width: 100%;
    position: relative;
    margin: 10px 0px;
    
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
    transform: translateY(-120%);
     padding: 0 5px;
     font-size: var(--tiny);
    }

    .primary-label{
      position: absolute;
      left: 15px;
      bottom: 10px;
    }

    .active{
        color: var(--light-green);
        background-color: var(--white);
        transform: translateY(-120%);
        padding: 0 5px;
        font-size: var(--tiny);
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
