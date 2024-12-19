import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './LowStockBySize.css';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LowStock = () => {
    const [items, setItems] = useState([]);
    const [lowStock, setLowStock] = useState({});
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

                // Calculate low stock by size
                const lowStockData = {
                    XS: [],
                    S: [],
                    M: [],
                    L: [],
                    XL: [],
                };

                data.items.forEach((item) => {
                    item.sizes.forEach((size) => {
                        if (size.quantity < 10) {
                            lowStockData[size.size]?.push({
                                name: item.name,
                                quantity: size.quantity,
                            });
                        }
                    });
                });

                // Sort low-stock items
                Object.keys(lowStockData).forEach((size) => {
                    lowStockData[size].sort((a, b) => a.quantity - b.quantity);
                });

                setLowStock(lowStockData);
            } catch (err) {
                console.error('Error fetching items:', err);
                setError('Failed to load items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    // Prepare data 
    const chartData = {
        labels: ['XS', 'S', 'M', 'L', 'XL'],
        datasets: [
            {
                label: 'Low Stock Quantities',
                data: [
                    lowStock.XS?.reduce((acc, item) => acc + item.quantity, 0) || 0,
                    lowStock.S?.reduce((acc, item) => acc + item.quantity, 0) || 0,
                    lowStock.M?.reduce((acc, item) => acc + item.quantity, 0) || 0,
                    lowStock.L?.reduce((acc, item) => acc + item.quantity, 0) || 0,
                    lowStock.XL?.reduce((acc, item) => acc + item.quantity, 0) || 0,
                ],
                backgroundColor: '#6E3482',
                borderColor: '#49225B',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Low Stock Quantities by Size',
                font: {
                    size: 18,
                    family: 'Arial, sans-serif',
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const size = tooltipItem.label;
                        const quantity = tooltipItem.raw;
                        return `${size}: ${quantity} pcs`;
                    },
                },
            },
        },
    };

    if (loading) {
        return <div>Loading items...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="lowstock-box">
     <div className="lowstock-chart-container">
    <Bar data={chartData} options={chartOptions} />
</div>

        </div>
    );
};

export default LowStock;
