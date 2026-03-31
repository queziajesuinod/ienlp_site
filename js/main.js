const navbar = document.getElementById('navbar');

        function updateFlashlight(e, card) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }

        function animateCounter(el) {
            const target = parseInt(el.dataset.counter || '0', 10);
            const duration = 1300;
            const startTime = performance.now();

            function tick(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(target * eased).toString();
                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            }

            requestAnimationFrame(tick);
        }

        document.addEventListener('DOMContentLoaded', () => {
            if (navbar) {
                requestAnimationFrame(() => navbar.classList.add('loaded'));
            }

            const heroTitle = document.getElementById('hero-title');
            const heroStatus = document.getElementById('hero-status');
            const heroDescription = document.getElementById('hero-description');
            const heroMediaLink = document.getElementById('hero-media-link');
            const heroMediaImage = document.getElementById('hero-media-image');
            const heroMediaKicker = document.getElementById('hero-media-kicker');
            const heroMediaTitle = document.getElementById('hero-media-title');
            const heroSideTitle = document.getElementById('hero-side-title');
            const heroSideDescription = document.getElementById('hero-side-description');
            const heroStat1Value = document.getElementById('hero-stat-1-value');
            const heroStat1Label = document.getElementById('hero-stat-1-label');
            const heroStat2Value = document.getElementById('hero-stat-2-value');
            const heroStat2Label = document.getElementById('hero-stat-2-label');
            const heroModelCards = document.querySelectorAll('[data-hero-model]');
            const slides = document.querySelectorAll('#hero-carousel .carousel-slide');
            let currentSlide = 0;
            let holdAutoSlideUntil = 0;

            const heroModels = {
                editorial: {
                    status: 'System v2.0 Live',
                    titleLines: [{
                            text: 'Design',
                            outline: true
                        },
                        {
                            text: 'Transparente',
                            outline: false
                        },
                        {
                            text: 'Em Branco',
                            outline: true
                        }
                    ],
                    description: 'Novo design system da IEN combinando base branca, lettering transparente, glow sutil e transicoes de surgimento em todas as dobras.',
                    mediaLink: 'images/fundo_tema_2025.jpg',
                    mediaImage: 'images/fundo_tema_2025.jpg',
                    mediaAlt: 'Editorial hero',
                    mediaKicker: 'IEN Editorial',
                    mediaTitle: 'FORM STORY',
                    sideTitle: 'Glow Interaction',
                    sideDescription: 'Gradiente radial guiado pelo cursor para profundidade sem perder a identidade clara.',
                    stat1Value: 'AA+',
                    stat1Label: 'Contraste',
                    stat2Value: 'v12',
                    stat2Label: 'Versao',
                    slideIndex: 0
                },
                cinematic: {
                    status: 'Cinematic Mode',
                    titleLines: [{
                            text: 'Motion',
                            outline: true
                        },
                        {
                            text: 'Layer',
                            outline: false
                        },
                        {
                            text: 'Impacto',
                            outline: true
                        }
                    ],
                    description: 'Hero cinematografico com overlay forte, badge de video e contraste elevado para capturar atencao imediata.',
                    mediaLink: 'https://www.youtube.com/embed/XEmYGE2q1Lc?autoplay=1',
                    mediaImage: 'images/hero_cinematic.jpg',
                    mediaAlt: 'Cinematic hero',
                    mediaKicker: 'Igreja Atitude',
                    mediaTitle: 'MOTION LAYER',
                    sideTitle: 'Video Overlay',
                    sideDescription: 'Camadas de sombra, chamada central e microdetalhes para dar sensacao de trailer na dobra inicial.',
                    stat1Value: '24fps',
                    stat1Label: 'Motion',
                    stat2Value: '4K',
                    stat2Label: 'Frame',
                    slideIndex: 2
                },
                grid: {
                    status: 'Minimal Grid System',
                    titleLines: [{
                            text: 'Grid',
                            outline: true
                        },
                        {
                            text: 'Pulse',
                            outline: false
                        },
                        {
                            text: 'Modular',
                            outline: true
                        }
                    ],
                    description: 'Composicao limpa com estatisticas e cards modulares, priorizando leitura rapida e estrutura em blocos.',
                    mediaLink: 'images/familia_ien.png',
                    mediaImage: 'images/familia_ien.png',
                    mediaAlt: 'Minimal grid hero',
                    mediaKicker: 'Minimal Grid',
                    mediaTitle: 'GRID PULSE',
                    sideTitle: 'Stats & Cards',
                    sideDescription: 'Blocos compactos com metricas e hierarquia modular para layouts institucionais elegantes.',
                    stat1Value: '12col',
                    stat1Label: 'Grid',
                    stat2Value: '+84%',
                    stat2Label: 'Metricas',
                    slideIndex: 1
                }
            };

            function renderHeroTitle(lines) {
                if (!heroTitle) return;
                heroTitle.innerHTML = lines.map((line, index) => {
                    const delayClass = index === 1 ? ' delay-200' : index === 2 ? ' delay-300' : '';
                    const toneClass = line.outline ? 'hero-outline' : 'text-stone-900';
                    return `<span class="text-reveal-wrapper"><span class="text-reveal-content${delayClass} ${toneClass}">${line.text}</span></span>`;
                }).join('');
                heroTitle.classList.remove('reveal-active');
                requestAnimationFrame(() => heroTitle.classList.add('reveal-active'));
            }

            function setHeroSlide(index) {
                if (slides.length === 0) return;
                slides[currentSlide]?.classList.remove('active');
                currentSlide = ((index % slides.length) + slides.length) % slides.length;
                slides[currentSlide].classList.add('active');
            }

            function applyHeroModel(modelKey) {
                const model = heroModels[modelKey] || heroModels.editorial;
                renderHeroTitle(model.titleLines);

                if (heroStatus) heroStatus.textContent = model.status;
                if (heroDescription) heroDescription.textContent = model.description;
                if (heroMediaLink) heroMediaLink.href = model.mediaLink;
                if (heroMediaImage) {
                    heroMediaImage.src = model.mediaImage;
                    heroMediaImage.alt = model.mediaAlt;
                }
                if (heroMediaKicker) heroMediaKicker.textContent = model.mediaKicker;
                if (heroMediaTitle) heroMediaTitle.textContent = model.mediaTitle;
                if (heroSideTitle) heroSideTitle.textContent = model.sideTitle;
                if (heroSideDescription) heroSideDescription.textContent = model.sideDescription;
                if (heroStat1Value) heroStat1Value.textContent = model.stat1Value;
                if (heroStat1Label) heroStat1Label.textContent = model.stat1Label;
                if (heroStat2Value) heroStat2Value.textContent = model.stat2Value;
                if (heroStat2Label) heroStat2Label.textContent = model.stat2Label;

                setHeroSlide(model.slideIndex);
                holdAutoSlideUntil = Date.now() + 12000;
                heroModelCards.forEach((card) => {
                    card.classList.toggle('active', card.dataset.heroModel === modelKey);
                });
            }

            if (heroModelCards.length > 0) {
                heroModelCards.forEach((card) => {
                    card.addEventListener('click', () => applyHeroModel(card.dataset.heroModel));
                    card.addEventListener('keydown', (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            applyHeroModel(card.dataset.heroModel);
                        }
                    });
                });

                applyHeroModel('editorial');

                if (slides.length > 1) {
                    setInterval(() => {
                        if (Date.now() < holdAutoSlideUntil) return;
                        setHeroSlide(currentSlide + 1);
                    }, 6000);
                }
            }

            function bindTabs(triggers, panels) {
                if (!triggers.length || !panels.length) return;
                triggers.forEach((trigger) => {
                    trigger.addEventListener('click', () => {
                        const tabId = trigger.dataset.tab;
                        triggers.forEach((btn) => btn.classList.remove('active'));
                        trigger.classList.add('active');
                        panels.forEach((panel) => {
                            panel.classList.toggle('active', panel.dataset.tabPanel === tabId);
                        });
                    });
                });
            }

            const tabRoots = document.querySelectorAll('[data-tabs-root]');
            tabRoots.forEach((root) => {
                const triggers = Array.from(root.querySelectorAll('[data-tab-trigger]'));
                const panels = Array.from(root.querySelectorAll('[data-tab-panel]'));
                bindTabs(triggers, panels);
            });

            const orphanTriggers = Array.from(document.querySelectorAll('[data-tab-trigger]'))
                .filter((trigger) => !trigger.closest('[data-tabs-root]'));
            const orphanPanels = Array.from(document.querySelectorAll('[data-tab-panel]'))
                .filter((panel) => !panel.closest('[data-tabs-root]'));
            bindTabs(orphanTriggers, orphanPanels);

            document.querySelectorAll('[data-accordion-trigger]').forEach((trigger) => {
                trigger.addEventListener('click', () => {
                    const item = trigger.closest('.accordion-item');
                    if (item) {
                        item.classList.toggle('active');
                    }
                });
            });

            document.querySelectorAll('[data-tilt-card]').forEach((card) => {
                card.addEventListener('mousemove', (event) => {
                    const rect = card.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    const rotateX = ((y / rect.height) - 0.5) * -8;
                    const rotateY = ((x / rect.width) - 0.5) * 10;
                    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
                });
            });

            const counters = document.querySelectorAll('.count-up');
            if (counters.length > 0) {
                const counterObserver = new IntersectionObserver((entries, obs) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !entry.target.dataset.counted) {
                            entry.target.dataset.counted = '1';
                            animateCounter(entry.target);
                            obs.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.45
                });

                counters.forEach((counter) => counterObserver.observe(counter));
            }

            const primeiraVisitaForm = document.getElementById('primeira-visita-form');
            const primeiraVisitaFeedback = document.getElementById('primeira-visita-feedback');
            const primeiraVisitaSubmit = document.getElementById('primeira-visita-submit');
            const webhookPrimeiraVisita = 'https://n8n.aleftec.com.br/webhook/7f043b95-e1fc-4d28-a4ce-f560b49f40e1';

            if (primeiraVisitaForm) {
                const submitLabel = primeiraVisitaSubmit ? primeiraVisitaSubmit.querySelector('span') : null;
                const defaultSubmitText = submitLabel ? submitLabel.textContent : '';

                primeiraVisitaForm.addEventListener('submit', async (event) => {
                    event.preventDefault();

                    if (!primeiraVisitaForm.checkValidity()) {
                        primeiraVisitaForm.reportValidity();
                        return;
                    }

                    if (primeiraVisitaFeedback) {
                        primeiraVisitaFeedback.classList.add('hidden');
                        primeiraVisitaFeedback.textContent = '';
                    }

                    if (primeiraVisitaSubmit) {
                        primeiraVisitaSubmit.disabled = true;
                        primeiraVisitaSubmit.classList.add('opacity-70', 'cursor-not-allowed');
                    }
                    if (submitLabel) submitLabel.textContent = 'Enviando...';

                    const formData = new FormData(primeiraVisitaForm);
                    const payload = {
                        nome: String(formData.get('nome') || '').trim(),
                        whatsapp: String(formData.get('whatsapp') || '').trim(),
                        comoConheceu: String(formData.get('como_conheceu') || '').trim(),
                        origem: 'landing-page-ien',
                        formulario: 'primeira-visita',
                        enviadoEm: new Date().toISOString()
                    };

                    try {
                        const response = await fetch(webhookPrimeiraVisita, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(payload)
                        });

                        if (!response.ok) {
                            throw new Error(`Webhook respondeu com status ${response.status}`);
                        }

                        primeiraVisitaForm.reset();
                        if (primeiraVisitaFeedback) {
                            primeiraVisitaFeedback.textContent = 'Entraremos em contato em breve.';
                            primeiraVisitaFeedback.classList.remove('hidden', 'text-red-600');
                            primeiraVisitaFeedback.classList.add('text-emerald-600');
                        }
                    } catch (error) {
                        console.error('Falha ao enviar formulario primeira visita:', error);
                        if (primeiraVisitaFeedback) {
                            primeiraVisitaFeedback.textContent = 'Nao foi possivel enviar agora. Tente novamente em instantes.';
                            primeiraVisitaFeedback.classList.remove('hidden', 'text-emerald-600');
                            primeiraVisitaFeedback.classList.add('text-red-600');
                        }
                    } finally {
                        if (primeiraVisitaSubmit) {
                            primeiraVisitaSubmit.disabled = false;
                            primeiraVisitaSubmit.classList.remove('opacity-70', 'cursor-not-allowed');
                        }
                        if (submitLabel) submitLabel.textContent = defaultSubmitText;
                    }
                });
            }

            const copyButtons = document.querySelectorAll('[data-copy-btn]');
            const pixCopyFeedback = document.getElementById('pix-copy-feedback');
            let copyFeedbackTimer;

            async function copyTextToClipboard(value) {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(value);
                    return;
                }

                const textarea = document.createElement('textarea');
                textarea.value = value;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'absolute';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                const copied = document.execCommand('copy');
                document.body.removeChild(textarea);

                if (!copied) {
                    throw new Error('Falha no fallback de copia');
                }
            }

            copyButtons.forEach((button) => {
                const defaultText = button.textContent;
                button.addEventListener('click', async () => {
                    const value = button.dataset.copyValue || '';
                    const label = button.dataset.copyLabel || 'Chave PIX copiada.';

                    if (!value) return;

                    try {
                        await copyTextToClipboard(value);
                        button.textContent = 'Copiado!';
                        if (pixCopyFeedback) {
                            pixCopyFeedback.textContent = label;
                            pixCopyFeedback.classList.remove('hidden', 'text-red-600');
                            pixCopyFeedback.classList.add('text-emerald-600');
                        }
                    } catch (error) {
                        console.error('Falha ao copiar PIX:', error);
                        if (pixCopyFeedback) {
                            pixCopyFeedback.textContent = 'Nao foi possivel copiar. Tente novamente.';
                            pixCopyFeedback.classList.remove('hidden', 'text-emerald-600');
                            pixCopyFeedback.classList.add('text-red-600');
                        }
                    } finally {
                        window.clearTimeout(copyFeedbackTimer);
                        copyFeedbackTimer = window.setTimeout(() => {
                            button.textContent = defaultText;
                            if (pixCopyFeedback) {
                                pixCopyFeedback.classList.add('hidden');
                                pixCopyFeedback.textContent = '';
                            }
                        }, 1800);
                    }
                });
            });
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    entry.target.classList.add('reveal-active');
                    const children = entry.target.querySelectorAll('.reveal');
                    children.forEach((child, index) => {
                        setTimeout(() => child.classList.add('active'), index * 100);
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal, .animate-on-scroll, .text-reveal-wrapper, section').forEach((el) => {
            observer.observe(el);
        });

        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            document.querySelectorAll('.parallax-img').forEach((img) => {
                const speed = parseFloat(img.dataset.speed || '0.05');
                img.style.transform = `translateY(${scroll * speed}px) scale(1.08)`;
            });
            const heroContent = document.querySelector('#hero-title');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scroll * 0.06}px)`;
            }
        });
