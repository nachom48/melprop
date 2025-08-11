import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <LoginModal
            isShown={true}
            onClose={() => navigate('/')}
            logOrReg="login"
        />
    );
};

export default LoginPage;


