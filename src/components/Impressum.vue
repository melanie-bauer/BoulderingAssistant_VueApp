<template>
    <RouterLink to="/" class="button d-flex align-items-center">
        <img class="img" src="@/assets/images/home.png">
    </RouterLink>

    <div class="container">
        <div class="impressum">
            <h2>Impressum</h2>
            <p><strong>Verantwortlich für den Inhalt:</strong></p>
            <p>Melanie Bauer</p>
            <p>Elysee Mbala</p>
            <p>Jacob Mayrwöger</p>
            <p>Maximilian Neumayer</p>

            <h6>Kontakt:</h6>
            <p>Telefon: +43 677 99011046</p>
            <p>Email: <a href="">m.bauer1@students.htl-leonding.ac.at</a></p>

        </div>
    </div>
</template>

<style scoped>
.container {
    min-height: 100vh !important;
    max-height: 100vh;
    padding: 60px 30px 0px 25px;
    overflow: hidden;
}

.img {
    filter: brightness(0) saturate(100%) invert(100%) sepia(4%) saturate(0%) hue-rotate(31deg) brightness(107%) contrast(105%);
    max-height: 40px;
    max-width: 40px;
    padding-bottom: 5px;
    margin-right: 5px;
}

.button {
    font-size: 32px;
    font-weight: bold;
    text-decoration: none;
    color: var(--text);
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 100;
}

.impressum {
    margin: 2rem;
    padding: 0.5rem;
}

.impressum h2 {
    margin-bottom: 1.4rem;
}

.impressum h6 {
    margin-top: 2rem;
}

.impressum p {
    margin: 0.5rem 0;
}
</style>