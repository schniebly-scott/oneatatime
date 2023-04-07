import React from 'react';
import './App.css';

//imports from my components
import Calendar from './Components/Calendar'
import Sidebar from './Components/Sidebar';
import Todo from './Components/Todo';
import TopBar from './Components/TopBar';

//imports from material UI
import Stack from '@mui/material/Stack';

function App() {
  return (
    <Stack spacing={0} style={{ flex: "auto" }}>
      <TopBar />
      <div className='grid-container'>
        <Calendar />
        <Todo />
        <Sidebar />
      </div>
    </Stack>
  );
}

export default App;
