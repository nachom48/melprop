import styled from 'styled-components';

export const NavbarContainer = styled.header`
  width: 100%;
  background: #fff;
  border-bottom: 1.5px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 20;
`;

export const NavbarContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  height: 80px;
  box-sizing: border-box;
  gap: 24px;
`;

export const LogoBlock = styled.a`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  margin-right: 32px;
`;

export const LogoText = styled.span`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 2.4rem;
  color: #10451d;
  line-height: 1;
  letter-spacing: 0.5px;
`;

export const LogoSub = styled.span`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: #10451d;
  letter-spacing: 2px;
  margin-top: -2px;
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 28px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const NavLink = styled.button<{ active?: boolean; underline?: boolean }>`
  background: none;
  border: none;
  color: #10451d;
  font-size: 1.08rem;
  font-weight: 500;
  padding: 6px 0 6px 0;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.18s;
  font-family: 'Plus Jakarta Sans', sans-serif;
  border: none;
  text-decoration: none;
  &:hover, &[data-active='true'] {
    color: #388e3c;
    background: none;
    border: none;
    text-decoration: none;
  }
`;

export const DropdownMenu = styled.div<{ open?: boolean }>`
  display: ${props => props.open ? 'block' : 'none'};
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 220px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.13);
  padding: 14px 0;
  margin-top: 8px;
  z-index: 100;
`;

export const DropdownList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const DropdownItem = styled.li`
  font-size: 0.98rem;
  color: #10451d;
  font-weight: 400;
  padding: 7px 0;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;
  font-family: 'Plus Jakarta Sans', sans-serif;
  &:hover {
    background: #f5f5f5;
    color: #388e3c;
  }
`;

export const LoginButton = styled.button`
  background: #97cb59;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px 32px;
  font-size: 1.15rem;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s;
  font-family: 'Plus Jakarta Sans', sans-serif;
  box-shadow: none;
  &:hover {
    background: #7bb13c;
  }
`;

export const ChevronDown = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-left: 1px;
  svg {
    display: block;
    width: 100%;
    height: 100%;
    fill: #10451d;
  }
`; 