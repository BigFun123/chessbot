import './App.css';
//import ChatBot from './components/ChatBot';
import ChessMenu from './components/chess/ChessMenu';
import { ChessContextProvider } from './components/chess/context';
import FullScreenButton from './components/FullScreenButton';
import URLButton from './components/URLButton';


function App() {

    return (<div className="App" >
        <header className="App-header" > { /* {process.env.NODE_ENV === "development" && JSON.stringify(process.env)} */}
            <URLButton className="topleft" url="https://wonderland.social" label="Wonderland Chess" />
            <FullScreenButton label="♐FS"></FullScreenButton>
        </header>
        <ChessContextProvider >
            <ChessMenu />
        </ChessContextProvider> { /* <ChatBot /> */}

    </div>
    );
}

export default App;