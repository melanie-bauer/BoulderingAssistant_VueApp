
<template>
  <div class="container">
    <div class="row small-mb">
      <h4 class="colored-bot-b">General Project Information</h4>
    </div>
    <div class="row col-11">
      <span class="text large-mb text-align-justify">
Our team of four students from HTL Leonding has created the Bouldering Assistant to improve the climbing experience for visually impaired individuals. This innovative device utilizes advanced technology to ensure safer and more enjoyable climbing sessions.
      </span>
    </div>
    <div class="row  small-mb text-align-right">
      <h4 class="colored-bot-b">Functionality</h4>
    </div>
    <div class="row d-flex justify-content-end">
      <span class="text large-mb text-align-justify col-11">
The Bouldering Assistant utilizes a Raspberry Pi placed at the base. Through a dedicated website accessible on a mobile phone, supervisors can select grips for climbers via live camera feed. Using OpenCV-powered body tracking, the Raspberry Pi determines grip locations relative to the climber's limbs and provides automated instructions via bone conduction headphones.
      </span>
    </div>
    <div class="row  small-mb">
      <h4 class="colored-bot-b">Reason behind the Project</h4>
    </div>
    <div class="row col-11">
      <span class="text large-mb text-align-justify">
Our goal in developing the Bouldering Assistant was to promote inclusivity and accessibility in sports. By harnessing technology, we empower visually impaired individuals to participate in bouldering confidently and independently. This project not only fosters inclusivity within the climbing community but also showcases the transformative impact of technology on enhancing the lives of people with disabilities.

    </span>
    </div>

</div>
</template>


<style scoped>
.container{
  padding-bottom: 0 !important;
}
.text-align-right {
  text-align: right;
}

.text-align-justify {
  text-align: justify;
}

h4 {
  margin-bottom: 0;
}

.colored-bot-b {
  border-bottom: 1.5px var(--primary) solid;
}


</style>