import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'Constants/colours';
import Text from 'Atoms/Text';

import divisibilityChecker from 'Utilities/getIndex';
import dateFormatter from 'Utilities/dateFormatter';

const CardComponent = ({ fontDetails, index }) => {
  const {
    size, price, face, date,
  } = fontDetails;

  const isDivisibleBy2 = divisibilityChecker(index, 2);
  const formattedDate = dateFormatter(date);
  const cardColor = isDivisibleBy2 ? 'black' : 'tan';
  const fontColor = isDivisibleBy2 ? 'tan' : 'white';
  const formattedPrice = `$${price / 100}`;
  let count = 1;

  return (
    <Container>
      <FontArea bgcolor={colors[cardColor]}>
        <Text text={face} type="fontText" size={size} colourClass={fontColor} />
      </FontArea>
      <FlexContainer mtop={10}>
        <DescriptionSection>
          <Section>
            {
              ['Size', 'Price', 'Date'].map((item) => {
                count += 1;
                return (
                  <Text
                    key={count}
                    text={item.toString()}
                    type="default"
                    colourClass="black"
                  />
                );
              })
            }
          </Section>
          <CardRule />
          <Section>
            {
              [size, formattedPrice, formattedDate].map((item) => {
                count += 1;
                return (
                  <Text
                    key={count}
                    text={item.toString()}
                    type="default"
                    colourClass="tan"
                  />
                );
              })
            }
          </Section>
        </DescriptionSection>
      </FlexContainer>
    </Container>
  );
};


const Container = styled.div`
  width: 300px;
  height: 300px;
  margin-bottom: 25px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${props => (props.mtop ? props.mtop : 0)}px;
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

const Section = styled.div``;

const CardRule = styled.div`
  width: 1px;
  height: 70px;
  background-color: ${colors.darkGrey};
  `;

CardComponent.propTypes = {
  fontDetails: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardComponent;
