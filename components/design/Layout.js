import Navbar from '../Navbar'

const Layout = ({ children }) => {
    return (
        <div className='flex min-h-screen bg-slate-200 invert'>
            <Navbar />
            {children}
        </div>
    )
}
export default Layout