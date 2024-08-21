import SVG from 'react-inlinesvg';
import styled from '@emotion/styled';
import LogoImg from '../Assets/IconLogo.svg'
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
  align-items: flex-start;
  display: inline-flex;
  font-size: 0;

  svg {
    height: 42px;
    max-height: 100%;
    width: auto;
  }
`;

function Logo() {
  return (
    <NavLink to={'/'}>
      <Wrapper>
        <SVG src={LogoImg} />
      </Wrapper>
    </NavLink>
  );
}

export default Logo;
