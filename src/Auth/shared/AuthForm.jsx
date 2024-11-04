export function AuthForm({ handleChange, handleSubmit, formData, signUpAction }) {
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username</label>
            <input
                type='text'
                id='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
            />
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
            />
            {signUpAction && (<>
                <label htmlFor='passwordConf'>Confirm Password</label>
                <input
                    type='password'
                    id='passwordConf'
                    name='passwordConf'
                    value={formData.passwordConf}
                    onChange={handleChange}
                />
            </>
            )}
            <input type='submit' value={signUpAction ? 'Sign Up' : 'Sign In'} />
        </form>
    )
}