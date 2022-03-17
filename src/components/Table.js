import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { clickEditExpense, clickDeleteExpense, expensesGlobal } = this.props;
    return (
      <section>
        <table>
          <thead>
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
          </thead>
          <tbody>
            {
              expensesGlobal.map((expense) => (
                (
                  <tr key={ expense.id }>
                    <td>{expense.description}</td>
                    <td>{expense.tag}</td>
                    <td>{expense.method}</td>
                    <td>{parseFloat(expense.value).toFixed(2)}</td>
                    <td>
                      {
                        (expense.exchangeRates[expense.currency].name)
                          .split('/')[0]
                      }
                    </td>
                    <td>
                      {
                        parseFloat(expense
                          .exchangeRates[expense.currency].ask).toFixed(2)
                      }
                    </td>
                    <td>
                      {
                        (expense.value * expense
                          .exchangeRates[expense.currency].ask).toFixed(2)
                      }
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid="edit-btn"
                        type="button"
                        onClick={ () => { clickEditExpense(expense.id); } }
                      >
                        Editar
                      </button>
                      <button
                        data-testid="delete-btn"
                        type="button"
                        onClick={ () => { clickDeleteExpense(expense.id); } }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                )
              ))
            }
          </tbody>
        </table>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  expensesGlobal: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
const { func } = propTypes;
Table.propTypes = {
  clickEditExpense: func.isRequired,
  clickDeleteExpense: func.isRequired,
  expensesGlobal: propTypes.arrayOf(propTypes.object).isRequired,
};
