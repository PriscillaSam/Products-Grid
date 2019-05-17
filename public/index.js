import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Text from 'Atoms/Text';
import Card from 'Molecules/Card';
import Dropdown from 'Molecules/Dropdown';
import colors from 'Constants/colours';
import fetchProducts from 'Utilities/actions';

class App extends React.Component {
  state = {
    products: [],
    productsToDisplay: [],
    page: 1,
    showDropdown: false,
    buttonText: 'Sort Products',
    sortOrder: 'Ascending',
    sortValue: '',
    hasPicked: false,
  }

  async componentDidMount() {
    const { page } = this.state;
    const products = await fetchProducts(page);
    this.setState({ products, page: 2 });
    document.addEventListener('scroll', this.handleScrollEvent);
  }

  toggleDropdownVisibility = () => {
    this.setState(prevState => ({
      showDropdown: !prevState.showDropdown,
    }));
  }

  handleScrollEvent = async () => {
    const { page, productsToDisplay, products } = this.state;
    const docHeight = document.body.clientHeight;
    const scroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = docHeight - windowHeight;
    const scrollPercentage = scroll / bodyHeight;

    if (page === 2) {
      const response = await fetchProducts(page);
      this.setState({ productsToDisplay: response });
    }

    if (productsToDisplay.length > 0 && scrollPercentage > 0.99) {
      this.setState({
        page: page + 1,
        products: [...products, ...productsToDisplay],
        productsToDisplay: [],
      });

      const prefetched = await fetchProducts(page);
      this.setState({
        productsToDisplay: [...prefetched],
      });
    }
  }

  toggleSortOrder = (sortOrder) => {
    this.setState({ sortOrder, buttonText: sortOrder, showDropdown: false },
      () => {
        const { sortValue } = this.state;
        this.sortItem(sortValue, sortOrder);
      });
  }

  sortItem = (sortValue, sortOrder) => {
    const { products } = this.state;
    const sortedArray = products
      .sort((a, b) => {
        if (sortValue === 'date') {
          return sortOrder === 'Ascending'
            ? Date.parse(a.date) - Date.parse(b.date)
            : Date.parse(b.date) - Date.parse(a.date);
        }
        return sortOrder === 'Ascending'
          ? a[sortValue] - b[sortValue]
          : b[sortValue] - a[sortValue];
      });
    this.setState({ products: sortedArray, sortValue, hasPicked: true });
  }

  render() {
    const {
      products,
      buttonText,
      showDropdown,
      sortOrder,
      hasPicked,
    } = this.state;
    let count = 0;
    return (
      <>
        <Text text="Our Products" type="large" colourClass="gray" />
        <Container>
          <ButtonSection>
            <Dropdown
              toggleDropdownVisibility={this.toggleDropdownVisibility}
              buttonText={buttonText}
              showDropdown={showDropdown}
              toggleSortOrder={this.toggleSortOrder}
              hasPicked={hasPicked}
            />
            <RadioContainer>
              <Item>
                <RadioButton
                  type="radio"
                  name="sortBy"
                  value="size"
                  onClick={() => this.sortItem('size', sortOrder)}
                />
                <Label> Size</Label>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name="sortBy"
                  value="price"
                  onClick={() => this.sortItem('price', sortOrder)}
                />
                <Label> Price</Label>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name="sortBy"
                  value="date"
                  onClick={() => this.sortItem('date', sortOrder)}
                />
                <Label> Date</Label>
              </Item>
            </RadioContainer>
          </ButtonSection>
          <ProductsSection>
            {
              products.map((product, index) => {
                count += 1;
                return <Card fontDetails={product} index={index + 1} key={count} />;
              })
            }
          </ProductsSection>
        </Container>
      </>
    );
  }
}

const ProductsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 350px;
  justify-content: space-around;
  width: 70%;
`;

const Container = styled.div`
  background-color: ${colors.lightGrey};
  padding: 10px;
`;

const ButtonSection = styled.div`
position: absolute;
`;

const RadioButton = styled.input`

`;

const Item = styled.div`
  display: flex;
`;

const Label = styled.div`
  margin-left: 10px;
  margin-top: 3px;
  font-size: 14px;
`;

const RadioContainer = styled.div`
  margin-top: 15px;
`;

ReactDOM.render(<App />, document.getElementById('root'));
