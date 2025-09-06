import { useRef, useEffect, useState } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"
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
                const scrollPosition = middleImage.offsetLeft - (containerWidth / 2) + (imageWidth / 2);

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
        containerRef.current.scrollLeft -= img01 * 1.0259;

        if (containerRef.current.scrollLeft <= 1417.5999755859375) {
            setActiveSlide(0);
        } else {
            setActiveSlide(1);
        }
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        let img01 = document.getElementById('img01').scrollWidth;
        containerRef.current.scrollLeft += img01 * 1.0259;

        if (containerRef.current.scrollLeft >= 1416.800048828125) {
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

    return (
        <div>
            <header>
                <div id="carouselHeader" ref={containerRef}>
                    <img id='img02' src="./imgs_carousel/baner_gato2.png" alt="" className='w-[90vw]' style={{ marginLeft: '77px' }} />
                    <img id='img01' src="./imgs_carousel/baner_home.png" alt="Baner loja Gat" className='w-[90vw]' style={{ marginLeft: '25px', marginRight: '25px' }} />
                    <img id='img03' src="./imgs_carousel/baner_gato1.png" alt="" className='w-[90vw]' style={{ marginRight: '77px' }} />
                </div>
                <span className='absolute top-[50%] left-[12%] hover:translate-x-[-23px] duration-700' onClick={handleLeftClick}><img src="./imgs_carousel/navegacao/ArrowLeft.svg" alt="" /></span>
                <span className='absolute top-[50%] right-[12%] hover:translate-x-[23px] duration-700' onClick={handleRightClick}><img src="./imgs_carousel/navegacao/ArrowRight.svg" alt="" /></span>
                <div id='navCarousel' className='flex items-center gap-4 absolute bottom-23 left-45'>
                    <input type="radio" className='menuActive' name="carousel" id="slide1" checked={activeSlide === 0} onChange={moveLeft} />
                    <input type="radio" className='menuActive' name="carousel" id="slide2" checked={activeSlide === 1} onChange={moveCenter} />
                    <input type="radio" className='menuActive' name="carousel" id="slide3" checked={activeSlide === 2} onChange={moveRigth} />
                </div>

                <section className='flex justify-center'>
                    <nav>
                        <div id='divLogoNav' className='bg-[#EFEFEF] h-[100%] w-[136px] flex items-center justify-center'>
                            <img src="./imgs_header/logo.svg" alt="" className='absolute top-[6px]' />
                        </div>
                        <div className='bg-[#1E1E1E] flex items-center gap-4 h-[100%] border-r-2' style={{ padding: '5px 30px' }}>
                            <img src="./imgs_header/menu_01.svg" alt="" />
                            <p className='font-bold'><strong>produtos</strong></p>
                        </div>
                        <div className='bg-[#1E1E1E] flex items-center gap-4 h-[100%] border-r-2' style={{ padding: '5px 30px' }}>
                            <img src="./imgs_header/menu_02.svg" alt="" />
                            <p className='font-[10]'>coleções</p>
                        </div>
                        <div id='divMenuLoacal' className='bg-[#1E1E1E] flex items-center justify-end gap-4 border-r-2 w-[45%] h-[100%]' style={{ padding: '5px 30px' }}>
                            <p className='cursor-pointer hover:scale-[1.2] hover:text-[#FFE4B3] duration-75'><a href="#">blog</a></p>
                            <p className='cursor-pointer hover:scale-[1.2] hover:text-[#FFE4B3] duration-75'><a href="#">lookbook</a></p>
                            <p className='cursor-pointer hover:scale-[1.2] hover:text-[#FFE4B3] duration-75'><a href="#">sobre a Gat</a></p>
                            <p className='cursor-pointer hover:scale-[1.2] hover:text-[#FFE4B3] duration-75'><a href="#">wishlist</a></p>
                        </div>
                        <div className='bg-[#1E1E1E] flex items-center gap-4 h-[100%] border-r-2' style={{ padding: '5px 10px' }}>
                            <label htmlFor="search">
                                <img src="./imgs_header/search.svg" alt="" className='' />
                            </label>
                            <input type="text" name="search" id="searchInput" placeholder='digite aqui o que procura' className='w-[200px] focus:border-none' />
                        </div>
                        <div className='bg-[#1E1E1E] h-[100%] w-[40px] flex items-center justify-center border-r-2'>
                            <img src="./imgs_header/user.svg" alt="" />
                        </div>
                        <div className='bg-black flex items-center justify-center gap-4 h-[100%] w-[72px]'>
                            <img src="./imgs_header/cart.svg" alt="" />
                            <img src="./imgs_header/notification.svg" alt="" className='absolute top-2 right-4' />
                        </div>
                    </nav>
                </section>
            </header>

            <main className='w-[100vw] h-auto text-white'>
                <section className='flex justify-center'>
                    <div className='bg-black w-[90vw] h-[9px]'></div>
                </section>
                <section className='flex justify-center'>
                    <div className='bg-[#DE5A53] w-[90vw] h-[238px] flex items-center justify-center'>
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
                <section style={{ marginTop: '80px' }}>
                    <span className='flex justify-between items-start' style={{margin: '0px 30px 0px 127px'}}>
                        <h2 className='bg-[#4DA1B1] w-[483px] h-[210px] text-[50px] flex justify-end items-center' style={{ paddingRight: '53px', lineHeight:'50px'}}>MINIMA <br /> LISMO</h2>
                        <p className='text-black text-[20px]' style={{fontFamily: 'SoraBold'}}><strong>COLEÇÕES</strong></p>
                        <p className='text-black underline text-[14px]' style={{ fontFamily: 'SoraExtraLight'}}><a href="#">VER TODAS</a></p>
                        <span className='flex'>
                            <img src="./imgs_carousel/navegacao/ArrowLeft.svg" alt="seta esquerda" />
                            <img src="./imgs_carousel/navegacao/ArrowRight.svg" alt="sets direita" />
                        </span>
                    </span>
                    <img src="./imgs_collection_feature/image 5.png" alt="" className='absolute' style={{ marginTop: '-158px'}} />
                    <img src="./imgs_collection_feature/Rectangle 33.png" alt="" className='absolute left-[270px] top-[] -z-1 scale-[1.5]'/>
                    <div className='absolute right-[72px]'>
                        <span className='flex justify-center'>
                            <img src="./imgs_collection_feature/Rectangle 34.png" alt="" className='absolute top-[-20%] scale-[1.2]' />
                            <img src="./imgs_collection_feature/image 25.png" alt="" className='z-1'/>
                        </span>
                    </div>
                </section>
            </main>
            <footer></footer>
        </div>
    );
}

export default Home;