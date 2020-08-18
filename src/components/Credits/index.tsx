import React from 'react';
import styled from 'styled-components';

const logoCitylab = '/images/citylab-logo.svg';
const logoCodeForLeipzig = '/images/cfg-leipzig-logo.svg';
const logoWirImQuartier = '/images/wiq-logo.svg';
const logoStiftungEckenWecken = '/images/sew-logo.png';

const StyledCreditsContainer = styled.div`
  width: 150px;
  height: auto;
  flex-direction: column;
  display: flex;
  justify-content: end;

  span {
    margin-top: 5px;
    margin-bottom: 15px;
    width: fit-content;
    font-size: ${p => p.theme.fontSizeL};
  }

  a.tsb {
    width: fit-content;
    img {
      width: 110px;
    }
  }

  a.citylab {
    img {
      width: 150px;
      margin: 10px 0 5px 0;
    }
  }

  a.wiq {
    img {
      width: 150px;
      margin: 10px 0 5px 0;
    }
  }

  a.sew {
    img {
      width: 150px;
      margin: 10px 0 5px 0;
    }
  }

  a.cfg {
    img {
      width: 150px;
      margin: 10px 0 5px 0;
    }
  }
`;

const Credits = p => {
  return (
    <StyledCreditsContainer>
      <a
        className='wiq'
        href='https://stiftung-ecken-wecken.de/WIQ'
        rel='noopener noreferrer'
        target='_blank'
      >
        <img src={logoWirImQuartier} alt='Logo Wir im Quartier' />
      </a>
      <span>Ein Projekt der</span>
      <a
        className='seq'
        href='https://stiftung-ecken-wecken.de'
        target='_blank'
        rel='noopener noreferrer'
      >
        <img src={logoStiftungEckenWecken} alt='Logo Stiftung Ecken Wecken' />
      </a>
      <span>Migriert für Leipzig</span>
      <a
        className='cfg'
        href='https://codefor.de/leipzig'
        target='_blank'
        rel='noopener noreferrer'
      >
        <img src={logoCodeForLeipzig} alt='Logo Code for Leipzig' />
      </a>
      <span>Unterstützt von</span>
      <a
        className='citylab'
        href='https://www.citylab-berlin.org'
        target='_blank'
        rel='noopener noreferrer'
      >
        <img src={logoCitylab} alt='Logo CityLab Berlin' />
      </a>
    </StyledCreditsContainer>
  );
};

export default Credits;
