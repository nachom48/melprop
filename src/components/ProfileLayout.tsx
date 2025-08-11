import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: white;
  padding: 24px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 48px;
  padding: 24px 0;
`;

const ProfileNav = styled.div`
  flex: 0 0 300px;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavItem = styled.li`
  border-bottom: 1px solid #e5e7eb;
`;

const NavLink = styled(Link) <{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 8px 0;
  text-decoration: none;
  color: ${props => props.active ? '#059669' : '#374151'};
  font-weight: ${props => props.active ? '600' : '400'};
  
  &:hover {
    color: #059669;
  }
`;

const Count = styled.div`
  background: #059669;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
`;

const MainContent = styled.div`
  flex: 1;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

interface ProfileLayoutProps {
    children: React.ReactNode;
    title: string;
    favoritesCount?: number;
    searchesCount?: number;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
    children,
    title,
    favoritesCount = 5,
    searchesCount = 5
}) => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <ProfileContainer>
            <Container>
                <ProfileWrapper>
                    <ProfileNav>
                        <NavList>
                            <NavItem>
                                <NavLink to="/perfil/datos" active={isActive('/perfil/datos')}>
                                    <span>Datos Personales</span>
                                    <i className="fa fa-chevron-right"></i>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/perfil/cambio_contrasena" active={isActive('/perfil/cambio_contrasena')}>
                                    <span>Cambiar contraseña</span>
                                    <i className="fa fa-chevron-right"></i>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/perfil/notificaciones" active={isActive('/perfil/notificaciones')}>
                                    <span>Suscripciones y notificaciones</span>
                                    <i className="fa fa-chevron-right"></i>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/perfil/favoritos" active={isActive('/perfil/favoritos')}>
                                    <Count>{favoritesCount}</Count>
                                    <span style={{ flexGrow: 1 }}>Favoritos</span>
                                    <i className="fa fa-chevron-right"></i>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/perfil/busquedas_guardadas" active={isActive('/perfil/busquedas_guardadas')}>
                                    <Count>{searchesCount}</Count>
                                    <span style={{ flexGrow: 1 }}>Búsquedas guardadas</span>
                                    <i className="fa fa-chevron-right"></i>
                                </NavLink>
                            </NavItem>
                        </NavList>
                    </ProfileNav>

                    <MainContent>
                        <h2 style={{
                            color: '#059669',
                            fontSize: '24px',
                            fontWeight: '600',
                            margin: 0
                        }}>
                            {title}
                        </h2>
                        {children}
                    </MainContent>
                </ProfileWrapper>
            </Container>
        </ProfileContainer>
    );
};

export default ProfileLayout; 