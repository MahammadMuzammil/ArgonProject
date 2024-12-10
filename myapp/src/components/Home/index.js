import { Component } from 'react'
import './index.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'js-cookie'
class Home extends Component {
    state = {
        locations_list: [],
        search_input: '',
        suggestions_list: [],
        technicians_list: []
    }


    getLocations = async () => {

        const response = await fetch('http://localhost:3000/locations')
        const responseData = await response.json()
        this.setState({ locations_list: responseData })
        // console.log(responseData)

    }

    getTechnicians = async () => {
        const response = await fetch('http://localhost:3000/getTech')
        const responseData = await response.json()
        console.log(responseData)
        this.setState({ technicians_list: responseData })

    }

    componentDidMount() {
        this.getLocations()
        this.getTechnicians()
    }
    getSuggestions = async () => {
        const { search_input } = this.state
        console.log(search_input)
        const response = await fetch(`http://localhost:3000/suggestions?searchInput=${search_input}`)
        const responseData = await response.json()
        console.log(responseData)
        this.setState({ suggestions_list: responseData })
    }
    changeSearchInput = (e) => {
        this.setState({ search_input: e.target.value }, this.getSuggestions)
    }
    logout=()=>{
           Cookies.remove('isLoggedIn')
            const {history} = this.props
            history.replace('/login') 
    }
    render() {
        const { locations_list, suggestions_list, search_input, technicians_list } = this.state
        const settings = {
        
            infinite: true,  
            speed: 500, 
            slidesToShow: 3,  
            slidesToScroll: 1, 
            dots: true,  
        }

        const loggedIn = Cookies.get('isLoggedIn')
        if (loggedIn !== 'yes') {
          return  <Redirect to='/login' />
        }

        
        return (
            <div className="background">

                <div className='header'>
                    <img src="/blue logo.png" />
                    <div className='align-btn'>
                        <button className='bizBtn'>BizLogin</button>
                        <button className='login-btn' onClick={this.logout}>Logout</button>
                    </div>
                </div>

                <div className="top-section">
                    <div className="text-section">

                        <h1>Take care of your home needs now!</h1>
                        <p>ServicePro is your one-stop solution to troubleshoot, choose a vendor and book a technician.</p>
                        <div className="locations">
                            <select name="" id="">
                                {locations_list.map(eachLocation => (

                                    // console.log(eachLocation.place)
                                    <option value={eachLocation.place} id={eachLocation.id}>{eachLocation.place}</option>
                                ))}
                            </select>
                            <span className='places'>
                                Only in Ameerpet, Gachibowli, & Madhapur
                            </span>
                        </div>
                        <div className="searchbar-button">
                            <div className="input-suggestions">
                                <input type='search' className='search-input' placeholder='Search Home Appliances' onChange={this.changeSearchInput} />
                                <div className="suggestions-container">
                                    {search_input !== '' &&
                                        suggestions_list.map(eachSuggestion => (
                                            <p className='suggestion'>{eachSuggestion.type_name}</p>
                                        ))
                                    }

                                </div>
                            </div>


                            <button className='search-btn'>Search</button>
                        </div>

                    </div>
                    <img src="/Group 34.png" />
                </div>
                <div className="all-services-text-container">

                    <h1 className='all-services'>All Services</h1>
                    <p className='all-services-description'>The time is now for it to be okay to be great. For being a bright color. For standing out.</p>
                </div>
                <ul className='cards-container'>
                    <li className='card'>
                        <img src="/fridge.png" />
                        <h3>Fridge</h3>
                        <p>We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand.</p>
                    </li>
                    <li className='card'>
                        <img src="/fire-burner-thin 1.png" />
                        <h3>Gas Stove</h3>
                        <p>We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand.</p>
                    </li> <li className='card'>
                        <img src="/airconditioner.png" />
                        <h3>Air Conditioner</h3>
                        <p>Don't get your heart broken by people we love, even that we give them all we have. Then we lose family over time. As we live, our hearts turn colder..</p>
                    </li> <li className='card'>
                        <img src="/fridge.png" />
                        <h3>Fridge</h3>
                        <p>We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand.</p>
                    </li><li className='card'>
                        <img src="/airconditioner.png" />
                        <h3>Air Conditioner</h3>
                        <p>Don't get your heart broken by people we love, even that we give them all we have. Then we lose family over time. As we live, our hearts turn colder..</p>
                    </li>  <li className='card'>
                        <img src="/TV.png" />
                        <h3>Television</h3>
                        <p>What else could rust the heart more over time? Blackgold. The time is now for it to be okay to be great. or being a bright color. For standing out..</p>
                    </li>
                </ul>
                <h1 className='book-request'>Book a request in 3 simple steps</h1>
                <ul className='steps-container'>
                    <li className='step-container'>
                        <img src="/first.png" />
                        <h2>Provide your appliance details</h2>
                        <p>Let us know your appliance details and your issue.</p>

                    </li>
                    <li className='step-container'>
                        <img src="/second.png" />
                        <h2>Choose your technician</h2>
                        <p>Choose from a wide variety of technicians and vendors.</p>
                    </li>
                    <li className='step-container'>
                        <img src="/third.png" />
                        <h2>Get it fixed!</h2>
                        <p>The technician will arrive at your doorstep shortly to fix it!</p>
                    </li>
                </ul>
                <h1>Featured Technicians</h1>

                <Slider {...settings}>


                    {technicians_list.map(eachItem => {
                        const { name, photo, specialization, rating, description } = eachItem;
                        return (
                            <div key={name} className="slider-item">
                                <img src={photo} alt={name} className="technician" />
                                <div className="slider-content">
                                    <p className="name">{name}</p>
                                    <p className="specialization">{specialization}</p>
                                    <p className="rating">Rating: {rating}</p>
                                    <p className="description">{description}</p>
                                </div>
                            </div>



                        );
                    })}


                </Slider>

                <h1 className='book-request'>See what our happy customers have to say about us</h1>
                <div className="review-cards">
                    <div className="review-card">
                        <img src="https://media.istockphoto.com/id/1397818637/photo/low-angle-shot-of-an-attractive-young-call-centre-agent-sitting-alone-in-the-office-and-using.jpg?s=612x612&w=0&k=20&c=UwAyTFFIDnNrYOtOhu5rvyL84hbpTJ-F9Htplww-V-o=" alt="Customer 1" className="review-image" />
                        <div className="review-content">
                            <p className="customer-name">John Doe</p>
                            <div className="rating">⭐⭐⭐⭐⭐</div>
                            <p className="review-description">"This service was fantastic! The technician was professional and fixed the problem quickly."</p>
                        </div>
                    </div>

                    <div className="review-card">
                        <img src="https://www.microsoft.com/en-us/dynamics-365/blog/wp-content/uploads/2015/06/233328_5F00_CEO_2D00_customer_2D00_service.jpg" alt="Customer 2" className="review-image" />
                        <div className="review-content">
                            <p className="customer-name">Jane Smith</p>
                            <div className="rating">⭐⭐⭐⭐</div>
                            <p className="review-description">"I am really happy with the quality of the work and the attention to detail. Highly recommended!"</p>
                        </div>
                    </div>

                    <div className="review-card">
                        <img src="https://m.media-amazon.com/images/G/31/employer-brand/hero-remote.jpg" alt="Customer 3" className="review-image" />
                        <div className="review-content">
                            <p className="customer-name">Michael Brown</p>
                            <div className="rating">⭐⭐⭐⭐⭐</div>
                            <p className="review-description">"Excellent service! Very friendly and knowledgeable technician. I’ll definitely use this service again."</p>
                        </div>
                    </div>
                </div>

                <div className="bottom-section">
                    <div className="align-2">

                        <div className="get-in-touch">
                            <div className="align">

                                <h3>Get in touch with us</h3>
                                <div className='email-bar'>
                                    <input type='email' className='email-input' placeholder='Email Adress' />
                                    <div className='arrow-container'>
                                        <img src="/Path.png" />
                                    </div>
                                </div>
                            </div>
                            <p>Hello, we are Lift Media. Our goal is to translate the positive effects from revolutionizing how companies engage with their clients & their team.</p>
                        </div>

                        <button className='bookBtn'>Book a Service</button>
                        <ul className='terms'>
                            <li>Terms</li>
                            <li>Privacy</li>
                            <li>Cookies</li>
                            <li>Bussiness Login</li>
                        </ul>

                    </div>

                    <div className="align-3">
                        <img src='/blue logo.png' />
                        <img src='/Social icons.png' />
                    </div>

                </div>

            </div>
        )
    }

}
export default Home
















