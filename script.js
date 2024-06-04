// Espera o documento estar totalmente carregado
document.addEventListener("DOMContentLoaded", function() {
    const totalImages = 50; // Total de imagens
    const imagesPerPage = 15; // Imagens por página
    const totalPages = Math.ceil(totalImages / imagesPerPage); // Total de páginas

    // Função para criar links para as subpáginas
    const createSubpageLinks = () => {
        const subpagesContainer = document.querySelector('.subpages');
        for (let i = 1; i <= totalPages; i++) {
            const link = document.createElement('a');
            link.href = `gallery${i}.html`;
            link.textContent = `Galeria ${i}`;
            subpagesContainer.appendChild(link);
        }
    };

    // Função para criar galerias de imagens nas subpáginas
    const createGallery = (page) => {
        const gallery = document.querySelector('.gallery');
        const start = (page - 1) * imagesPerPage + 1;
        const end = Math.min(start + imagesPerPage - 1, totalImages);

        for (let i = start; i <= end; i++) {
            const img = document.createElement('img');
            img.src = `images/photo${i}.jpg`;
            img.alt = `Portfolio Image ${i}`;
            img.classList.add('gallery-image');
            img.addEventListener('click', () => showFullscreen(img.src));
            gallery.appendChild(img);
        }

        // Configurar navegação entre as fotos
        setupNavigation(page);
    };

    // Função para mostrar a imagem em tela cheia
    const showFullscreen = (src) => {
        const fullscreen = document.querySelector('.fullscreen');
        const fullscreenImg = fullscreen.querySelector('img');
        fullscreenImg.src = src;
        fullscreen.style.display = 'flex';
    };

    // Função para esconder a imagem em tela cheia
    const hideFullscreen = () => {
        const fullscreen = document.querySelector('.fullscreen');
        fullscreen.style.display = 'none';
    };

    // Função para configurar a navegação entre as fotos
    const setupNavigation = (page) => {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const nextGalleryBtn = document.getElementById('next-gallery-btn');

        prevBtn.style.display = page > 1 ? 'block' : 'none';
        nextBtn.style.display = page < totalPages ? 'block' : 'none';
        nextGalleryBtn.style.display = page === totalPages ? 'block' : 'none';

        prevBtn.addEventListener('click', () => {
            window.location.href = `gallery${page - 1}.html`;
        });

        nextBtn.addEventListener('click', () => {
            window.location.href = `gallery${page + 1}.html`;
        });

        nextGalleryBtn.addEventListener('click', () => {
            alert('Trocar para a próxima galeria');
            // Implementar a lógica para trocar para a próxima galeria
        });
    };

    // Verifica se estamos na página principal ou em uma subpágina
    const url = new URL(window.location.href);
    const page = url.pathname.match(/gallery(\d+)\.html/);

    if (page) {
        // Estamos em uma subpágina
        createGallery(Number(page[1]));
    } else if (document.querySelector('.subpages')) {
        // Estamos na página galeria
        createSubpageLinks();
    }

    // Configura o evento para esconder a imagem em tela cheia
    document.querySelector('.fullscreen').addEventListener('click', hideFullscreen);
});
