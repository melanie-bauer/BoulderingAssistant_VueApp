<script>
import TextBox from "@/components/TextBox.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {TextBox}
})

</script>
<template>
  <div class="container d-flex flex-column flex-lg-row flex-wrap">
    <TextBox title="General Project Information">Our team of four students from HTL Leonding has created the Bouldering Assistant to improve the climbing
      experience for visually impaired individuals. This innovative device utilizes advanced technology to ensure
      safer and more enjoyable climbing sessions.</TextBox>
    <TextBox title="Functionality">The Bouldering Assistant utilizes a Raspberry Pi placed at the base. Through a dedicated website accessible on a
      mobile phone, supervisors can select grips for climbers via live camera feed. The Raspberry Pi determines grip locations relative to the climber's limbs and provides automated
      instructions via bone conduction headphones.</TextBox>
    <TextBox title="Reasons behind the Project">Our goal in developing the Bouldering Assistant was to promote inclusivity and accessibility in sports. By
      harnessing technology, we empower visually impaired individuals to participate in bouldering confidently and
      independently. This project not only fosters inclusivity within the climbing community but also showcases the
      transformative impact of technology on enhancing the lives of people with disabilities.</TextBox>
  </div>
</template>

<style scoped>
.container {
  padding: var(--spacing-m);
}


</style>
 