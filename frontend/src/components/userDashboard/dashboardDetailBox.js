import React from 'react';
import Slider from 'react-slick';
import incomeImg from '../../assets/images/income.png';
import expenseImg from '../../assets/images/expense.png';
import cashInHandImg from '../../assets/images/cashInHand.png';
import transactionImg from '../../assets/images/transaction.png';
import offer1Img from '../../assets/images/Frame 851.png'; // Add your offer images
import offer2Img from '../../assets/images/Frame 852.png'; // Add your offer images
import offer3Img from '../../assets/images/Frame 853.png'; // Add your offer images

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DashboardDetailBox({ total_income, total_expense, cash_in_hand, no_of_transactions }) {
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
                    <div>
                        <img src={offer1Img} alt="Offer 1"/>
                    </div>
                    <div>
                        <img src={offer2Img} alt="Offer 2"/>
                    </div>
                    <div>
                        <img src={offer3Img} alt="Offer 3"/>
                    </div>
                    {/* Add more offers as needed */}
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