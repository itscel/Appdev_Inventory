import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import './StocksByCategory.css'


ChartJS.register(CategoryScale, ArcElement, Title, Tooltip, Legend);

const StockByCategory = () => {
    const [items, setItems] = useState([]);
    const [StockByCategory, setStockByCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userID');

                if (!token || !userId) {
                    setError('User not authenticated.');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`http://localhost:5001/api/inv/items?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setItems(data.items);

                
                const groupedStock = {
                    Men: [],
                    Women: [],
                    Kids: [],
                };

                data.items.forEach((item) => {
                    if (item.sizes.some(size => size.quantity < 10)) {
                        groupedStock[item.category]?.push(item);
                    }
                });

                setStockByCategory(groupedStock);
            } catch (err) {
                console.error('Error fetching items:', err);
                setError('Failed to load items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    
    const chartData = {
        labels: ['Men', 'Women', 'Kids'],
        datasets: [
            {
                label: 'Stock by Category',
                data: [
                    StockByCategory.Men?.reduce((acc, item) => acc + item.sizes.filter(size => size.quantity < 10).length, 0) || 0,
                    StockByCategory.Women?.reduce((acc, item) => acc + item.sizes.filter(size => size.quantity < 10).length, 0) || 0,
                    StockByCategory.Kids?.reduce((acc, item) => acc + item.sizes.filter(size => size.quantity < 10).length, 0) || 0,
                ],
                backgroundColor: ['#6E3482', '#49225B', '#A56ABD'], 
                borderColor: '#FFFFFF', 
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Stock Quantities by Category',
                font: {
                    size: 18,
                    family: 'Arial, sans-serif',
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const category = tooltipItem.label;
                        const quantity = tooltipItem.raw;
                        return `${category}: ${quantity} items`;
                    },
                },
            },
        },
    };

    if (loading) {
        return <div className="loading-message">Loading items...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="StockByCategory-box">
            <div className="chart-container">
                <Doughnut data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default StockByCategory;
