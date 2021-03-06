import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../login.css';
import wallet from '../images/wallet.svg';
import { UserAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = { email: '', password: '', buttonDisabled: true };
  }

  handleChange = ({ target }) => {
    // console.log('handleChange');
    this.setState({ [target.name]: target.value }, () => { this.verifyInput(); });
  }

  verifyInput = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    // regex https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    if (password.length >= minLength && emailRegex.test(email)) {
      this.setState({ buttonDisabled: false });
    } else { this.setState({ buttonDisabled: true }); }
  };

  clickBtnEntrar = () => {
    // console.log('BTN clicado');
    const { userEmailDispatch, history } = this.props;
    const { email } = this.state;
    userEmailDispatch(email);
    history.push('/carteira');
  };

  render() {
    // console.log(this.props);
    const { email, password, buttonDisabled } = this.state;
    return (
      <section className="section-login">
        <div className="div-img-login">
          <div className="div-image">
            <img src={ wallet } alt="Logo Tryber" />
          </div>
          <form className="form-login">
            <div className="div-email">
              <input
                className="input-login"
                data-testid="email-input"
                type="email"
                name="email"
                placeholder="Email"
                value={ email }
                onChange={ this.handleChange }
              />
            </div>
            <div className="div-password">
              <input
                className="input-login"
                data-testid="password-input"
                type="password"
                name="password"
                value={ password }
                onChange={ this.handleChange }
              />
            </div>
            <div className="div-btn-entrar">
              <button
                className="btn-entrar"
                type="button"
                disabled={ buttonDisabled }
                onClick={ this.clickBtnEntrar }

              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmailDispatch: (state) => dispatch(UserAction(state)) });
export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  userEmailDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
