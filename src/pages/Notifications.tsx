import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ProfileLayout from '../components/ProfileLayout';
import styled from 'styled-components';

const NotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const NotificationCard = styled.div`
  background: #f0fdf4;
  border-radius: 8px;
  padding: 24px 32px;
`;

const NotificationTitle = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #059669;
`;

const Notifications: React.FC = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useUser();
    const [notifications, setNotifications] = useState({
        newsletter: false,
        community: false,
        messages: false,
        searches: false
    });

    if (!isLoggedIn || !user) {
        navigate('/');
        return null;
    }

    const handleNotificationChange = (type: string, checked: boolean) => {
        setNotifications(prev => ({ ...prev, [type]: checked }));
    };

    return (
        <ProfileLayout title="Suscripciones y notificaciones">
            <NotificationsContainer>
                <NotificationCard>
                    <NotificationTitle>Newsletter</NotificationTitle>
                    <CheckboxWrapper>
                        <Checkbox
                            type="checkbox"
                            id="newsletter"
                            checked={notifications.newsletter}
                            onChange={(e) => handleNotificationChange('newsletter', e.target.checked)}
                        />
                        <span>
                            Deseo recibir noticias y novedades sobre inmuebles y oportunidades de inversión.
                        </span>
                    </CheckboxWrapper>
                </NotificationCard>

                <NotificationCard>
                    <NotificationTitle>Comunidad Mel</NotificationTitle>
                    <CheckboxWrapper>
                        <Checkbox
                            type="checkbox"
                            id="community"
                            checked={notifications.community}
                            onChange={(e) => handleNotificationChange('community', e.target.checked)}
                        />
                        <span>
                            Deseo recibir beneficios, descuentos y promociones de la comunidad Mel.
                        </span>
                    </CheckboxWrapper>
                </NotificationCard>

                <NotificationCard>
                    <NotificationTitle>Mensajes</NotificationTitle>
                    <CheckboxWrapper>
                        <Checkbox
                            type="checkbox"
                            id="messages"
                            checked={notifications.messages}
                            onChange={(e) => handleNotificationChange('messages', e.target.checked)}
                        />
                        <span>
                            Deseo recibir notificaciones cuando reciba un nuevo mensaje.
                        </span>
                    </CheckboxWrapper>
                </NotificationCard>

                <NotificationCard>
                    <NotificationTitle>Búsquedas guardadas</NotificationTitle>
                    <CheckboxWrapper>
                        <Checkbox
                            type="checkbox"
                            id="searches"
                            checked={notifications.searches}
                            onChange={(e) => handleNotificationChange('searches', e.target.checked)}
                        />
                        <span>
                            Deseo recibir noticias y novedades sobre inmuebles y oportunidades de inversión.
                        </span>
                    </CheckboxWrapper>
                </NotificationCard>
            </NotificationsContainer>
        </ProfileLayout>
    );
};

export default Notifications; 