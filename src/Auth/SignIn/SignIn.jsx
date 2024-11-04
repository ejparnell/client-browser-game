import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../user-services'
import { AppContext } from '../../components/App/App'
import { AuthForm } from '../shared/AuthForm'

export function SignIn() {
    const { userContext, messageContext } = useContext(AppContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const userResponse = await signIn(formData)
            userContext.setUser(userResponse)
            messageContext.handleAddMessage({ id: Date.now(), message: `Welcome ${userResponse.username}!`, type: 'success' })
            navigate('/games')
        } catch (error) {
            messageContext.handleAddMessage({ id: Date.now(), message: error.message, type: 'error' })
        }
    }

    return (
        <AuthForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
        />
    )
}