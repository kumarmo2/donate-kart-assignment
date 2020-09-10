import React, { PureComponent } from "react";
import { CURRENCY_TYPE } from "../constants";
import {
  Radio,
  FormControlLabel,
  RadioGroup,
  CircularProgress,
} from "@material-ui/core";
import { getProducts, getExchangeRates } from "../apis";
import ProductCard from "./ProductCard";

class ProductListing extends PureComponent {
  constructor() {
    super();

    this.state = {
      listings: [],
      currencyType: CURRENCY_TYPE.INR,
      isLoading: false,
    };
  }

  handleRadioClick = (event) => {
    const newCurrencyType = event.target.value;
    const { currencyType } = this.state;
    getExchangeRates(currencyType)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((exchangeRateObj) => {
        if (!exchangeRateObj) {
          return;
        }
        const exchangeRate = exchangeRateObj.rates[newCurrencyType];
        if (!exchangeRate) {
          return;
        }
        const listings = this.state.listings.map((listing) => {
          return {
            ...listing,
            price: listing.price * exchangeRate,
          };
        });
        this.setState({
          currencyType: newCurrencyType,
          listings,
        });
      });
  };

  render() {
    const { listings, currencyType, isLoading } = this.state;
    if (isLoading) {
      return <CircularProgress />;
    }
    return (
      <div>
        <div>
          <RadioGroup value={currencyType} onChange={this.handleRadioClick}>
            <FormControlLabel
              control={<Radio />}
              label="INR"
              value={CURRENCY_TYPE.INR}
            />
            <FormControlLabel
              control={<Radio />}
              label="USD"
              value={CURRENCY_TYPE.USD}
            />
          </RadioGroup>
        </div>
        {listings.length > 0 &&
          listings.map((listing) => {
            const { id, ...otherProps } = listing;
            return <ProductCard key={listing.id} {...otherProps} />;
          })}
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    getProducts()
      .then((listings) => {
        this.setState({
          isLoading: false,
          listings,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
        console.log("error", error);
      });
  }
}

export default ProductListing;
