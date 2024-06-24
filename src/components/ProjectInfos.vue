<script>
import TextBox from "@/components/TextBox.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {TextBox}
})

</script>
<template>
  <div class="container d-flex flex-column flex-lg-row flex-wrap">
    <TextBox title="Generelle Projektinfomationen">Unser Team von vier Schülern der HTL Leonding hat den Boulder-Assistenten entwickelt, um das Klettern
      für sehbehinderte Menschen zu verbessern. Dieses innovative Gerät nutzt fortschrittliche Technologie, um
      sicherere und angenehmere Klettersitzungen zu gewährleisten.</TextBox>
    <TextBox title="Funktionalität">Der Boulder-Assistent verwendet einen Raspberry Pi, der am Boden hingestellt wird. Über eine spezielle Website, die über ein
      Smartphone zugänglich ist, können die Betreuer die Griffe für die Kletterer über eine Live-Kamera auswählen. Der Raspberry Pi bestimmt die Position der Griffe im Verhältnis zu den Gliedmaßen des Kletterers und gibt automatisch
      Anweisungen über Knochenschallkopfhörer.</TextBox>
    <TextBox title="Hintergrund">Unser Ziel bei der Entwicklung des Boulder-Assistenten war es, Inklusion und Barrierefreiheit im Sport zu fördern. Durch
      Technologie befähigen wir sehbehinderte Menschen, selbstbewusst und unabhängig am Bouldern teilzunehmen.
      Dieses Projekt fördert nicht nur die Inklusion innerhalb der Klettergemeinschaft, sondern zeigt auch die
      die transformative Wirkung von Technologie auf das Lebens von Menschen mit Behinderungen.</TextBox>
  </div>
</template>

<style scoped>
.container {
  padding: var(--spacing-m);
}


</style>
 