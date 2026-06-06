import Sidebar from "./components/Sidebar"
import Chat from "./components/Chat"

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default App
