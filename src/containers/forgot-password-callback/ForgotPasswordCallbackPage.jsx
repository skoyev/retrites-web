import { userActions, commonActions } from "../../store/action";
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Row, Col, notification, Button } from 'antd';
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import { withLocalize } from "react-localize-redux";
import './index.css'
import { SimpleHeader } from "../../components/public";
import { validateEmail, history } from "../../helpers";
import globalTranslations from "../../translations/global.json";
import { renderToStaticMarkup } from "react-dom/server";
import { commonConstants } from "../../constants";
import { AES, enc } from "crypto-js";

const ForgotPasswordCallbackPage = props => {
    useEffect(()=> {
        //props.fetchMessageGroups();
        props.initialize({
            languages: [
                {name : "English", code: "en"},
                {name : "French", code: "fr"}
            ],
            translation: globalTranslations,
            options: { renderToStaticMarkup },
        });                
    }, []);

    const openNotification = () => {
        const args = {
            message: 'Reset Password Request',
            description: `Dear user. You password will get reset.`,
            duration: 4,
        };
        notification.open(args);
    };    


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [disabled, setDisabled] = useState('disabled');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

    useEffect(() => {
        if(email.length == 0){
            return;
        }
        let isValidEmail = validateEmail(email);
        let isValidPassword = password.length >= 6
        let isValidConfirmPassword = isValidPassword && (confirmPassword == password)

        setIsValidEmail(isValidEmail);

        if(password.length > 0){
            setIsValidPassword(isValidPassword);
        }

        if(isValidPassword && confirmPassword.length > 0) {
            setIsValidConfirmPassword(isValidConfirmPassword);
        }

        setDisabled(isValidEmail && isValidConfirmPassword ? '' : 'disabled')
    }, [email, password, confirmPassword]);    

    const handleResetPassword = () => {
        const activateValues = props.location.search.split('activateCode=');
        if (email && password && activateValues.length == 2) {
            let encrPassword = AES.encrypt(password, commonConstants.SECRET_PASSPHRASE).toString();
            props.resetPassword(email, encrPassword, activateValues[1]);
            openNotification();
            setTimeout(()=> {
                history.push('/dashboard');
            },3000);    
        }
    }    

    return (
        <>
            <SimpleHeader/>
            <Row>
                <div className="container center" style={{marginTop: 25}}>
                    <div className="row vertical justify-content-center align-items-center new-retreate">
                        <div className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <Translate>{({ translate }) =><h3>{translate("header.forgot-confirm")}</h3>}</Translate>
                                        <div className={'form-group'}>
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            {
                                                !isValidEmail 
                                                    &&
                                                <div className="error">Email is incorrect. Please change it.</div>
                                            }
                                        </div>

                                        <div className={'form-group'}>
                                            <label htmlFor="password">New Password</label>
                                            <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            {
                                                !isValidPassword 
                                                    &&
                                                <div className="error">Password must be min 6 character long.</div>
                                            }
                                        </div>

                                        <div className={'form-group'}>
                                            <label htmlFor="confirm-password">Confirm Password</label>
                                            <input type="password" className="form-control" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                            {
                                                !isValidConfirmPassword 
                                                    &&
                                                <div className="error">Password is not matching.</div>
                                            }
                                        </div>

                                        <div className="form-group">                                                                                    
                                            <Row>
                                                <Col span={6}>
                                                    <Translate>
                                                        {({ translate }) =>
                                                            <Button className="d-inline" disabled={disabled} onClick={() => handleResetPassword()} style={{marginRight:20}}>{translate('button.submit')}</Button>}
                                                    </Translate>
                                                </Col>
                                            </Row>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
        </>
    )
}

ForgotPasswordCallbackPage.propTypes = {  
}

const mapDispatchToProps = { 
  ...userActions,
  ...commonActions
}; 

function mapStateToProps(state) {
  return {
      user : JSON.parse(sessionStorage.getItem('user'))
  };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordCallbackPage));