import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from 'Constants/colours';

const textSizes = {
  default: '16',
  large: '36',
};

const TextComponent = ({
  text, type, size, colourClass, toggleSortOrder
}) => {
  const fontSize = type === 'fontText' ? size : textSizes[type];

  return (
    <Text onClick={() => toggleSortOrder && toggleSortOrder(text)} fontSize={fontSize} color={colors[colourClass]}>
      {text}
    </Text>
  );
};

const Text = styled.p`
  color: ${props => props.color};
  font-size: ${props => props.fontSize}px;
  
  .hasPadding {
  padding: 10px;
  }
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
