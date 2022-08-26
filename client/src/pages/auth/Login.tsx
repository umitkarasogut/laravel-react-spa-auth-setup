import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import useAuth from '../../context/useAuth';
import { Link, Navigate } from 'react-router-dom';

export default function Login() {

    const { login, errors, user } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    if (user) return <Navigate to='/' />;

    return (
        <Modal show={true} centered contentClassName='rounded-4 shadow'>
            <Modal.Body className='rounded-4 shadow p-5'>
                <h2 className="fw-bold mb-0 pb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input onChange={e => setEmail(e.target.value)} type="email" className={`form-control rounded-3 ${errors['email'] && 'is-invalid'}`} id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                        {errors['email'] && <div className="invalid-feedback d-block">{errors['email']}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={e => setPassword(e.target.value)} type="password" className={`form-control rounded-3 ${errors['password'] && 'is-invalid'}`} id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                        {errors['password'] && <div className="invalid-feedback d-block">{errors['password']}</div>}
                    </div>
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Login</button>
                    <Link to={'/register'} className="w-100 mb-2 btn btn-secondary btn-lg rounded-3 btn-primary" type="submit">Register</Link>
                </form>
            </Modal.Body>
        </Modal>
    );
}
