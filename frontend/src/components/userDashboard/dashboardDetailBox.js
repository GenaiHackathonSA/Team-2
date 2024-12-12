import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import incomeImg from '../../assets/images/income.png';
import expenseImg from '../../assets/images/expense.png';
import cashInHandImg from '../../assets/images/cashInHand.png';
import transactionImg from '../../assets/images/transaction.png';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import userService from "../../services/userService";
import authService from "../../services/auth.service";

function DashboardDetailBox({ total_income, total_expense, cash_in_hand, no_of_transactions }) {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetch('https://675172c8d1983b9597b2ceaa.mockapi.io/mockads/v1/ad')
            .then(response => response.json())
            .then(data => setOffers(data))
            .catch(error => console.error('Error fetching offers:', error));
    }, []);

    const handleBannerClick = (offer) => {
        const userConfirmed = window.confirm(`Do you want to purchase from this offer: ${offer.title}?`);
        if (userConfirmed) {
            const payload = {
                userEmail: "user@gmail.com",
                categoryId: offer.id,
                description: offer.title,
                amount: offer.price,
                date: new Date(),
                currency: "USD"
            };

            fetch('http://localhost:8080/spendwise/transaction/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${authService.authHeader().Authorization}`
                },
                body: JSON.stringify(payload),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Transaction successful:', data);
                    alert('Transaction successful!');
                })
                .catch(error => {
                    console.error('Error making transaction:', error);
                    alert('Transaction failed!');
                });
        }
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
    };

    return (
        <div className='dashboard'>
            <div className='offers-slider'>
                <Slider {...sliderSettings}>
                    {offers.map(offer => (
                        <div key={offer.id} onClick={() => handleBannerClick(offer)}>
                            <a href={offer.link} target="_blank" rel="noopener noreferrer">
                                <img src={offer.imageUrl} alt={offer.title} />
                            </a>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className='details'>
                <Box amount={'$ ' + total_income} src={incomeImg} title="Income" />
                <Box amount={'$ ' + total_expense} src={expenseImg} title="Expense" />
                <Box amount={'$ ' + cash_in_hand} src={cashInHandImg} title="Cash in hand" />
                <Box amount={no_of_transactions} src={transactionImg} title="No of transactions" />
            </div>
        </div>
    );
}

function Box({ amount, src, title }) {
    return (
        <div className='box'>
            <div>
                <h2>{amount}</h2>
                <h4>{title}</h4>
            </div>
            <img src={src} alt={title} />
        </div>
    );
}

export default DashboardDetailBox;