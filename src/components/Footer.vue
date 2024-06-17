<script>
import { ref } from 'vue'
import Footer from "../components/Footer.vue";
</script>

<template>
    <footer class="footer label">
    <div class="footer-content text">
        <p>&copy; 2024 Bouldering Assistant. All rights reserved.</p>
        <p><a href="/impressum">Impressum</a></p>
    </div>
</footer>
</template>


<style scoped>
.footer {
    margin-top: 2rem;
    padding: 1rem 0;
    text-align: center;
    border-top: 1px solid var(--primary);
}

.footer-content p {
    margin: 0.5rem 0;
}

.footer-content a {
    color: var(--primary);
    text-decoration: none;
}

.footer-content a:hover {
    text-decoration: underline;    
}
</style>
