import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from 'recharts';
import { Select } from 'antd';
import LinkTable from './components/linkTable';
import './App.css';

const { Option } = Select;

const formatData = (dailyAccess) => {
  const formattedData = dailyAccess.labels.map((label, index) => ({
    label,
    value: dailyAccess.accessData[index],
  }));

  return { ...dailyAccess, formattedData };
};

const App = () => {
  const [data, setData] = useState({
    dailyAccess: { labels: [], accessData: [], total: 0 },
    linksAccessed: [],
  });
  const [selectedPeriod, setSelectedPeriod] = useState('all'); 

  useEffect(() => {
    fetchData();
  }, [selectedPeriod]); 

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/access?period=${selectedPeriod}`);
      if (
        response.data &&
        response.data.dailyAccess &&
        response.data.dailyAccess.labels &&
        response.data.dailyAccess.accessData &&
        response.data.dailyAccess.total !== undefined &&
        response.data.linksAccessed
      ) {
        const formattedData = formatData(response.data.dailyAccess);
        setData({ ...response.data, dailyAccess: formattedData });
      } else {
        console.error('Invalid data structure in API response');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
  };

  return (
    <div>
      <header className="app-header">
        <h1>Painel Analytics</h1>
      </header>        
      <div className="App">
        <Select defaultValue="all" style={{ width: 120 }} onChange={handlePeriodChange}>
          <Option value="all">Todos</Option>
          <Option value="last7">Últimos 7 dias</Option>
          <Option value="last30">Últimos 30 dias</Option>
        </Select>

        <BarChart
          width={500}
          height={300}
          data={data.dailyAccess.formattedData}
          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#66c2a5" barSize={30} radius={[5, 5, 0, 0]} name="Acessos por Dia" />
        </BarChart>

        <LinkTable links={data.linksAccessed} />
      </div>
    </div>
  );
};

export default App;
