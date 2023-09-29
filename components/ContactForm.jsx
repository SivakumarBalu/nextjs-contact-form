'use client'
import {useState} from 'react'


const ContactForm = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState([])
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(fullname, email, message)

    const response = await fetch('api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({fullname, email, message})
    })
    const {msg, success} = await response.json()
    setError(msg)
    setSuccess(success)
    if (success) {
      setEmail('')
      setFullname('')
      setMessage('')
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}
      className='flex flex-col py-4 mt-4 border-t gap-5'>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input 
            type="text" 
            id="fullname" 
            placeholder='John Doe'
            value={fullname}
            onChange={e => setFullname(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="text" 
            id="email" 
            placeholder='John@email.com'
            value={email}
            onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="message">Your Message</label>
          <textarea 
          id='message' 
          placeholder="Type your message here..."
          className='h-32'
          value={message}
          onChange={e => setMessage(e.target.value)}></textarea>
        </div>
        <button type="submit"
        className='bg-green-500 p-3 text-white'>Send</button>
      </form>
      <div className='bg-slate-100 flex flex-col'>
        { error && error.map( e => (
          <div className={`${success ? 'text-green-800':'text-red-600'} px-5 py-2`}>{e}</div>
        ))}
       
      </div>
    </>
  )
}

export default ContactForm