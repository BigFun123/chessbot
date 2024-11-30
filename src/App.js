import './App.css';
//import ChatBot from './components/ChatBot';
import ChessMenu from './components/chess/ChessMenu';
import { ChessContextProvider } from './components/chess/context';


function App() {

    return ( <
        div className = "App" >
        <
        header className = "App-header" > { /* {process.env.NODE_ENV === "development" && JSON.stringify(process.env)} */ } <
        ChessContextProvider >
        <
        ChessMenu / >
        <
        /ChessContextProvider> { /* <ChatBot /> */ } <
        /header> <
        /div >
    );
}

export default App;