// Subtle fade-in animation on load
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 10);
    
    // Animated greeting swap with multiple languages (top 15 most spoken)
    const greetingElement = document.querySelector('.greeting');
    if (greetingElement) {
        const greetings = [
            'Hi,',           // 1. English
            '你好，',         // 2. Mandarin Chinese
            'नमस्ते,',        // 3. Hindi
            'Hola,',         // 4. Spanish
            'Bonjour,',      // 5. French
            'مرحبا،',        // 6. Arabic
            'হ্যালো,',       // 7. Bengali
            'Olá,',          // 8. Portuguese
            'Привет,',       // 9. Russian
            'ہیلو،',         // 10. Urdu
            'Halo,',         // 11. Indonesian
            'Hallo,',        // 12. German
            'こんにちは，',    // 13. Japanese
            'Hujambo,',      // 14. Swahili
            'Merhaba,',      // 15. Turkish
        ];
        let currentIndex = 0;
        
        const swapGreeting = () => {
            greetingElement.style.opacity = '0';
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % greetings.length;
                greetingElement.textContent = greetings[currentIndex];
                // Set lang attribute for proper font selection
                const langMap = {
                    'Hi,': 'en',
                    '你好，': 'zh',
                    'नमस्ते,': 'hi',
                    'Hola,': 'es',
                    'Bonjour,': 'fr',
                    'مرحبا،': 'ar',
                    'হ্যালো,': 'bn',
                    'Olá,': 'pt',
                    'Привет,': 'ru',
                    'ہیلو،': 'ur',
                    'Halo,': 'id',
                    'Hallo,': 'de',
                    'こんにちは，': 'ja',
                    'Hujambo,': 'sw',
                    'Merhaba,': 'tr'
                };
                greetingElement.setAttribute('lang', langMap[greetings[currentIndex]] || 'en');
                greetingElement.style.opacity = '1';
            }, 300);
        };
        
        // Set initial lang attribute
        greetingElement.setAttribute('lang', 'en');
        
        // Start swapping every 3.5 seconds
        setInterval(swapGreeting, 3500);
    }
    
    // Animated shape morphing with smooth transitions
    const shapePath = document.querySelector('.shape-path');
    if (shapePath) {
        const getThemeColor = () => {
            const linkColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--color-link-p3')
                .trim() || getComputedStyle(document.documentElement)
                .getPropertyValue('--color-link')
                .trim();
            return linkColor;
        };
        
        // Update gradient colors
        const updateGradient = () => {
            const gradientStops = document.querySelectorAll('.gradient-stop-1, .gradient-stop-2');
            const themeColor = getThemeColor();
            const hoverColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--color-link-hover')
                .trim();
            
            gradientStops.forEach((stop, index) => {
                if (stop.classList.contains('gradient-stop-1')) {
                    stop.setAttribute('stop-color', themeColor);
                } else if (stop.classList.contains('gradient-stop-2')) {
                    stop.setAttribute('stop-color', hoverColor);
                }
            });
        };
        
        // Set initial gradient colors
        updateGradient();
        
        // Three shapes with more vertices for smoother morphing (16 points each)
        const shapes = [
            // Triangle (16 points - proper triangle shape)
            'M50,15 L58,25 L65,35 L70,45 L72,55 L73,65 L72,70 L68,75 L60,78 L50,80 L40,78 L32,75 L28,70 L27,65 L28,55 L30,45 L35,35 L42,25 Z',
            // Square (16 points - proper square)
            'M15,15 L28,15 L40,15 L50,15 L60,15 L72,15 L85,15 L85,28 L85,40 L85,50 L85,60 L85,72 L85,85 L72,85 L60,85 L50,85 L40,85 L28,85 L15,85 L15,72 L15,60 L15,50 L15,40 L15,28 Z',
            // Circle (16 points - proper circle)
            'M50,10 L62,11 L72,15 L80,21 L85,30 L88,40 L88,50 L88,60 L85,70 L80,79 L72,85 L62,89 L50,90 L38,89 L28,85 L20,79 L15,70 L12,60 L12,50 L12,40 L15,30 L20,21 L28,15 L38,11 Z',
        ];
        
        // Set initial shape to triangle immediately
        shapePath.setAttribute('d', shapes[0]);
        
        let currentShapeIndex = 0;
        
        // Simple path interpolation for morphing
        const parsePath = (pathString) => {
            // Extract all coordinates as numbers
            const coords = pathString.match(/[\d.]+/g).map(Number);
            return coords;
        };
        
        const interpolatePaths = (path1, path2, progress) => {
            const coords1 = parsePath(path1);
            const coords2 = parsePath(path2);
            
            if (coords1.length !== coords2.length) {
                return path2; // Fallback if structures don't match
            }
            
            // Interpolate each coordinate pair
            const interpolated = coords1.map((val, i) => {
                return val + (coords2[i] - val) * progress;
            });
            
            // Reconstruct path - all shapes use M + 15 L commands + Z (16 points total)
            let result = `M${interpolated[0]},${interpolated[1]} `;
            for (let i = 2; i < interpolated.length; i += 2) {
                result += `L${interpolated[i]},${interpolated[i + 1]} `;
            }
            result += 'Z';
            
            return result;
        };
        
        const morphShape = () => {
            if (isMorphing) return;
            isMorphing = true;
            
            const nextIndex = (currentShapeIndex + 1) % shapes.length;
            const startPath = shapes[currentShapeIndex];
            const endPath = shapes[nextIndex];
            
            shapePath.classList.add('morphing');
            
            // Smooth morphing animation with enhanced easing
            const duration = 1500; // 1.5 seconds
            const startTime = performance.now();
            
            // Custom easing function for smooth, natural morphing
            const easeInOutCubic = (t) => {
                return t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
            };
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Use smooth easing for natural morphing
                const eased = easeInOutCubic(progress);
                
                try {
                    const morphedPath = interpolatePaths(startPath, endPath, eased);
                    shapePath.setAttribute('d', morphedPath);
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        shapePath.setAttribute('d', endPath);
                        shapePath.classList.remove('morphing');
                        currentShapeIndex = nextIndex;
                        isMorphing = false;
                    }
                } catch (e) {
                    // Fallback to instant change if morphing fails
                    shapePath.setAttribute('d', endPath);
                    shapePath.classList.remove('morphing');
                    currentShapeIndex = nextIndex;
                    isMorphing = false;
                }
            };
            
            requestAnimationFrame(animate);
        };
        
        // Initial morph after 10 seconds
        setTimeout(() => {
            morphShape();
        }, 10000);
        
        // Then morph every 10 seconds
        setInterval(morphShape, 10000);
        
        // Update gradient colors when theme changes
        const observer = new MutationObserver(() => {
            updateGradient();
        });
        
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
});
