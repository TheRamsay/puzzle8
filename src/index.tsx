import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import {createTheme, ThemeProvider} from "@mui/material";

createTheme()

const theme = createTheme({
    palette: {
        primary: {
            main: "#EE9D24" // This is an orange looking color
        },
        secondary: {
            main: "#282C34" //Another orange-ish color
        }
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
