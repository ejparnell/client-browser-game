import { useState, useContext } from 'react'
import { signUp } from '../user-services'
import { AppContext } from '../../components/App/App'
import { AuthForm } from '../shared/AuthForm'

export function SignUp() {
    const { userContext, messageContext } = useContext(AppContext)

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConf: '',
    })

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const newUserResponse = await signUp(formData)
            userContext.setUser(newUserResponse.user)
            messageContext.handleAddMessage({ id: Date.now(), message: `Welcome ${newUserResponse.user.username}!`, type: 'success' })
        } catch (error) {
            messageContext.handleAddMessage({ id: Date.now(), message: error.message, type: 'error' })
        }
    }

    return (
        <AuthForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
            signUpAction={true}
        />
    )
}