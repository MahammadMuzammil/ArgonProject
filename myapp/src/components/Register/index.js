import { Component } from 'react'
import './index.css'
import { TbPointerFilled } from "react-icons/tb"
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { Link } from 'react-router-dom';
class Login extends Component {
    state = {
        name: '',
        showNameErrMsg: false,
        user_type: 'User',
        nameErrMsg: '',
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
        const { usersList, email, password, name, user_type } = this.state
        const emailValidation = this.emailValidation()
        const passwordValidation = this.passwordValidation()
        const nameValidation = this.nameValidation()
        if (emailValidation && passwordValidation && nameValidation) {
            const newUser = {
                name,
                email,
                password,
                user_type,

            }
            const userPresent = !!usersList.find(eachUser => eachUser.email === email)
            if (userPresent) {
                this.setState({ emailErrMsg: 'User with this email Already Exixts', showEmailErrMsg: true })
            } else {
                usersList.push(newUser)
                localStorage.setItem('users', JSON.stringify(usersList))
                history.replace('/login')
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
    nameValidation = () => {
        const { name } = this.state
        if (name === '') {
            this.setState({ showNameErrMsg: true, nameErrMsg: 'Required' })
            return false
        }
        this.setState({ showNameErrMsg: false, nameErrMsg: '' })
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
    chageName = (e) => {
        this.setState({ name: e.target.value })
    }

    changePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    changeUserType=(e)=>{
        this.setState({user_type:e.target.value})
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
        const { showPasword, showEmailErrMsg, showPasswordErrMsg, emailErrMsg, passwordErrMsg, nameErrMsg, showNameErrMsg ,user_type} = this.state
        console.log(user_type)
        return (
            <div className='login-background'>
                <div className='login-container'>

                    <div className='register-side-img'>
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

                    <form className='register-form' onSubmit={this.submit}>
                        <h1 className='heading'>Create An Account</h1>
                        <div className="align">
                            <label htmlFor="name" className='labelEl' >FULL NAME</label>
                            <input id='name' type='text' className='inputEl' placeholder='Jone Doe' onChange={this.chageName} onBlur={this.nameValidation} />
                            {showNameErrMsg && <p className='errMsg'>*{nameErrMsg}</p>}
                        </div>
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
                        <label htmlFor="userType" className='user-type-label'>User Type</label>
                        <select onChange={this.changeUserType} id='userType' className='user-type' value={user_type}>
                            <option value="USER">User</option>
                            <option value="TECHNICIAN">Technician</option>
                        </select>

                        <div className="terms-conditions">
                            <input type="checkbox" id='terms' />
                            <label htmlFor='terms'>By signing up,I Agree with the  <span className='terms'>Terms of Use & Privacy Policy </span></label>
                        </div>
                        <button className='login-button' type='submit'>Sign up</button>
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
                            <p className='newuser'>Have An Account?</p>
                            <Link to='/login' className='link-item'>
                                <p className='register'>Login</p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}
export default Login


