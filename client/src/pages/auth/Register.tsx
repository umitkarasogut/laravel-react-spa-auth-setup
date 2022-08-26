import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import useAuth from '../../context/useAuth';
import { Navigate } from 'react-router-dom';

export default function Register() {

    const { register, loading, errors, user } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await register(name, email, password, passwordConfirmation);
    };

    if (user) return <Navigate to='/' />;

    return (
        <Modal show={true} centered contentClassName='rounded-4 shadow'>
            <Modal.Body className='rounded-4 shadow p-5'>
                <h2 className="fw-bold mb-0 pb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input onChange={e => setName(e.target.value)} type="text" className={`form-control rounded-3 ${errors['name'] && 'is-invalid'}`} id="floatingName" placeholder="Name" />
                        <label htmlFor="floatingName">Name</label>
                        {errors['name'] && <div className="invalid-feedback d-block">{errors['name']}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={e => setEmail(e.target.value)} type="email" className={`form-control rounded-3 ${errors['email'] && 'is-invalid'}`} id="floatingEmail" placeholder="Email" />
                        <label htmlFor="floatingEmail">Email address</label>
                        {errors['email'] && <div className="invalid-feedback d-block">{errors['email']}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={e => setPassword(e.target.value)} type="password" className={`form-control rounded-3 ${errors['password'] && 'is-invalid'}`} id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                        {errors['password'] && <div className="invalid-feedback d-block">{errors['password']}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={e => setPasswordConfirmation(e.target.value)} type="password" className={`form-control rounded-3 ${errors['password'] && 'is-invalid'}`} id="floatingPasswordConfirmation" placeholder="Password" />
                        <label htmlFor="floatingPasswordConfirmation">Password Confirmation</label>
                        {errors['password'] && <div className="invalid-feedback d-block">{errors['password']}</div>}
                    </div>
                    <button disabled={loading} className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">
                        {loading}
                        Submit
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}
