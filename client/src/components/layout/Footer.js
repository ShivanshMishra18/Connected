import React from 'react'

function Footer() {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center">
            Copyright &copy; {new Date().getFullYear()} Connected
        </footer>
    )
}

export default Footer