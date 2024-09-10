import React, { useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import $ from 'jquery';  // Import jQuery

const Navbar = () => {
    const location = useLocation();

    useEffect(() => {
        const updateSelector = () => {
            const tabsNewAnim = $('#navbarSupportedContent');
            const activeItemNewAnim = tabsNewAnim.find('.active');
            const activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
            const activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
            const itemPosNewAnimTop = activeItemNewAnim.position();
            const itemPosNewAnimLeft = activeItemNewAnim.position();
            $(".hori-selector").css({
                "top": itemPosNewAnimTop.top + "px", 
                "left": itemPosNewAnimLeft.left + "px",
                "height": activeWidthNewAnimHeight + "px",
                "width": activeWidthNewAnimWidth + "px"
            });

            $("#navbarSupportedContent").off("click", "li").on("click", "li", function () {
                $('#navbarSupportedContent ul li').removeClass("active");
                $(this).addClass('active');
                const activeWidthNewAnimHeight = $(this).innerHeight();
                const activeWidthNewAnimWidth = $(this).innerWidth();
                const itemPosNewAnimTop = $(this).position();
                const itemPosNewAnimLeft = $(this).position();
                $(".hori-selector").css({
                    "top": itemPosNewAnimTop.top + "px", 
                    "left": itemPosNewAnimLeft.left + "px",
                    "height": activeWidthNewAnimHeight + "px",
                    "width": activeWidthNewAnimWidth + "px"
                });
            });
        };

        updateSelector();
        
        $(window).on('resize', function () {
            setTimeout(updateSelector, 500);
        });

        $(".navbar-toggler").off("click").on("click", function () {
            $(".navbar-collapse").slideToggle(300);
            setTimeout(updateSelector, 300);
        });
    }, [location]);

    useEffect(() => {
        // Set active class on the current page
        const path = window.location.pathname.split("/").pop() || 'index.html';
        const target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
        target.parent().addClass('active');
    }, []);

    return (
        <nav className="navbar navbar-expand-custom navbar-mainbg">
            <Link className="navbar-brand navbar-logo" to="/">
                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKgAswMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcDBAUCAf/EAD0QAAIBAgMFBAgDBQkAAAAAAAABAgMEBREhBhIxQVEiYXGBExUjkaGxwdEUQlIkMlPh8AclM0RicoKS8f/EABoBAQACAwEAAAAAAAAAAAAAAAAEBQIDBgH/xAAvEQACAQMDAgMGBwEAAAAAAAAAAQIDBBEFITESE0FRcTJhgdHh8AYUIpGhscHx/9oADAMBAAIRAxEAPwC8QAAAAAAAAAAAACD7Q7cejqStsF3J5aSuZLNf8Fz8Xp3MyjFyeESbW0q3U+mmvkicApa7xTELyTd1e3FXPinUe7/1WnwNaFWpTkpU6koSXBxk0zd2H5l1H8PSxvU39PqXkCpMM2pxfD5R3bqVxSXGncNzz83qveWHs7tBa47QbpL0VxBe1oSebj3p813/ACNc6Uo7ldeaXXtV1PePmv8ATsAA1laAAAAAAAAAAAAAAAAAAAAAADFdXFO1t6les8oU45sHqTbwiMf2gYnK3w12VCbjUrJeka5Qz4efyzK2JRiNO5xmpVcY71xcVFuxz0WqyXgkSXBticPs6cZ38VeXGWu//hruUefn8CZtSjhnV29xQ062UZ+0/L74Kx3o7yjvLN8Fme5xlTWdSLiuslkXfQoUbeChQpU6UFwjCKivgZDD8x7jS/xEs7U/5+hRSaks0013G1ht7Ww6/o3ds8qlOWeWeklzi+5luX+DYbiCavLKjUbWW/u5SXhJar3kE2o2TeEpXllN1LPeSnGb7VNt6a81np14cTONWMtmTLbV7e6famsN+D4fuLDsbqlfWlK6t5Z06sVKP28TOQP+z/FvRV54VXl2Kjc6GfKX5o+fHyfUnhGnHplg5i9tnbVnT8PD0AAMCIAAAAAAAAAAAAAAAAAACNbZXMty3s4PSbdSfguHxz9xJSIbVr+9YN/wI5e+RuoLM0TdPinXTfgcilOVGcKlPSUGpR8UWDa14XNvTr0/3akVJFdVJZI72x2KL0k8Oqy45zo5/FfX3m+4hmOfIstQt3Updxcr+iWAAhFACI7f3mVvQsYvWb9JPwWi+OfuJVXrQt6M61WW7CEXKT7itMVuZ395VuavGb0X6VyRvoQzLPkWuk0Out3HxH+zjRnUt68K1GW7UpyUoPo1qi4bG5jeWVC5gso1qcZpdM1mVFVgWdsm29nbHP8Ah/Vmy5WyZYa5FOlCfinj7/Y6wAIhzQAAAAAAAAAAAAAAAAAAIxthSyqW9fLRxcG/DVfNknObtBaO8wqtCCzqQ9pDxX8s15mylLpmmSbSp260Wyv69TiaTualCtCtRk41ISUoyXJoyVqnTmaFaebLBnZ0qe25bWBYpTxfDad1TyUn2akF+Sa4r+uTR0Cqdkcc9T4nlXllaV8o1c+EHyl5c+59yLIxe/jYWcqqydSXZprq/sQJ02pYRyt/YSoXHRFbS4+XwONtTf78lY0n2Y61X1fJfX3EWqwNqUpTk5TblKTzbfNmOpHNE2EFCOC4tqaoQUEcytHJN9C0sKtvweGWts+NKlGMvHLX4kHwKw/G4vQg17Om/ST8F/PJFhke5lukQNYr56aa9QACKUgAAAAAAAAAAAAAAAAAAAABWW12HvDMTmoLKhXznT6LqvJ/BojdSRbe0+ELGMLnRhkriHboyenaXLwfD48ioqilGcozi4yi2pRfFNcUybTn1RO00i6VxRw/ajs/mfEnJpJZt6JdSVU61xK1tqNzVdR0Ke5Fvkun0z7kcfCrb/MTXdD7nVizcl4m66kpNLyMqeZ9PEXkzqYHh/4+8W+vY08pVO/ovMSkorLIFSapxcpcI7uzOH/hLN1pr2tfKT7o8l9fM7IBXSk5PLOYq1HVm5y8QADE1gAAAAAAAAAAAAAAAAAAAAAgW3WAwV9SxCi4xhXlu1455PeS0kvFLXy6snk5RhCU5tRjFZtvgkV5jmJyxO9dRZqjDs0ovp18X9jfQi3LJa6Qqqr9cHhLk0YpRSilkloke4vJmOLPZOL9mVNc3GK5uTyS8WWBhdlCws4UI6y4zl+qXMqjFbrP9mg9OM/oibbB45+Ns/V9zPO5t49ht61Kf3XD3d5GuMtbEDVLaq7dVFwuV/pLAAQzmgAAAAAAAAAAAAAAAAAAAAAAc3HsUjhVhKro60uzSg+cuvgj1Jt4RnTpyqSUI8s422OLZL1bby1eTrtcukfqyJp5M8yqSqVJVKknKc23KT4tvmfSxhBQjg6+3t429NQRkRiu7hW9Fy/O9IrvMtCnUr1YUaUXKpN7sUubNzbDZueH2lveUZSqQjFQuOkZZ6SXc88vcJTSeDNVKaqxpze7Inm222229W2bVhdVbK7o3VvLdq0pb0X9PBrTzNVGWJ4Wc0msPguLCMRo4rh9K7oaKaylFvWEuaZulYbIYy8Jv92tLK0r5Kpnwg+Uvv3eBZ611RCqQ6GcNqFm7Wthey+Pv3AAGsgAAAAAAAAAAAAAAAAAAHirUhRpTq1ZKFOCcpSfBJcysscxaWK4hKtLNUo9mlF8o/d/1wO1tvjPpJ+rLaXZg068lzfKPlxfl3kSJlCnhdTOm0my7cO9Pl8en1MyPaZig80djZvCnil9lUX7PSylVfXpHz+RIlJRWWWVacaUHOXCJBsdhPoqfrGvHt1FlRT5R6+fy8SR3FGnc0KlCvBTpVIuM4vg0z2kkkkskuCR9K2c3KWTjq9xOtVdR/8ACnsfwipg2JztZ5ypvtUptfvQ+64P+ZoxLX2owWOM4c6cUlc0u3Qk+vR9z+z5FVOMoSlCcXGcW1KL4primTKU+pHX6de/mqO/tLn5/E9wXBFgbE4x6eh6uuJe1pR9k3+aHTxXy8GQGnxRt2lWpb3FOvRk4VKct6LXUznBTjg9vraNzScHz4epboNHB8Rp4pYwuKeSlwqQ/TLmjeK9pp4ZxU4ShJxlygADwxAAAAAAAAAAAABz8fu69jg9zc2sFKrCOmfLXJvy4+R0DxXpQr0KlGqt6nUi4yXVNZM9WzM6coxmnJZWSnN+UpNzbk28228231PYu7edpd1rar+/Sm4N9cnxPMXmu8s0d7s1lGe1oVbm4p29vHeq1JbsUWjhGH08MsadtS1a1nL9UubOHsVg/wCHoesbiPtq0fZJ/lh18X8vFkpIdep1PpRy+rXndn2ocL+X9AACOU4INt5ge7P1rbR7MslcRXJ8FL6Py7ycnirThWpTpVYqdOcXGUWtGnxRlCTi8kq0upW1VVI/H0KbprUz0+Zu47hM8HxGdHV0Z9qjJ849PFcP/TThwRZRaayjslUjUipxezO5sld17fGKVGit6Fx2akM+STeflr8SwyGbCWe9XuL2S0gvRQfe9X8MveTMg3DTnsctq0oyuMLwW4ABpKwAAAAAAAAAAAAAAAr3b6y9BitO7iso3MNf90dH8N33M1dksG9a3+/Wj+yUGnU/1vlH793iTParCp4thfoaCXp4VIzp5vJdHn5Nm7hOH0cLsKVpQ1UF2pZazlzbJHexTwuS9Wp9FioRf6+Ph5/tsjcABHKIAAAAAA5uP4VDFsPlR0VaPapTfKX2fArWcJ0Zyp1YuM4NxlF8U1xLcI/jWz0b7FLW7pqKi5pXMf1RWufwy810JFGr07Pgt9NvlRzTqP8ATz9+pvbO2f4HB7elJZVJR359d56/Dh5HSANDeXkq6k3Um5vlgAHhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/9k=" alt="Logo" className="navbar-logo-img" /> {/* Add the logo image */}
                Breast Cancer Classification
            </Link>
            <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars text-white"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <div className="hori-selector"><div className="left"></div><div className="right"></div></div>
                    <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
                        <Link className="nav-link" to="/"><i className="fas fa-home-alt"></i>Home</Link>
                    </li>
                    <li className={`nav-item ${location.pathname === "/about" ? "active" : ""}`}>
                        <Link className="nav-link" to="/about"><i className="far fa-user"></i>About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
