import React from 'react';
import { Card, Button, Form, Input, Row, Col } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import PropTypes from 'prop-types';
import ReCAPTCHA from "react-google-recaptcha";
import { configConstants } from '../../../constants';
import { withRouter } from 'react-router-dom';

window.recaptchaRef = React.createRef();

const RetreatBookSection = ({ item, handleSubmitBookNow,
  handleFormDescriptionChange, isActiveBookNow, handleCaptchaOnChange, error,
  isLoggedInRes, generalMessage, history,
  isPublicUser }) => (
    <div>
      {
        (!isLoggedInRes || (isLoggedInRes && isPublicUser))
        &&
        <Card title="Book Now">
          <Form onSubmit={handleSubmitBookNow} className="book-form">
            <Form.Item label="Booking Details">
              <TextArea required placeholder="Enter booking details" onChange={handleFormDescriptionChange} autoSize={{ minRows: 6, maxRows: 10 }} />
            </Form.Item>

            {
              isLoggedInRes
              &&
              // User Logged In - show submit button
              <React.Fragment>
                <Form.Item>
                  <ReCAPTCHA
                    ref={window.recaptchaRef}
                    sitekey={configConstants.CAPTCHA_KEY}
                    onChange={handleCaptchaOnChange} />
                </Form.Item>
                <Form.Item>
                  <Button disabled={!isActiveBookNow} htmlType="submit">Request Details</Button>
                </Form.Item>
                <Form.Item>
                  <span style={{ color: '#ff4d4d' }}><b>{error}</b></span>
                </Form.Item>
              </React.Fragment>
            }


            {
              !isLoggedInRes
              &&
              // User is NOT Looged In - Show Warning
              <React.Fragment>
                <Form.Item>
                  <span style={{ color: '#ff4d4d' }}><b>{generalMessage}</b></span>
                </Form.Item>
                <Row>
                  <Col span={4}><Button onClick={() => history.push(`/login`)}>Login</Button></Col>
                  <Col span={4}><Button onClick={() => history.push(`/register`)}>Register</Button></Col>
                </Row>
              </React.Fragment>
            }

          </Form>
        </Card>
      }
    </div>
  );

RetreatBookSection.propTypes = {
  handleSubmitBookNow: PropTypes.func.isRequired,
  handleFormDescriptionChange: PropTypes.func.isRequired
}

export default withRouter(RetreatBookSection);