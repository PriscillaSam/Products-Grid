import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colours from 'Constants/colours';
import Text from 'Atoms/Text';

const Dropdown = ({
  buttonText,
  toggleDropdownVisibility,
  showDropdown,
  toggleSortOrder,
  hasPicked,
}) => (
  <>
    <Button disabled={!hasPicked} onClick={() => toggleDropdownVisibility()}>
      <Text text={buttonText} type="fontText" size={12} colourClass="white" />
      <Icon className="fa fa-sort" />
    </Button>
    {
        showDropdown && (
          <DropdownList>
            <SortOrder
              onClick={() => toggleSortOrder('Ascending')}
            >
              Ascending
            </SortOrder>
            <CardRule />
            <SortOrder
              onClick={() => toggleSortOrder('Descending')}
            >
              Descending
            </SortOrder>
          </DropdownList>
        )
      }
  </>
);

const Button = styled.button`
display: flex;
border-radius: 5px;
background-color: ${colours.black};
padding: 0px 10px;
cursor: pointer;

&:disabled {
  background-color: ${colours.gray};
  cursor: not-allowed;
}

&:focus {
  outline: none;
}
`;

const Icon = styled.i`
color: ${colours.white};
margin-top: 14px;
margin-left: 10px;
`;

const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 115px;
  background-color: ${colours.white};
  border-radius: 3px;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-shadow: 0.5rem 0.5rem 3rem rgba(0,0,0,0.2);
`;

const CardRule = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colours.lightGrey};
  `;

const SortOrder = styled.p`
  font-size: 12px;
  color: ${colours.black};
  cursor: pointer;
`;

Dropdown.propTypes = {
  buttonText: PropTypes.string.isRequired,
  toggleDropdownVisibility: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  toggleSortOrder: PropTypes.func.isRequired,
  hasPicked: PropTypes.bool.isRequired,
};

export default Dropdown;
