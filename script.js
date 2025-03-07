// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Start animations for skill bars after page loads
            animateSkillBars();
        }, 1500);
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animate skill bars when in viewport
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, we'll just log it and show a success message
            console.log({ name, email, subject, message });
            
            // Reset form
            contactForm.reset();
            
            // Show success message (you could create a better UI for this)
            alert('Tin nhắn của bạn đã được gửi thành công!');
        });
    }
    
    // Three.js background
    initThreeJS();
});

// Three.js initialization
function initThreeJS() {
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('bg'),
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: 0x6c63ff,
        transparent: true,
        opacity: 0.8
    });
    
    // Create points
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add some colored lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x6c63ff, 1);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff9000, 1);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);
    
    // Create floating objects
    const geometry1 = new THREE.TorusGeometry(10, 3, 16, 100);
    const material1 = new THREE.MeshStandardMaterial({ 
        color: 0x6c63ff,
        wireframe: true
    });
    const torus = new THREE.Mesh(geometry1, material1);
    torus.position.set(30, 0, -60);
    scene.add(torus);
    
    const geometry2 = new THREE.OctahedronGeometry(8, 0);
    const material2 = new THREE.MeshStandardMaterial({ 
        color: 0xff9000,
        wireframe: true
    });
    const octahedron = new THREE.Mesh(geometry2, material2);
    octahedron.position.set(-30, -10, -50);
    scene.add(octahedron);
    
    const geometry3 = new THREE.IcosahedronGeometry(15, 0);
    const material3 = new THREE.MeshStandardMaterial({ 
        color: 0x00ffff,
        wireframe: true
    });
    const icosahedron = new THREE.Mesh(geometry3, material3);
    icosahedron.position.set(0, 30, -100);
    scene.add(icosahedron);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - window.innerWidth / 2) / 100;
        mouseY = (event.clientY - window.innerHeight / 2) / 100;
    }
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate objects
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;
        
        octahedron.rotation.x -= 0.007;
        octahedron.rotation.y -= 0.01;
        
        icosahedron.rotation.x += 0.003;
        icosahedron.rotation.z += 0.005;
        
        // Rotate particles
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        // Move scene based on mouse position
        particlesMesh.position.x = mouseX * 0.1;
        particlesMesh.position.y = -mouseY * 0.1;
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    animate();
}