import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { ExpensesAction, fetchCurrency } from '../actions';
import Header from '../components/Header';
import getCurrencies from '../service/service';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = { id: 0,
      value: '',
      description: '',
      isDisabled: true,
      method: 'Dinheiro',
      tag: 'Alimentação',
      currency: 'USD',
    };
  }

  async componentDidMount() {
    // console.log('DidMount');
    // await getCurrencies();
    const { currencyDispatch } = this.props;
    currencyDispatch();
    // console.log('Currencies estado global', currenciesGlobal);
  }

  handleChangeForm = ({ target }) => {
    const { value, name, type, checked } = target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    }, () => { this.verifyBtn(); });
  };

  verifyBtn = () => {
    const { value, description, method, tag, currency } = this.state;
    if (value && description && method && tag && currency) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  clickAddExpense = async () => {
    const exchangeRates = await getCurrencies();
    const { id, value, description, method, tag, currency } = this.state;
    this.setState({ id: id + 1 }, () => {
      const { expensesDispatch } = this.props;
      const objectExpense = {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      };
      // console.log('Objecto Expenses', objectExpense);
      expensesDispatch(objectExpense);
      this.setState({ value: '' });
    });
  };

  render() {
    const { value, description, isDisabled, method, tag, currency } = this.state;
    const { currenciesGlobal } = this.props;
    return (
      <section>
        <div>TrybeWallet</div>
        <Header />
        <form>
          <label htmlFor="value-input">
            Valor
            <input
              data-testid="value-input"
              id="value-input"
              type="text"
              value={ value }
              name="value"
              onChange={ this.handleChangeForm }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              data-testid="currency-input"
              id="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChangeForm }
            >
              {currenciesGlobal.filter((item) => item !== 'USDT')
                .map((element, index) => (
                  <option
                    key={ index }
                    value={ element }
                    data-testid={ `${element}` }
                  >
                    {element}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento
            <select
              data-testid="method-input"
              id="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChangeForm }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categorie">
            Categoria
            <select
              data-testid="tag-input"
              id="categorie"
              name="tag"
              value={ tag }
              onChange={ this.handleChangeForm }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição
            <input
              data-testid="description-input"
              id="description"
              type="text"
              value={ description }
              name="description"
              onChange={ this.handleChangeForm }
            />
          </label>
          <button
            type="button"
            onClick={ this.clickAddExpense }
            disabled={ isDisabled }
          >
            Adicionar despesa
          </button>
        </form>
        <section>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesGlobal: state.wallet.currencies,
});

const mapDispatchToProps = (dispacth) => ({
  expensesDispatch: (state) => dispacth(ExpensesAction(state)),
  currencyDispatch: () => dispacth(fetchCurrency()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  expensesDispatch: propTypes.func.isRequired,
  currencyDispatch: propTypes.func.isRequired,
  currenciesGlobal: propTypes.arrayOf(propTypes.string).isRequired,
};
