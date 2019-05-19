import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Text from 'Atoms/Text';
import Card from 'Molecules/Card';
import colors from 'Constants/colours';
import fetchProducts from 'Utilities/actions';
import checkDivisibility from 'Utilities/getIndex';
import getRandomNumber from 'Utilities/getRandomNumber';

class App extends React.Component {
  state = {
    products: [],
    productsToDisplay: [],
    page: 1,
    showDropdown: false,
    sortValue: '',
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
    const {
      page, productsToDisplay, products, sortValue,
    } = this.state;
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
      const response = await fetchProducts(page, sortValue);
      this.setState({ productsToDisplay: response, page: page + 1 });
    } else if (productsToDisplay.length > 0 && scrollPercentage > 0.999) {
      this.setState({
        page: page + 1,
        products: [...products, ...productsToDisplay],
        productsToDisplay: [],
      });
      const prefetched = await fetchProducts(page, sortValue);

      this.setState({
        productsToDisplay: [...prefetched],
      });
    }
  }

  sortItem = async (sortValue) => {
    this.setState({
      products: [], productsToDisplay: [],
    });
    const products = await fetchProducts(1, sortValue);
    this.setState({
      products, sortValue, page: 2,
    });
  }

  handleSort = sortValue => () => this.sortItem(sortValue);

  scrollToTop = () => {
    document.documentElement.scrollTop = 150;
  }

  render() {
    const {
      products,
      showBackButton,
    } = this.state;
    let count = 0;

    return (
      <>
        <HorizontalRule />
        <Text text="Our Products" type="large" colourClass="gray" />
        <Container>
          <ButtonSection>
            <SortText>
              <Text
                text="Sort Products"
                type="fontText"
                size={18}
                colourClass="gray"
              />
              <Icon className="fa fa-sort" color="gray" />
            </SortText>
            <RadioContainer>
              <Item>
                <RadioButton
                  type="radio"
                  name="sortBy"
                  value="size"
                  onClick={this.handleSort('size')}
                />
                <Label> Size</Label>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name="sortBy"
                  value="price"
                  onClick={this.handleSort('price')}
                />
                <Label> Price</Label>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name="sortBy"
                  value="id"
                  onClick={this.handleSort('id')}
                />
                <Label> Product id</Label>
              </Item>
            </RadioContainer>
          </ButtonSection>
          <ProductsSection>
            {
              products.length === 0
              && (
                <Flex>
                  <Icon
                    className="fa fa-spin fa-spinner fa-5x"
                    color="tan"
                  />
                </Flex>
              )
            }
            {
              products.length > 0
              && products.map((product, index) => {
                count += 1;

                return (
                  <>
                    <Card
                      fontDetails={product}
                      index={index + 1}
                      key={count}
                    />
                    {
                      checkDivisibility(count, 20)
                      && (
                        <AdSection>
                          <Text
                            text="A word from our sponsors"
                            colourClass="gray"
                          />
                          <Image
                            className="ad"
                            src={`/ads/?r=${getRandomNumber()}`}
                          />
                        </AdSection>
                      )
                    }
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

const SortText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    margin-left: 10px;
  }
`;

const RadioButton = styled.input`
margin-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
`;

const AdSection = styled(Flex)`
  background-color: ${colors.white};
  width: 80%;
  border-radius: 10px;
  margin-bottom: 20px;
  padding-left: 20px;
  box-shadow: 0.5rem 0.5rem 3rem rgba(0,0,0,0.2);
  justify-content: space-between;

  p {
    font-size: 36px;
  }

`;

const Image = styled.img``;

const Icon = styled.i`
color: ${props => colors[props.color]};
`;

const Label = styled.div`
  margin-left: 10px;
  margin-top: 3px;
  font-size: 15px;
  color: ${colors.gray};

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
