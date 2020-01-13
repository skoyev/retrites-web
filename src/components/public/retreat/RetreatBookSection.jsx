import React from 'react';
import { Card, Button, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import PropTypes from 'prop-types';
import ReCAPTCHA from "react-google-recaptcha";
import { configConstants } from '../../../constants';

window.recaptchaRef = React.createRef();

const RetreatBookSection = ({item, handleSubmitBookNow, handleFormNameChange, handleFormEmailChange, 
                             handleFormDescriptionChange, isActiveBookNow, handleCaptchaOnChange, error}) => (
 <div>
    <Card title="Book Now">
      <Form onSubmit={handleSubmitBookNow} className="book-form">
        <Form.Item label="Your Name">
            <Input required type="text" placeholder="Name" onChange={handleFormNameChange}/>
        </Form.Item>
        <Form.Item label="Your Email">
            <Input required type="email" placeholder="Email" onChange={handleFormEmailChange}/>
        </Form.Item>
        <Form.Item label="Booking Details">
          <TextArea required placeholder="Enter booking details" onChange={handleFormDescriptionChange} autoSize={{ minRows: 6, maxRows: 10 }} />
        </Form.Item>
        <Form.Item>
          <ReCAPTCHA
              ref={window.recaptchaRef}
              sitekey={configConstants.CAPTCHA_KEY}
              onChange={handleCaptchaOnChange}/>                            
        </Form.Item>
        <Form.Item>
          <Button disabled={!isActiveBookNow} htmlType="submit">Request Details</Button>
        </Form.Item>  
        <Form.Item><span style={{color:'#ff4d4d'}}><b>{error}</b></span></Form.Item>      
      </Form>
    </Card>
</div>
);

RetreatBookSection.propTypes = {
  handleSubmitBookNow: PropTypes.func.isRequired,
  handleFormEmailChange: PropTypes.func.isRequired,
  handleFormNameChange: PropTypes.func.isRequired,
  handleFormDescriptionChange: PropTypes.func.isRequired
}

export default RetreatBookSection;