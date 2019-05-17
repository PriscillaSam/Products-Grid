import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'Constants/colours';
import Text from 'Atoms/Text';

import divisibilityChecker from 'Utilities/getIndex';
import dateFormatter from 'Utilities/dateFormatter';

const CardComponent = ({ fontDetails, index }) => {
  const {
    id, size, price, face, date,
  } = fontDetails;

  const isDivisibleBy2 = divisibilityChecker(index);
  const formattedDate = dateFormatter(date);
  const cardColor = isDivisibleBy2 ? 'black' : 'tan';
  const fontColor = isDivisibleBy2 ? 'tan' : 'white';

  return (
    <Container>
      <FontArea bgcolor={colors[cardColor]}>
        <Text text={face} type="fontText" size={size} colourClass={fontColor} />
      </FontArea>
      <FlexContainer mtop={10}>
        <DescriptionSection>
          <Section>
            {
              ['Size', 'Price', 'Date'].map((item, index) => (
                <Text
                  key={index}
                  text={item.toString()}
                  type="default"
                  colourClass="black"
                  className="hasPadding"
                />
              ))
            }
          </Section>
          <CardRule />
          <Section>
            {
              [size, price, formattedDate].map((item, index) => (
                <Text
                  key={index}
                  text={item.toString()}
                  type="default"
                  colourClass="tan"
                  className="hasPadding"
                />
              ))
            }
          </Section>
        </DescriptionSection>
      </FlexContainer>
    </Container>
  );
};


const Container = styled.div`
  width: 300px;
  height: 359px;
  margin-bottom: 25px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0.5rem 0.5rem 3rem rgba(0, 0, 0, 0.2);
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.mtop ? props.mtop : 0}px;
`;

const FontArea = styled(FlexContainer)`
  width: 300px;
  height: 159px;
  background-color: ${props => props.bgcolor};
`;

const DescriptionSection = styled(FlexContainer)`
  justify-content: space-between;
  width: 200px;
`;

const PaddedText = styled(Text)`
  padding: 0px;
`;

const Section = styled.div``;

const CardRule = styled.div`
  width: 1px;
  height: 110px;
  background-color: ${colors.lightGrey};
  `;

CardComponent.propTypes = {
  fontDetails: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardComponent;
