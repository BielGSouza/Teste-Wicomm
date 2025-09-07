import { useRef, useEffect, useState } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import './home.css'

function Home() {
    const containerRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(1);

    useEffect(() => {
        const centerMiddleImage = () => {
            const container = containerRef.current;
            if (!container) return;

            // Encontra a imagem do meio (segunda imagem)
            const images = container.querySelectorAll('img');
            if (images.length >= 2) {
                const middleImage = images[1]; // Segunda imagem (índice 1)

                const containerWidth = container.offsetWidth;
                const imageWidth = middleImage.offsetWidth;
                const scrollPosition = middleImage.offsetLeft - (containerWidth / 2.274) + (imageWidth / 3);

                container.scrollTo({
                    left: scrollPosition,
                    behavior: 'instant'
                });
            }
        };

        // Espera as imagens carregarem
        const images = containerRef.current.querySelectorAll('img');
        let loadedImages = 0;

        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        centerMiddleImage();
                    }
                });
            }
        });

        if (loadedImages === images.length) {
            centerMiddleImage();
        }

        // Também centraliza no redimensionamento da janela
        window.addEventListener('resize', centerMiddleImage);

        return () => {
            window.removeEventListener('resize', centerMiddleImage);
        };
    }, []);


    const handleLeftClick = (e) => {
        e.preventDefault();
        let img01 = document.getElementById('img01').scrollWidth;
        containerRef.current.scrollLeft -= img01 * 1.017;

        if (containerRef.current.scrollLeft <= 1417.5999755859375) {
            setActiveSlide(0);
        } else {
            setActiveSlide(1);
        }
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        let img01 = document.getElementById('img01').scrollWidth;
        containerRef.current.scrollLeft += img01 * 1.017;

        if (containerRef.current.scrollLeft >= 1199.199951171875) {
            setActiveSlide(2);
        } else {
            setActiveSlide(1);
        }
    };

    // Função para mover o carrossel com o input

    const moveRigth = () => {
        const container = document.getElementById('carouselHeader')
        container.scrollTo({
            left: container.scrollWidth - container.clientWidth,
            behavior: 'smooth'
        });
        setActiveSlide(2);
    }

    const moveCenter = () => {
        const container = document.getElementById('carouselHeader')
        container.scrollTo({
            left: container.scrollWidth / 2 - container.clientWidth / 2,
            behavior: 'smooth'
        })
        setActiveSlide(1);
    }

    const moveLeft = () => {
        const container = document.getElementById('carouselHeader')
        container.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
        setActiveSlide(0);
    }

    //Funçao para curtir a foto
    function CurtirFoto(numero) {
        const like = document.getElementById('imgLike')
        const like1 = document.getElementById('imgLike1')
        const like2 = document.getElementById('imgLike2')
        const like3 = document.getElementById('imgLike3')
        const like4 = document.getElementById('imgLike4')
        const IdLike = numero

        if (numero === 0) {
            if (like.src === "http://localhost:5173/imgs_gallery/heart.svg") {
                like.src = "http://localhost:5173/imgs_gallery/heart_red.svg"
            } else {
                like.src = "http://localhost:5173/imgs_gallery/heart.svg"
            }
        } else if (numero === 1) {
            if (like1.src === "http://localhost:5173/imgs_gallery/heart.svg") {
                like1.src = "http://localhost:5173/imgs_gallery/heart_red.svg"
            } else {
                like1.src = "http://localhost:5173/imgs_gallery/heart.svg"
            }
        } else if (numero === 2) {
            if (like2.src === "http://localhost:5173/imgs_gallery/heart.svg") {
                like2.src = "http://localhost:5173/imgs_gallery/heart_red.svg"
            } else {
                like2.src = "http://localhost:5173/imgs_gallery/heart.svg"
            }
        } else if (numero === 3) {
            if (like3.src === "http://localhost:5173/imgs_gallery/heart.svg") {
                like3.src = "http://localhost:5173/imgs_gallery/heart_red.svg"
            } else {
                like3.src = "http://localhost:5173/imgs_gallery/heart.svg"
            }
        } else if (numero === 4) {
            if (like4.src === "http://localhost:5173/imgs_gallery/heart.svg") {
                like4.src = "http://localhost:5173/imgs_gallery/heart_red.svg"
            } else {
                like4.src = "http://localhost:5173/imgs_gallery/heart.svg"
            }
        }
    }

    return (
        <div>
            <SpeedInsights />
            <header>
                <div id="carouselHeader" ref={containerRef}>
                    <img id='img02' src="./imgs_carousel/baner_gato2.png" alt="" className='w-[1179px]' style={{ marginLeft: '50px' }} />
                    <img id='img01' src="./imgs_carousel/baner_home.png" alt="Baner loja Gat" className='w-[1179px]' />
                    <img id='img03' src="./imgs_carousel/baner_gato1.png" alt="" className='w-[1179px]' style={{ marginRight: '51px' }} />
                </div>
                <span className='absolute top-[50%] left-[15%] hover:translate-x-[-23px] duration-700' onClick={handleLeftClick}><img src="./imgs_carousel/navegacao/ArrowLeft.svg" alt="" /></span>
                <span className='absolute top-[50%] right-[15%] hover:translate-x-[23px] duration-700' onClick={handleRightClick}><img src="./imgs_carousel/navegacao/ArrowRight.svg" alt="" /></span>
                <div id='navCarousel' className='flex items-center gap-2 absolute bottom-23 left-[15%]'>
                    <input type="radio" className='menuActive' name="carousel" id="slide1" checked={activeSlide === 0} onChange={moveLeft} />
                    <input type="radio" className='menuActive' name="carousel" id="slide2" checked={activeSlide === 1} onChange={moveCenter} />
                    <input type="radio" className='menuActive' name="carousel" id="slide3" checked={activeSlide === 2} onChange={moveRigth} />
                </div>

                <section className='flex justify-center' style={{ margin: '' }}>
                    <nav className='w-[1240px]'>
                        <div id='divLogoNav' className='bg-[#EFEFEF] h-[100%] w-[126px] flex items-center justify-center'>
                            <img src="./imgs_header/logo.svg" alt="" className='absolute top-[6px]' />
                        </div>
                        <div className='bg-[#1E1E1E] flex items-center justify-center gap-4 h-[100%] w-[135px] border-1' style={{ padding: '5px 30px' }}>
                            <img src="./imgs_header/menu_01.svg" alt="" />
                            <p className='font-bold'><strong>produtos</strong></p>
                        </div>
                        <div className='bg-[#1E1E1E] flex items-center justify-center gap-4 h-[100%] w-[135px] border-1' style={{ padding: '5px 30px' }}>
                            <img src="./imgs_header/menu_02.svg" alt="" />
                            <p className='font-[10]'>coleções</p>
                        </div>
                        <div id='divMenuLoacal' className='bg-[#1E1E1E] flex items-center justify-end gap-4 border-1 w-[532px] h-[100%]' style={{ padding: '5px 30px' }}>
                            <p className='cursor-pointer hover:scale-[1.2] hover:text-[#FFE4B3] duration-75'><a href="#">blog</a></p>
                            <p className='cursor-pointer hover:scale-[1.2] hover:text-[#FFE4B3] duration-75'><a href="#">lookbook</a></p>
                            <p className='cursor-pointer hover:scale-[1.2] hover:text-[#FFE4B3] duration-75'><a href="#">sobre a Gat</a></p>
                            <p className='cursor-pointer hover:scale-[1.2] hover:text-[#FFE4B3] duration-75'><a href="#">wishlist</a></p>
                        </div>
                        <div className='bg-[#1E1E1E] flex items-center gap-4 h-[100%] w-[213px] border-1 text-[12px]' style={{ padding: '5px 10px' }}>
                            <label htmlFor="search">
                                <img src="./imgs_header/search.svg" alt="" className='' />
                            </label>
                            <input type="text" name="search" id="searchInput" placeholder='digite aqui o que procura' className='w-[200px] focus:border-none' />
                        </div>
                        <div className='bg-[#1E1E1E] h-[100%] w-[40px] flex items-center justify-center border-1'>
                            <img src="./imgs_header/user.svg" alt="" />
                        </div>
                        <div className='bg-black flex items-center justify-center border-1 gap-4 h-[100%] w-[59px]'>
                            <img src="./imgs_header/cart.svg" alt="" />
                            <img src="./imgs_header/notification.svg" alt="" className='absolute right-[11px] top-[8px]' />
                        </div>
                    </nav>
                </section>
            </header>

            <main className='w-[100%] h-auto text-white'>
                <section className='flex justify-center'>
                    <div className='bg-black w-[1179px] h-[9px]'></div>
                </section>
                <section className='flex justify-center'>
                    <div className='bg-[#DE5A53] w-[1179px] h-[238px] flex items-center justify-center'>
                        <aside className='w-[1030px] h-[180px] border-1 border-white flex'>
                            <div className='flex items-center justify-center gap-4 w-[315px] h-[180px] border-1' style={{ padding: '10px' }}>
                                <h2 className='text-[140px]' style={{ fontFamily: 'OswaldExtraLight' }}>10</h2>
                                <span>
                                    <h2 className='text-[30px]' style={{ fontFamily: 'SoraBold', lineHeight: '40px' }}>Benefício Principal</h2>
                                    <p className='text-[14px]' style={{ fontFamily: 'SoraLight' }}>Lorem ipsum dolor sit amet, consectetur.</p>
                                </span>
                            </div>
                            <div className='grid grid-cols-3 w-[717.99]'>
                                <div className='w-[239.33px] h-[129px] border-1 flex items-center justify-center flex-col' style={{ padding: '17px' }}>
                                    <span className='flex items-center'>
                                        <img src="./imgs_card_beneficios/prize.svg" alt="" />
                                        <h2 className='text-[22px] text-end' style={{ fontFamily: 'SoraBold' }}>Benefício Secundário</h2>
                                    </span>
                                    <p className='text-[14px]' style={{ fontFamily: 'SoraLight' }}>Lorem ipsum dolor sit amet, consectetur al muad’ib.</p>
                                </div>
                                <div className='w-[239.33px] h-[129px] border-1 flex items-center justify-center flex-col' style={{ padding: '17px' }}>
                                    <span className='flex items-center'>
                                        <img src="./imgs_card_beneficios/prize.svg" alt="" />
                                        <h2 className='text-[22px] text-end' style={{ fontFamily: 'SoraBold' }}>Benefício Secundário</h2>
                                    </span>
                                    <p className='text-[14px]' style={{ fontFamily: 'SoraLight' }}>Lorem ipsum dolor sit amet, consectetur al muad’ib.</p>
                                </div>
                                <div className='w-[239.33px] h-[129px] border-1 flex items-center justify-center flex-col' style={{ padding: '17px' }}>
                                    <span className='flex items-center'>
                                        <img src="./imgs_card_beneficios/prize.svg" alt="" />
                                        <h2 className='text-[22px] text-end' style={{ fontFamily: 'SoraBold' }}>Benefício Secundário</h2>
                                    </span>
                                    <p className='text-[14px]' style={{ fontFamily: 'SoraLight' }}>Lorem ipsum dolor sit amet, consectetur al muad’ib.</p>
                                </div>
                                <div className='col-span-3 overflow-hidden h-[52px] flex items-center'>
                                    <div id='divRollLetter' className='flex items-center justify-evenly h-[21.06px] w-[100%]'>
                                        <img src="./imgs_card_beneficios/paw.svg" alt="pata de gato" className='h-[100%]' />
                                        <p className='text-[18px]'>Benefício Terciário</p>
                                        <img src="./imgs_card_beneficios/paw-1.svg" alt="pata de gato" className='h-[100%]' />
                                        <p className='text-[18px]'>Lisan Al Gaib</p>
                                        <img src="./imgs_card_beneficios/paw.svg" alt="pata de gato" className='h-[100%]' />
                                        <p className='text-[18px]'>Benefício Terciário</p>
                                        <img src="./imgs_card_beneficios/paw-1.svg" alt="pata de gato" className='h-[100%]' />
                                        <p className='text-[18px]'>Lisan Al Gaib</p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
                <section
                    style={{ marginTop: "80px" }}
                    className="relative bg-[#EFEFEF] h-auto"
                >
                    {/* imagem decorativa no fundo */}
                    <img
                        src="./imgs_collection_feature/Rectangle 33.png"
                        alt=""
                        className="absolute left-[270px] top-[90px] z-0"
                    />

                    {/* conteúdo da section acima da imagem */}
                    <div className="relative z-10">
                        <span
                            className="flex justify-between items-start"
                            style={{ margin: "0px 0px 0px 127px" }}
                        >
                            <h2
                                className="bg-[#4DA1B1] w-[483px] h-[210px] text-[50px] flex justify-end items-center"
                                style={{ paddingRight: "53px", lineHeight: "50px", fontFamily: "SoraBold" }}
                            >
                                MINIMA <br /> LISMO
                            </h2>

                            <span className="flex items-center justify-between gap-32">
                                <p
                                    className="text-black text-[20px]"
                                    style={{ fontFamily: "SoraBold" }}
                                >
                                    <strong>COLEÇÕES</strong>
                                </p>
                                <p
                                    className="text-black underline text-[14px]"
                                    style={{ fontFamily: "SoraExtraLight" }}
                                >
                                    <a href="#">VER TODAS</a>
                                </p>
                                <span className="flex gap-4">
                                    <img
                                        src="./imgs_carousel/navegacao/ArrowLeft.svg"
                                        alt="seta esquerda"
                                    />
                                    <img
                                        src="./imgs_carousel/navegacao/ArrowRight.svg"
                                        alt="seta direita"
                                    />
                                </span>
                            </span>
                        </span>

                        <span className="flex">
                            <img
                                src="./imgs_collection_feature/image 5.png"
                                alt=""
                                className="relative"
                                style={{ marginTop: "-158px" }}
                            />
                            <p
                                className="text-[20px] text-black w-[338px] h-[134px] relative top-[60px] left-[50px]"
                                style={{ fontFamily: "SoraRegular" }}
                            >
                                Also reality power discussion buy-in closest goto model. Have protocol
                                at long practices low-hanging data most driver's.
                                <button
                                    type="button"
                                    className="w-[182px] h-[45px] border-1 rounded-4xl cursor-pointer hover:bg-black hover:text-white transition-all duration-300"
                                    style={{ marginTop: "22px" }}
                                >
                                    EXPLORAR
                                </button>
                            </p>
                        </span>

                        <span className='absolute left-[742px] top-[185px]'>
                            <span className='flex justify-center'>
                                <img src="./imgs_collection_feature/Rectangle 34.png" alt="" className='absolute top-[-20%] -z-[1]' />
                                <img src="./imgs_collection_feature/image 25.png" alt="" />
                            </span>
                        </span>
                    </div>
                </section>


                <section style={{ marginTop: "227px" }}>
                    <div className="relative w-[358px] h-[401px] border-black flex justify-center items-center flex-col">
                        {/* círculo atrás do texto, mas na frente do body */}
                        <div id='polygon-bg' className="absolute w-[206px] h-[206px] rounded-full bg-[#FFE4B3] left-[-5%] top-[-0.6px] z-0"></div>

                        {/* texto fica acima do círculo */}
                        <div>
                            <h2
                                className="relative w-[295px] h-[199px] text-[70px] text-[#373737] font-bold z-10"
                                style={{ lineHeight: "76px", fontFamily: "SoraRegular" }}
                            >
                                <strong style={{ fontFamily: "SoraBold" }}>QUERI <br /> DINHO</strong>
                                <br /> <strong style={{ fontFamily: 'SoraLight' }}>DELES</strong>
                            </h2>
                            <button
                                type="button"
                                className="w-[182px] h-[45px] text-black border-1 rounded-4xl cursor-pointer hover:bg-black hover:text-white transition-all duration-300"
                                style={{ marginTop: "47px" }}
                            >
                                VER TUDO
                            </button>
                        </div>
                    </div>

                    <aside className='flex absolute right-[130px] top-[1800px]'>
                        <div className='w-[310px] h-[436px]' style={{ padding: '10px' }}>
                            <div className='flex justify-end'>
                                <span>
                                    <p style={{ marginBottom: '5px' }} className='bg-[#4DA1B1] w-[57px] h-[21px] text-[10px] flex justify-center items-center relative left-[36px]'><strong>10%</strong>OFF</p>
                                    <p className='w-[93px] h-[21px] flex items-center justify-center bg-[#E5675D] text-[10px]'><strong>LANÇAMENTO</strong></p>
                                </span>
                            </div>
                            <img src="./imgs_product_showcase/casa_home.png" alt="" className='w-[130px] h-[171px]' style={{ margin: '70px 90px' }} />
                            <div className='flex items-start justify-between' style={{ marginTop: '57px' }}>
                                <div>
                                    <p style={{ fontFamily: 'SoraBold' }} className='text-[16px] text-[#373737] uppercase'>Toca Túnel <br /> Módulos</p>
                                    <span className='flex gap-3 items-center'>
                                        <p style={{ fontFamily: 'SoraLight', textDecoration: 'line-through' }} className='text-[12px] text-[#373737]'>R$00,00</p>
                                        <p style={{ fontFamily: 'SoraBold' }} className='text-[12px] text-[#373737]'>R$0000,00</p>
                                    </span>
                                </div>
                                <div className='w-[61.6px] flex items-center justify-between'>
                                    <div className='w-[10.6px] h-[10.6px] bg-[#7EABE3] rounded-4xl'></div>
                                    <div className='w-[10.6px] h-[10.6px] bg-[#BF362E] rounded-4xl'></div>
                                    <div className='w-[10.6px] h-[10.6px] bg-[#637C52] rounded-4xl'></div>
                                    <div className='w-[10.6px] h-[10.6px] bg-[#433643] rounded-4xl'></div>
                                </div>
                            </div>
                        </div>

                        <div className='w-[310px] h-[436px]' style={{ padding: '10px' }}>
                            <div className='flex justify-end'>
                                <span>
                                    <p style={{ marginBottom: '5px' }} className='bg-[#4DA1B1] w-[57px] h-[21px] text-[10px] flex justify-center items-center relative left-[36px]'><strong>10%</strong>OFF</p>
                                    <p className='w-[93px] h-[21px] flex items-center justify-center bg-[#E5675D] text-[10px]'><strong>LANÇAMENTO</strong></p>
                                </span>
                            </div>
                            <img src="./imgs_product_showcase/casa_home.png" alt="" className='w-[130px] h-[171px]' style={{ margin: '70px 90px' }} />
                            <div className='flex items-start justify-between' style={{ marginTop: '57px' }}>
                                <div>
                                    <p style={{ fontFamily: 'SoraBold' }} className='text-[16px] text-[#373737] uppercase'>Toca Túnel <br /> Módulos</p>
                                    <span className='flex gap-3 items-center'>
                                        <p style={{ fontFamily: 'SoraLight', textDecoration: 'line-through' }} className='text-[12px] text-[#373737]'>R$00,00</p>
                                        <p style={{ fontFamily: 'SoraBold' }} className='text-[12px] text-[#373737]'>R$0000,00</p>
                                    </span>
                                </div>
                                <div className='w-[61.6px] flex items-center justify-between'>
                                    <div className='w-[10.6px] h-[10.6px] bg-[#7EABE3] rounded-4xl'></div>
                                    <div className='w-[10.6px] h-[10.6px] bg-[#BF362E] rounded-4xl'></div>
                                    <div className='w-[10.6px] h-[10.6px] bg-[#637C52] rounded-4xl'></div>
                                    <div className='w-[10.6px] h-[10.6px] bg-[#433643] rounded-4xl'></div>
                                </div>
                            </div>
                        </div>

                        <div className='w-[310px] h-[436px]' style={{ padding: '10px' }}>
                            <div className='flex justify-end'>
                                <span>
                                    <p style={{ marginBottom: '5px' }} className='bg-[#4DA1B1] w-[57px] h-[21px] text-[10px] flex justify-center items-center relative left-[36px]'><strong>10%</strong>OFF</p>
                                    <p className='w-[93px] h-[21px] flex items-center justify-center bg-[#E5675D] text-[10px]'><strong>LANÇAMENTO</strong></p>
                                </span>
                            </div>
                            <img src="./imgs_product_showcase/casa_home.png" alt="" className='w-[130px] h-[171px]' style={{ margin: '70px 90px' }} />
                            <div className='flex items-start justify-between' style={{ marginTop: '57px' }}>
                                <div>
                                    <p style={{ fontFamily: 'SoraBold' }} className='text-[16px] text-[#373737] uppercase'>Toca Túnel <br /> Módulos</p>
                                    <span className='flex gap-3 items-center'>
                                        <p style={{ fontFamily: 'SoraLight', textDecoration: 'line-through' }} className='text-[12px] text-[#373737]'>R$00,00</p>
                                        <p style={{ fontFamily: 'SoraBold' }} className='text-[12px] text-[#373737]'>R$0000,00</p>
                                    </span>
                                </div>
                                <div className='w-[61.6px] flex items-center justify-between'>
                                    <div className='w-[10.6px] h-[10.6px] bg-[#7EABE3] rounded-4xl'></div>
                                    <div className='w-[10.6px] h-[10.6px] bg-[#BF362E] rounded-4xl'></div>
                                    <div className='w-[10.6px] h-[10.6px] bg-[#637C52] rounded-4xl'></div>
                                    <div className='w-[10.6px] h-[10.6px] bg-[#433643] rounded-4xl'></div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </section>

                <section style={{ marginTop: '210px' }}>
                    <div style={{ margin: 'auto' }} className='w-[478px]'>
                        <p className='text-black text-[18px]' style={{ letterSpacing: '8px', fontWeight: '100%', fontFamily: 'SoraBold' }}>NAVEGUE PELAS CATEGORIAS</p>
                    </div>

                    <div className='flex items-center justify-center' style={{ marginTop: '34px' }}>
                        <div className='w-[1241px] h-[59px] text-black flex justify-between'>
                            <button className='w-[255.11px] h-[59px] flex gap-4 items-center justify-center border-1 border-black rounded-4xl' style={{ padding: '13.5px 24.13' }}><img src="./imgs_category_navigation/produto_1.png" alt="" className='w-[38] h-[42]' />CLÁSSICO</button>
                            <button className='w-[254.25px] h-[59px] flex gap-4 items-center justify-center border-1 border-black rounded-4xl' style={{ padding: '13.5px 24.13' }}><img src="./imgs_category_navigation/produto_2.png" alt="" className='w-[46px] h-[37px]' />MINIMALISMO</button>
                            <button className='w-[254.25px] h-[59px] flex gap-4 items-center justify-center border-1 border-black rounded-4xl' style={{ padding: '13.5px 24.13' }}><img src="./imgs_category_navigation/produto_3.png" alt="" className='w-[42px] h-[32px]' />MAXIMALISMO</button>
                            <button className='w-[254.25px] h-[59px] flex gap-4 items-center justify-center border-1 border-black rounded-4xl' style={{ padding: '13.5px 24.13' }}><img src="./imgs_category_navigation/produto_4.png" alt="" className='w-[46px] h-[32px]' />BOHO</button>
                            <button className='w-[157.37px] h-[59px] flex items-center justify-center border-1 border-black rounded-4xl' style={{ padding: '13.5px 24.13px' }}>VER TUDO</button>
                        </div>
                    </div>
                </section>

                <section style={{ marginTop: '72px' }}>
                    <div className='w-[282px] h-[322px] bg-white border-1 border-black absolute right-[140.4px] text-black flex flex-col items-center justify-center gap-4  ' style={{ marginTop: '19px' }}>
                        <h2 className='text-[30px] w-[232px]' style={{ fontFamily: 'SoraBold' }}>Lorem Ipsum <br /> Dolor Sit</h2>
                        <div className='flex items-center flex-col gap-2 w-[232px]'>
                            <p className='text-[14px]' style={{ fontFamily: 'SoraLight' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                            <p className='text-[14px]' style={{ fontFamily: 'SoraLight' }}>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>
                        </div>
                        <div className='w-[232px]'><button type="button" className='w-[182px] h-[45px] flex items-center justify-center' style={{ padding: '16.5px 31px' }}>VER SELEÇÃO</button></div>
                    </div>
                    <img src="./imgs_cat_everything/bg_image.png" alt="" />
                </section>

                <section style={{ marginTop: '42px' }} className='grid grid-cols-2'>
                    <div>
                        <img src="./imgs_cat_spotlight/elipse_red.png" alt="" width={272} className='absolute left-[414.4px]' style={{ marginTop: '15px' }} />
                        <h2 className='absolute left-[249.4px] text-[70px] w-[396px] h-[257px] text-[#373737] z-1' style={{ fontFamily: 'SoraRegular', marginTop: '83px', lineHeight: '88px' }}>Decorar <br /> Arranhar & <br /> Relaxar</h2>
                    </div>
                    <div className='w-[505px] gap-4' style={{ padding: '40px 0px 47px 0px' }}>
                        <img src="./imgs_cat_spotlight/video.png" alt="" width={505} />
                        <p className='text-[#373737] text-[14px]' style={{ padding: '55.94px 0px 46px 0px', lineHeight: '25px' }}>Hammer can low idea of. Lunch able design items needle here stop drive. / or devil pants game close. Prioritize out key view / vendor we've. 4-blocker gave shift ideal based post.</p>
                        <button className='w-[295px] h-[45px] text-black'>MAIS SOBRE A GAT</button>
                    </div>
                </section>

                <section className='h-[725px] bg-[#FFFFFF] text-black' style={{ paddingTop: '69px' }}>
                    <p className='w-[499px] h-[40px] text-[20px]' style={{ marginLeft: '234px', lineHeight: '25px' }}>Faça parte da comunidade de gatunos que amam design e papelão compartilhando a hashtag:</p>
                    <h2 className='w-[913px] h-[55px] flex items-center justify-center relative text-[#7EB4C8] text-[75px] z-[99]' style={{ fontFmaily: 'SoraRegular', marginLeft: '228px', marginTop: '14px' }}>#AdoradoresDePapelão</h2>
                    <div className='overflow-hidden' style={{ marginTop: '-18px' }}>
                        <div id='SliderInfinito' className='flex items-center gap-[18px] w-[100%]' style={{ padding: '0px 18px', marginTop: '-17px' }}>
                            <span className=' w-[270px] h-[481px] flex-shrink-0'>
                                <img src="./imgs_gallery/gato1.png" alt="" />
                                <div className='w-[36px] h-[38px] flex justify-center items-center flex-col relative left-[220px] top-[-50px]'>
                                    <img id='imgLike' src="./imgs_gallery/heart.svg" alt="" width={24} onClick={() => CurtirFoto(0)} />
                                    <p className='text-[13px] text-white'>10mil</p>
                                </div>
                            </span>
                            <span className='w-[270px] h-[481px] flex-shrink-0'>
                                <img src="./imgs_gallery/gato2.png" alt="" />
                                <div className='w-[36px] h-[38px] flex justify-center items-center flex-col relative left-[220px] top-[-50px]'>
                                    <img id='imgLike1' src="./imgs_gallery/heart.svg" alt="" width={24} onClick={() => CurtirFoto(1)} />
                                    <p className='text-[13px] text-white'>10mil</p>
                                </div>
                            </span>
                            <span className='w-[270px] h-[481px] flex-shrink-0'>
                                <img src="./imgs_gallery/gato3.png" alt="" />
                                <div className='w-[36px] h-[38px] flex justify-center items-center flex-col relative left-[220px] top-[-50px]'>
                                    <img id='imgLike2' src="./imgs_gallery/heart.svg" alt="" width={24} onClick={() => CurtirFoto(2)} />
                                    <p className='text-[13px] text-white'>10mil</p>
                                </div>
                            </span>
                            <span className='w-[270px] h-[481px] flex-shrink-0'>
                                <img src="./imgs_gallery/gato4.png" alt="" />
                                <div className='w-[36px] h-[38px] flex justify-center items-center flex-col relative left-[220px] top-[-50px]'>
                                    <img id='imgLike3' src="./imgs_gallery/heart.svg" alt="" width={24} onClick={() => CurtirFoto(3)} />
                                    <p className='text-[13px] text-white'>10mil</p>
                                </div>
                            </span>
                            <span className='w-[270px] h-[481px] flex-shrink-0'>
                                <img src="./imgs_gallery/gato5.jpg" alt="" />
                                <div className='w-[36px] h-[38px] flex justify-center items-center flex-col relative left-[220px] top-[-50px]'>
                                    <img id='imgLike4' src="./imgs_gallery/heart.svg" alt="" width={24} onClick={() => CurtirFoto(4)} />
                                    <p className='text-[13px] text-white'>10mil</p>
                                </div>
                            </span>
                        </div>
                    </div>
                </section>

                <section className='flex justify-center'>
                    <aside className='w-[1240px] h-[387px] border-t-1 border-black text-[#373737] flex items-end '>
                        <img src="./imgs_newsletter_subscription/image.png" alt="" width={505} style={{ marginTop: '40px' }} />
                        <div className='flex flex-col h-[347px]' style={{ padding: '20px' }}>
                            <h2 className='text-[50px]' style={{ fontFamily: 'SoraRegular', marginBottom: '50px', marginTop: '20px' }}>NEWSLETTER</h2>
                            <div className='flex'>
                                <div style={{ marginRight: '32px' }}>
                                    <p className=' text-[14px] leading-[25px] w-[274px]' style={{ fontFamily: 'SoraBold' }}>CADASTRE-SE E GANHE 10% OFF NA SUA PRIMEIRA COMPRA</p>
                                    <p className='text-[14px] leading-[25px] w-[295px]'>Seja a primeira a receber lançamentos, novidades e promoções.</p>
                                </div>
                                <div className='flex flex-col gap-y-10'>
                                    <input type="text" name="" id="" placeholder='NOME DO SEU PET' className='border-b-1 w-[400px]' />
                                    <input type="text" name="" id="" placeholder='SEU EMAIL' className='border-b-1 w-[400px]' />
                                    <button className='w-[188px] h-[39px]'>CADASTRAR</button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </section>
            </main>

            <footer className='w-[1240px] h-[214px]' style={{ margin: 'auto', marginTop: '52px'}}>
                <div className='flex text-[12px] text-[#373737]'>
                    <div className='w-[210px] h-[189px] bg-[#373737] flex items-center justify-center'>
                        <img src="./imgs_footer/logo.png" alt="" width={75} />
                    </div>

                    <div className='w-[1030px] h-[189px] border-1 border-[#373737] flex'>
                        <div className='w-[525px] h-[100%] border-1 border-[#373737]'>
                            <div className='w-[100%] h-[47px] border-b-1 border-[#373737] flex items-center justify-evenly leading-[25px]'>
                                <p style={{ fontFamily: 'SoraBold' }}>PRODUTOS</p>
                                <p style={{ fontFamily: 'SoraBold' }}>COLEÇÕES</p>
                                <p style={{ fontFamily: 'SoraBold' }}>LOOKBOOK</p>
                                <p style={{ fontFamily: 'SoraBold' }}>SOBRE</p>
                                <p style={{ fontFamily: 'SoraBold' }}>WISHLIST</p>
                                <p style={{ fontFamily: 'SoraBold' }}>BLOG</p>
                            </div>

                            <div className='w-[100%] h-[142px] flex'>
                                <div style={{ paddingLeft: '16px' }} className='w-[210px] h-[100%] border-r-1 border-[#373737] flex flex-col items-start justify-center'>
                                    <p className='w-[159px]' style={{ fontFamily: 'SoraBold', paddingBottom: '20px' }}>FORMAS DE PAGAMENTO</p>
                                    <img src="./imgs_footer/formas_pagamentos.png" alt="" width={159.43} className='filter grayscale' />
                                </div>

                                <div className='w-[315px] h-[100%] flex flex-col justify-center items-start'>
                                    <div style={{ paddingLeft: '16px'}}>
                                        <p style={{ fontFamily: 'SoraBold', paddingLeft: '10px'}}>CERTIFICADOS E SEGURANÇA</p>
                                        <img src="./imgs_footer/certificado.png" alt="" width={278} className='filter grayscale'/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-[210px] h-[100%] border-1 border-[#373737] text-[12px] flex flex-col items-center justify-center'>
                            <p className='w-[143px] h-[9px]' style={{ fontFamily: 'SoraBold' }}>AJUDA</p>
                            <p className='w-[143px] h-[134px] leading-[25px]' style={{ marginTop: '16px' }}>
                                <ul>
                                    <li>FAQ</li>
                                    <li>Sobre nossos produtos</li>
                                    <li>Trocas e devoluções</li>
                                    <li>Entregas</li>
                                    <li>Indique e ganhe</li>
                                    Garantias
                                </ul>
                            </p>
                        </div>

                        <div className='w-[295px] h-[100%] border-1 border-[#373737]'>
                            <div style={{ paddingLeft: '11px' }} className='w-[100%] h-[99px] border-b-1 border-[#373737] flex items-start justify-center flex-col'>
                                <p style={{ fontFamily: 'SoraBold' }} className='w-[64px]'>CONTATO</p>
                                <p className='w-[170px] h-[34px] leading-[25px]'>
                                    WhatsApp - (51) 9999-9999 <br />
                                    E-mail - ajuda@gat.com.br
                                </p>
                            </div>

                            <div style={{ paddingLeft: '11px' }} className='w-[100%] h-[90px] flex items-start justify-center flex-col'>
                                <p style={{ fontFamily: 'SoraBold', marginBottom: '18px' }}>REDES SOCIAIS</p>
                                <img src="./imgs_footer/redes_sociais.png" alt="" width={137.75} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <p className='text-[10px] leading-[25px]'>© 2024, GAT. TODOS OS DIREITOS RESERVADOS.</p>
                    <p className='text-[10px] leading-[25px]'>GAT  LTDA. | R. Ondina Carvalheira Peixoto, 300 - Chácaras Palmeiras | Cataguases - MG | CEP 36774-550</p>
                </div>
            </footer>
        </div>
    );
}


export default Home;