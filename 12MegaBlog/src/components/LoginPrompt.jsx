import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from './index'

function LoginPrompt({ 
    title = "Welcome to MegaBlog! 📝", 
    message = "Please login to access this content", 
    bgColor = "bg-blue-50", 
    borderColor = "border-blue-200",
    icon = "🔐"
}) {
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <div className={`${bgColor} border ${borderColor} rounded-xl p-8`}>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                {icon} {title}
                            </h1>
                            <p className="text-lg text-gray-600 mb-6">
                                {message}
                            </p>
                            <div className="space-x-4">
                                <Link to="/login">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        Login Now
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-green-600 hover:bg-green-700">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default LoginPrompt 