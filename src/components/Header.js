import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    // console.log('expenses', expenses);
    return (
      <>
        <div>HEADER</div>
        <div>
          <span data-testid="email-field">{email}</span>
          <span data-testid="total-field">
            {
              (
                expenses ? (expenses.reduce((acc, current) => (
                  // console.log(current);
                  acc + (+current.value * current.exchangeRates[current.currency].ask)
                ), 0)) : 0
              )
            }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default connect(mapStateToProps, null)(Header);
