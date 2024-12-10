import { Component } from 'react'
import './index.css'
import { TbPointerFilled } from "react-icons/tb"
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie'
class Login extends Component {
    state = {
        email: '',
        password: '',
        showEmailErrMsg: false,
        emailErrMsg: '',
        showPasswordErrMsg: false,
        passwordErrMsg: '',
        showPasword: false,
        usersList: []
    }

    submit = (e) => {
        e.preventDefault()
        const { history } = this.props
        const { usersList, email, password } = this.state
        const emailValidation = this.emailValidation()
        const passwordValidation = this.passwordValidation()
        if (emailValidation && passwordValidation) {
            console.log('reached submit')

            const user = usersList.find(eachUser => eachUser.email === email)
            console.log(user)
            if (user !== undefined) {

                if (user.password === password) {
                    Cookie.set('isLoggedIn', 'yes', { expires: 10 })
                    history.replace('/')

                } else {
                    this.setState({ showPasswordErrMsg: true, passwordErrMsg: 'Wrong Password' })
                }
            } else {
                this.setState({ showEmailErrMsg: true, emailErrMsg: "User doesn't exist" })
            }
        }

    }
    emailValidation = () => {
        const { email } = this.state
        if (email === '') {
            this.setState({ showEmailErrMsg: true, emailErrMsg: 'Required' })
            return false
        }
        this.setState({ showEmailErrMsg: false, emailErrMsg: '' })
        return true
    }

    passwordValidation = () => {
        const { password } = this.state
        if (password === '') {
            this.setState({ showPasswordErrMsg: true, passwordErrMsg: 'Required' })
            return false
        }
        this.setState({ showPasswordErrMsg: false, passwordErrMsg: '' })
        return true
    }

    changeVisibility = () => {
        this.setState(prevState => ({ showPasword: !prevState.showPasword }))
    }

    chageEmail = (e) => {
        this.setState({ email: e.target.value })
    }
    changePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    getUsersListFromLocalStorage = () => {
        const strigifiedList = localStorage.getItem('users')
        const parsedList = JSON.parse(strigifiedList)
        if (parsedList === null) {
            this.setState({ usersList: [] })
        } else {
            this.setState({ usersList: parsedList })
        }
    }
    componentDidMount() {
        this.getUsersListFromLocalStorage()
    }

    render() {
        const { showPasword, usersList, showEmailErrMsg, showPasswordErrMsg, emailErrMsg, passwordErrMsg } = this.state
        // console.log(usersList)
        return (
            <div className='login-background'>
                <div className='login-container'>

                    <div className='login-side-img'>
                        <img src="https://static.vecteezy.com/system/resources/previews/003/689/228/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg" />

                        <div className='container'>
                            <div className="icon-container">
                                <h1 className='at-the-date'>@</h1>
                            </div>

                            <div className='text-content'>
                                <p>ServicePro is your one-stop solution to troubleshoot, choose a vendor and book a technician.</p>
                            </div>
                            <TbPointerFilled className='arrow' />
                        </div>

                    </div>

                    <form className='login-form' onSubmit={this.submit}>

                        <h1>Login To Your Account</h1>
                        <div className="align">
                            <label htmlFor="email" className='labelEl' >Email</label>
                            <input id='email' type='text' className='inputEl' placeholder='example.email@gmail.com' onChange={this.chageEmail} onBlur={this.emailValidation} />
                            {showEmailErrMsg && <p className='errMsg'>*{emailErrMsg}</p>}
                        </div>
                        <div className="align">
                            <label htmlFor="password" className='labelEl' >Password</label>
                            <div className='password-container' >
                                <input className='inputEl' id='password' type={showPasword ? 'text' : 'password'} placeholder='Enter at least 8+ characters' onChange={this.changePassword} onBlur={this.passwordValidation} />
                                {showPasword ? <LuEye className='eye-icon' onClick={this.changeVisibility} /> : <LuEyeOff className='eye-icon' onClick={this.changeVisibility} />}
                            </div>
                            {showPasswordErrMsg && <p className='errMsg'>*{passwordErrMsg}</p>}

                        </div>
                        <p className='forgot'>FORGOT PASSWORD?</p>
                        <button className='login-button' type='submit'>Login</button>
                        <div className='seperator-align'>
                            <hr className='seperator' />
                            <p className='or'>OR</p>
                            <hr className='seperator' />
                        </div>
                        <div className="align-buttons">
                            <div className="button-container">
                                <FcGoogle />
                            </div>
                            <div className="fa-button-container">
                                <FaFacebook />
                            </div>
                            <div className="button-container">
                                <FaApple />
                            </div>

                        </div>
                        <div className="new-user">
                            <p className='newuser'>New User?</p>
                            <Link to='/register' className='link-item'>
                                <p className='register'>Register</p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}
export default Login


