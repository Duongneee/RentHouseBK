import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import axios from '../../axiosConfig';
import { format, subDays } from 'date-fns';

const AdminStatistic = () => {
    const [data, setData] = useState([]);
    const [postData, setPostData] = useState([]);
    const [days, setDays] = useState(7);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transaction = await axios.get(`/api/v1/user/admin-statistic/transaction?days=${days}`);
                const apiData1 = transaction.data.map(stat => ({
                    ...stat,
                    totalAmount: Number(stat.totalAmount)
                }));

                const post = await axios.get(`/api/v1/user/admin-statistic/post?days=${days}`);
                const apiData2 = post.data;

                const user = await axios.get(`/api/v1/user/admin-statistic/user?days=${days}`);
                const apiData3 = user.data;

                const today = new Date();
                const dateArray = [];
                for (let i = 0; i < days; i++) {
                    const date = subDays(today, i);
                    dateArray.push(format(date, 'yyyy-MM-dd'));
                }

                const mergedData = dateArray.map((date, index) => {
                    const record = apiData1.find(stat => stat.date === date);
                    return record ? { ...record, key: index } : { date, totalAmount: 0, count: 0, key: index };
                });

                const mergedPostData = dateArray.map((date, index) => {
                    const record = apiData2.find(stat => stat.date === date);
                    return record ? { ...record, key: index } : { date, count: 0, key: index };
                });

                const mergedUserData = dateArray.map((date, index) => {
                    const record = apiData3.find(stat => stat.date === date);
                    return record ? { ...record, key: index } : { date, count: 0, key: index };
                });

                setData(mergedData.reverse());
                setPostData(mergedPostData.reverse());
                setUserData(mergedUserData.reverse());
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchData();
    }, [days]);

    const handleDaysChange = (e) => {
        setDays(e.target.value);
    };

    return (
        <div className="space-y-8 p-8">
            <div className="flex items-center space-x-4">
                <label htmlFor="days-select" className="font-semibold text-lg">Tìm kiếm dữ liệu trong: </label>
                <select 
                    id="days-select" 
                    value={days} 
                    onChange={handleDaysChange} 
                    className="p-3 rounded-lg border border-gray-300 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value={3}>3 ngày</option>
                    <option value={7}>7 ngày</option>
                    <option value={30}>30 ngày</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Biểu đồ trên */}
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis yAxisId="left" />
                            <Tooltip />
                            <Line strokeWidth={4} yAxisId="left" type="monotone" dataKey="totalAmount" stroke="#82ca9d" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <h2 className="text-xl font-semibold text-center mt-4">Thống kê lượng tiền nạp vào theo ngày</h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" barSize={30} fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                    <h2 className="text-xl font-semibold text-center mt-4">Thống kê số lượng giao dịch theo ngày</h2>
                </div>

                {/* Biểu đồ dưới */}
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={postData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" barSize={30} fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                    <h2 className="text-xl font-semibold text-center mt-4">Thống kê số lượng bài đăng mới theo ngày</h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={userData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" barSize={30} fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                    <h2 className="text-xl font-semibold text-center mt-4">Thống kê số lượng người dùng mới theo ngày</h2>
                </div>
            </div>
        </div>
    );
};

export default AdminStatistic;
