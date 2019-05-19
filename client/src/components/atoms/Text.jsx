import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from 'Constants/colours';

const textSizes = {
  default: '14',
  large: '36',
};

const TextComponent = ({
  text, type, size, colourClass,
}) => {
  const fontSize = type === 'fontText' ? size : textSizes[type];

  return (
    <Text fontSize={fontSize} color={colors[colourClass]} type={type}>
      {text}
    </Text>
  );
};

const Text = styled.p`
  color: ${props => props.color};
  font-size: ${props => props.fontSize}px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${props => (props.type === 'fontText' ? 400 : 300)};
  padding: 10px 0;
  margin: 0;
`;

TextComponent.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  size: PropTypes.number,
  colourClass: PropTypes.string.isRequired,
};

TextComponent.defaultProps = {
  size: 18,
};

export default TextComponent;
