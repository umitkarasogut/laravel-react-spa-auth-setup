import React from 'react';
import Navbar from './Navbar';
import Container from 'react-bootstrap/Container';

export default function Layout({ content }: { content: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <Container className='mt-5'>
                {content}
            </Container>
        </>
    );
}
