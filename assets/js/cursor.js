document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    const style = document.createElement('style');
    style.innerHTML = `
        body, a, button, input {
            cursor: none !important;
        }

        #custom-cursor {
            position: fixed;
            top: 0;
            left: 0;
            width: 32px; /* Ajuste la largeur de ton image si besoin */
            height: 32px; /* Ajuste la hauteur */
            background-image: url('assets/img/souris/pointeur.png'); /* Image par défaut */
            background-size: contain;
            background-repeat: no-repeat;
            pointer-events: none; /* Empêche le curseur de bloquer les clics */
            z-index: 999999;
            /* Ajuste le décalage (translate) selon l'emplacement de la pointe de ton image */
            transform: translate(-2px, -2px); 
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    const interactives = document.querySelectorAll('a, button, input, [role="button"], .interactive');

    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.backgroundImage = "url('/assets/img/souris/main.png')";
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.backgroundImage = "url('/assets/img/souris/pointeur.png')";
        });
    });
});