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
    showBackButton: false,
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

    if (scroll > windowHeight) {
      this.setState({ showBackButton: true });
    } else {
      this.setState({ showBackButton: false });
    }

    if (page === 2) {
      const response = await fetchProducts(page);
      this.setState({ productsToDisplay: response, page: page + 1 });
    } else if (productsToDisplay.length > 0 && scrollPercentage > 0.99) {
      const prefetched = await fetchProducts(page);
      this.setState({
        page: page + 1,
        products: [...products, ...productsToDisplay],
        productsToDisplay: [],
      });

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

  handleSort = (sortValue, sortOrder) => () => this
    .sortItem(sortValue, sortOrder);

  scrollToTop = () => {
    document.documentElement.scrollTop = 150;
  }

  render() {
    const {
      products,
      buttonText,
      showDropdown,
      sortOrder,
      hasPicked,
      showBackButton,
    } = this.state;
    let count = 0;

    return (
      <>
        <HorizontalRule />
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
                  onClick={this.handleSort('size', sortOrder)}
                />
                <Label> Size</Label>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name="sortBy"
                  value="price"
                  onClick={this.handleSort('price', sortOrder)}
                />
                <Label> Price</Label>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name="sortBy"
                  value="date"
                  onClick={this.handleSort('date', sortOrder)}
                />
                <Label> Date</Label>
              </Item>
            </RadioContainer>
          </ButtonSection>
          <ProductsSection>
            {
              products.map((product, index) => {
                count += 1;

                return (
                  <>
                    <Card
                      fontDetails={product}
                      index={index + 1}
                      key={count}
                    />
                    {
                      count === 500
                        ? (
                          <Flex>
                            <Text
                              text="~ End of catalogue ~"
                              type="large"
                              colourClass="tan"
                            />
                          </Flex>
                        )
                        : index === products.length - 1
                          ? (
                            <Flex>
                              <Icon
                                className="fa fa-spin fa-spinner fa-5x"
                                color="tan"
                              />
                            </Flex>
                          ) : ''
                    }
                  </>
                );
              })
            }
          </ProductsSection>
          {
            showBackButton
            && (
              <BackButton onClick={this.scrollToTop}>
                <Icon className="fa fa-arrow-up" color="white" />
              </BackButton>
            )
          }
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

const Flex = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`;

const Container = styled.div`
  background-color: ${colors.lightGrey};
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 20px;
`;

const ButtonSection = styled.div`
position: absolute;
`;

const RadioButton = styled.input``;

const Item = styled.div`
  display: flex;
`;

const Icon = styled.i`
color: ${props => colors[props.color]};
`;

const Label = styled.div`
  margin-left: 10px;
  margin-top: 3px;
  font-size: 14px;
`;

const RadioContainer = styled.div`
  margin-top: 15px;
`;

const BackButton = styled(Flex)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  cursor: pointer;
  bottom: 20px;
  right: 20px;
  background-color: ${colors.gray};
  box-shadow: 0.5rem 0.5rem 3rem rgba(0,0,0,0.2);
`;

const HorizontalRule = styled.div`
  width: 50px;
  height: 1px;
  background-color: ${colors.sienna};
  margin: 0;
  padding: 0;
  `;

ReactDOM.render(<App />, document.getElementById('root'));
