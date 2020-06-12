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

const ForgotPasswordPage = props => {
    useEffect(()=> {
        //props.fetchMessageGroups();
        props.initialize({
            languages: [
                {name : "English", code: "en"},
                {name : "French", code: "fr"}
            ],
            translation: globalTranslations,
            options: { renderToStaticMarkup },
        })
    }, []);

    const openNotification = () => {
        const args = {
            message: 'Reset Password Request',
            description: `Dear user. You will receive an email with reset password reset instruction.`,
            duration: 4,
        };
        notification.open(args);
    };    


    const [email, setEmail] = useState('');
    const [disabled, setDisabled] = useState('disabled');
    const [isValidEmail, setIsValidEmail] = useState(true);

    useEffect(() => {
        if(email.length == 0){
            return;
        }
        let isValidEmail = validateEmail(email);
        setIsValidEmail(isValidEmail);
        setDisabled(isValidEmail ? '' : 'disabled')
    }, [email]);    

    const handleForgotPassword = () => {
        props.forgotPassword(email);
        openNotification();
        setTimeout(()=> {
            history.push('/dashboard');
        },3000);        
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
                                    <Translate>{({ translate }) =><h2>{translate("header.forgot")}</h2>}</Translate>
                                        <div className={'form-group'}>
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            {!isValidEmail &&
                                                <div className="error">Email is incorrect. Please change it.</div>
                                            }

                                        </div>

                                        <div className="form-group">                                                                                    
                                            <Row>
                                                <Col span={6}>
                                                    <Translate>
                                                        {({ translate }) =>
                                                            <Button className="d-inline" disabled={disabled} onClick={() => handleForgotPassword()} style={{marginRight:20}}>{translate('button.submit')}</Button>}
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

ForgotPasswordPage.propTypes = {  
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

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage));